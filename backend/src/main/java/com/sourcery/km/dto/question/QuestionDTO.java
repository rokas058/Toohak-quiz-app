package com.sourcery.km.dto.question;

import com.sourcery.km.dto.questionOption.QuestionOptionDTO;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionDTO {
    UUID id;

    UUID quizId;

    UUID imageId;

    String title;

    List<QuestionOptionDTO> questionOptions;
}
