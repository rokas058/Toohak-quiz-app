package com.sourcery.km.dto.quiz;

import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class QuizFlatRow {
    private UUID quizId;

    private String quizTitle;

    private String quizDescription;

    private UUID quizImageId;

    private UUID quizCreatedBy;

    private Instant quizCreatedAt;

    private Instant quizUpdatedAt;

    private UUID questionId;

    private UUID questionImageId;

    private String questionTitle;

    private UUID optionId;

    private String optionTitle;

    private Integer optionOrdering;

    private Boolean optionIsCorrect;
}

