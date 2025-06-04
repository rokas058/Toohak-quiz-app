package com.sourcery.km.entity;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {
    @Builder.Default
    private UUID id = UUID.randomUUID();

    private UUID quizId;

    private UUID image;

    private String title;

    private List<QuestionOption> questionOptions;
}
