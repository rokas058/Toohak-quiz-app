package com.sourcery.km.controller;

import com.sourcery.km.dto.file.FileDTO;
import com.sourcery.km.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {
    private final FileService fileService;

    @PostMapping("/image")
    public FileDTO addTmpImage(@RequestParam("file") MultipartFile file) throws IOException {
        return fileService.saveTemporary(file);
    }

    @GetMapping("/image/{fileName}")
    public InputStreamResource retrieveImage(@PathVariable String fileName) {
        return fileService.retrieve(fileName);
    }

    /**
     * Lists files in the blob container. Available only in dev profile for easier testing
     *
     * @return a list of blob names available in the container
     */
    @Profile("dev")
    @GetMapping("/list")
    public List<String> listFiles() {
        return fileService.listFiles();
    }
}
