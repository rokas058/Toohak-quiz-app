package com.sourcery.km.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizSession {
    @Builder.Default
    private UUID id = UUID.randomUUID();

    private QuizStatus status;

    private String joinId;

    private Instant createdAt;

    private UUID quizId;

    private boolean isShuffled;
}
