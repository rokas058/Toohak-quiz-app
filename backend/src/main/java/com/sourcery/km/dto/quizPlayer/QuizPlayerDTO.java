package com.sourcery.km.dto.quizPlayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizPlayerDTO {
    UUID userId;

    UUID quizSessionId;

    String nickname;
}
