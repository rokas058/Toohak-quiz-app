package com.sourcery.km.dto.question;

import com.sourcery.km.dto.questionOption.CreateQuestionOptionDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateQuestionDTO {

    UUID quizId;

    UUID imageId;

    @NotBlank(message = "Title cannot be blank")
    @Size(max = 200, message = "Title must be at most 200 characters")
    String title;

    @Valid
    List<CreateQuestionOptionDTO> questionOptions;
}
