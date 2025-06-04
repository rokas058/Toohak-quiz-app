package com.sourcery.km.dto.quizSession;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateSessionDTO {
    @NotBlank(message = "quizId cannot be blank")
    UUID quizId;

    @Builder.Default
    boolean isShuffled = false;
}
