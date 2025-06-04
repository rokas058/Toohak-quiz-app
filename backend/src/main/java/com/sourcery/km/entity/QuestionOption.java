package com.sourcery.km.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionOption {
    @Builder.Default
    private UUID id = UUID.randomUUID();

    private UUID questionId;

    private String title;

    private Integer ordering;

    private Boolean isCorrect;
}
