package com.sourcery.km.dto.quizSession;

import lombok.Data;

import java.util.UUID;

@Data
public class AnswerDTO {

    private UUID playerId;

    private UUID questionOptionId;
}
