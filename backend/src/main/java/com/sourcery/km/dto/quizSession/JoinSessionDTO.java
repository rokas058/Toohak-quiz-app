package com.sourcery.km.dto.quizSession;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinSessionDTO {
    String accessToken;

    String expiresInSeconds;

    String tokenType;
}
