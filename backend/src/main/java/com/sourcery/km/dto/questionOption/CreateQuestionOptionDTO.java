package com.sourcery.km.dto.questionOption;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateQuestionOptionDTO {
    UUID questionId;

    @NotBlank(message = "Title cannot be blank")
    @Size(max = 200, message = "Title must be at most 200 characters")
    String title;

    @NotNull(message = "Ordering cannot be null")
    Integer ordering;

    @NotNull(message = "isCorrect cannot be null")
    Boolean isCorrect;
}
