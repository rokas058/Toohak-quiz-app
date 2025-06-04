package com.sourcery.km.builder.file;

import com.sourcery.km.dto.file.FileDTO;
import com.sourcery.km.entity.File;
import jakarta.annotation.PostConstruct;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FileBuilder {

    @Autowired
    ModelMapper modelMapper;

    public static File fromFileIdSetTemporary(UUID fileId, boolean isTemporary) {
        return File.builder()
                .id(fileId)
                .isTemporary(isTemporary)
                .build();
    }

    @PostConstruct
    private void postConstruct() {
        configureFileDTOMappings();
        configureFileMappings();
    }

    private void configureFileDTOMappings() {
        PropertyMap<FileDTO, File> createMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setId(source.getImageId());
            }
        };
        modelMapper.addMappings(createMap);
    }

    private void configureFileMappings() {
        PropertyMap<File, FileDTO> createMap = new PropertyMap<>() {
            @Override
            protected void configure() {
                map().setImageId(source.getId());
            }
        };
        modelMapper.addMappings(createMap);
    }
}
