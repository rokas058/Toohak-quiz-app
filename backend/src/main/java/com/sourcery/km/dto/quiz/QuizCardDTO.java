package com.sourcery.km.dto.quiz;

import lombok.Builder;
import lombok.Value;

import java.time.Instant;
import java.util.UUID;

@Value
@Builder
public class QuizCardDTO {
    UUID id;

    UUID createdBy;

    String title;

    String description;

    UUID coverImageId;

    Instant createdAt;

    Instant updatedAt;

    int questionAmount;
}
