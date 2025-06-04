package com.sourcery.km.service;

import com.azure.core.util.BinaryData;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.sourcery.km.dto.file.FileDTO;
import com.sourcery.km.entity.File;
import com.sourcery.km.exception.ResourceNotFoundException;
import com.sourcery.km.exception.UnsupportedFileTypeException;
import com.sourcery.km.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.tika.Tika;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;

    private final UserService userService;

    private final MapperService mapperService;

    private final BlobContainerClient blobContainerClient;


    /**
     * Saves the file by checking mimetype to be jpeg or png, compresses the image and stores in blobStorage
     *
     * @param fileDTO the file to be uploaded and stored temporarily
     * @return a DTO representation of the saved file, containing details about the file
     */
    public FileDTO saveTemporary(MultipartFile fileDTO) throws IOException {
        UUID id = UUID.randomUUID();
        UUID userId = userService.getUserInfo().getId();

        InputStream originalInputStream = new BufferedInputStream(fileDTO.getInputStream());
        String detectedMimeType = getMimeType(fileDTO, originalInputStream);
        String extension = getMimeExtension(detectedMimeType);
        BinaryData data = compressImage(extension, originalInputStream);

        BlobClient blobClient = blobContainerClient.getBlobClient(id.toString());
        blobClient.upload(data);

        File file = File.builder()
                .id(id)
                .createdBy(userId)
                .fileType(detectedMimeType)
                .isTemporary(true)
                .createdAt(Instant.now())
                .build();

        fileRepository.insertNewFile(file);

        return mapperService.map(file, FileDTO.class);
    }

    public InputStreamResource retrieve(String fileId) {
        BlobClient blobClient = blobContainerClient.getBlobClient(fileId);
        if (!blobClient.exists()) {
            throw new ResourceNotFoundException("Blob with name '" + fileId + "' not found.");
        }
        var inputStream = blobClient.downloadContent().toStream();
        return new InputStreamResource(inputStream);
    }

    public void delete(UUID fileId) {
        if (fileId == null) {
            return;
        }
        String blobName = fileId.toString();
        var blobClient = getBlobClient(blobName);
        blobClient.delete();
    }

    @Profile("dev")
    public List<String> listFiles() {
        List<String> fileNames = new ArrayList<>();
        blobContainerClient.listBlobs()
                .forEach(blobItem -> fileNames.add(blobItem.getName()));
        return fileNames;
    }

    private BlobClient getBlobClient(String fileName) {
        var blobClient = blobContainerClient.getBlobClient(fileName);
        if (Boolean.FALSE.equals(blobClient.exists())) {
            throw new ResourceNotFoundException("Blob with name '" + fileName + "' not found.");
        }
        return blobClient;
    }

    private String getMimeType(MultipartFile file, InputStream originalInputStream) throws IOException {
        Tika tika = new Tika();
        final var BYTES_TO_READ = 1023 * 1024; // 1 Mb read to determine mimetype
        originalInputStream.mark(BYTES_TO_READ);
        String detectedMimeType = tika.detect(originalInputStream);
        originalInputStream.reset(); // reset the 0Mb read pointer and start from beginning

        if (!("image/jpeg".equalsIgnoreCase(detectedMimeType) || "image/png".equalsIgnoreCase(detectedMimeType))) {
            throw new UnsupportedFileTypeException("Unsupported image type: " + detectedMimeType);
        }

        return detectedMimeType;
    }

    private String getMimeExtension(String mimeType) {
        return switch (mimeType.toLowerCase()) {
            case "image/jpeg" -> "jpg";
            case "image/png" -> "png";
            default -> throw new UnsupportedFileTypeException("Unsupported image type: " + mimeType);
        };
    }

    private BinaryData compressImage(String extension, InputStream originalInputStream) throws IOException {
        final var IMAGE_QUALITY = 0.8; // Set image quality to be 80%
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Thumbnails.of(originalInputStream)
                .scale(1.0)
                .outputQuality(IMAGE_QUALITY)
                .outputFormat(extension)
                .toOutputStream(baos);

        return BinaryData.fromBytes(baos.toByteArray());
    }
}
