package com.sourcery.km.dto.questionOption;

import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionOptionDTO {
    UUID id;

    UUID questionId;

    String title;

    Integer ordering;

    Boolean isCorrect;
}
