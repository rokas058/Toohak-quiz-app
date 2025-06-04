package com.sourcery.km.dto.quiz;

import com.sourcery.km.dto.question.CreateQuestionDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class CreateQuizDTO {

    @NotBlank(message = "Title cannot be blank")
    @Size(max = 200, message = "Title must be at most 200 characters")
    String title;

    @Size(max = 500, message = "Description must be at most 500 characters")
    String description;

    UUID imageId;

    @Valid
    List<CreateQuestionDTO> questions;
}
