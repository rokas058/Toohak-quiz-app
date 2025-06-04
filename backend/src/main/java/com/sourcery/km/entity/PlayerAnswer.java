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
public class PlayerAnswer {
    @Builder.Default
    private UUID id = UUID.randomUUID();

    private UUID quizPlayerId;

    private UUID questionId;

    private UUID questionOptionId;

    private Instant answeredAt;

    public PlayerAnswer(UUID quizPlayerId, UUID questionId, UUID questionOptionId) {
        this.id = UUID.randomUUID();
        this.quizPlayerId = quizPlayerId;
        this.questionId = questionId;
        this.questionOptionId = questionOptionId;
    }
}
