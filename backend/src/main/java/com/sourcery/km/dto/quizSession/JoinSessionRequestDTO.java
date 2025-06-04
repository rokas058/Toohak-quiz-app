package com.sourcery.km.dto.quizSession;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinSessionRequestDTO {
    @NotNull(message = "quizSessionId cannot be null")
    UUID quizSessionId;

    @NotBlank(message = "nickname cannot be blank")
    @Size(max = 20, message = "nickname must not exceed 20 characters")
    String nickname;
}
