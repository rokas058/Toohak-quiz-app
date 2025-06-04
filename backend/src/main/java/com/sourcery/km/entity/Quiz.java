package com.sourcery.km.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quiz {
    @Builder.Default
    private UUID id = UUID.randomUUID();

    // user id
    private UUID createdBy;

    private String title;

    private String description;

    private UUID coverImageId;

    private Instant createdAt;

    private Instant updatedAt;

    private List<Question> questions;

    public boolean hasQuestions() {
        return questions != null && !questions.isEmpty();
    }
}
