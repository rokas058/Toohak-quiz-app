package com.sourcery.km.dto.quizSession;

import com.sourcery.km.entity.QuizStatus;
import lombok.Data;

import java.time.Instant;
import java.util.UUID;

@Data
public class QuizSessionWithOwner {
    private UUID id;

    private QuizStatus status;

    private String joinId;

    private Instant createdAt;

    private UUID quizId;

    private String auth0Id;
}
