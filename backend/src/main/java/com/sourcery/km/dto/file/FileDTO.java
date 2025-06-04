package com.sourcery.km.dto.file;

import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileDTO {
    UUID imageId;

    String fileType;
}
