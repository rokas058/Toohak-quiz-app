package com.sourcery.km.dto.quizSession;

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
public class QuizSessionDTO {
    String joinId;

    String status;

    Instant createdAt;

    UUID quizSessionId;

    String createdBy;

    UUID quizId;
}
