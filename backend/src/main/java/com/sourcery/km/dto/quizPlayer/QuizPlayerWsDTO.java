package com.sourcery.km.dto.quizPlayer;

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
public class QuizPlayerWsDTO {
    private UUID quizSessionId;

    private String nickname;

    private int score;

    private Instant joinedAt;

    private UUID userId;
}
