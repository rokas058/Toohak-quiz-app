package com.sourcery.km.dto.quiz;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Value;

import java.util.UUID;


@Value
@Builder
public class QuizRequestDto {
    @NotBlank(message = "Title cannot be blank")
    @Size(max = 200, message = "Title must be at most 200 characters")
    String title;

    @Size(max = 500, message = "Description must be at most 500 characters")
    String description;

    UUID imageId;
}
