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
public class QuizSessionProgress {
    private UUID sessionId;

    private UUID currentQuestionId;

    private Instant currentQuestionStartedAt;

    private int durationSeconds;
}
