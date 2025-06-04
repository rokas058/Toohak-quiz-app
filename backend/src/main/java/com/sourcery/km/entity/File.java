package com.sourcery.km.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class File {
    @Builder.Default
    private UUID id = UUID.randomUUID();

    private UUID createdBy;

    private String fileType;

    private Instant createdAt;

    private boolean isTemporary;
}
