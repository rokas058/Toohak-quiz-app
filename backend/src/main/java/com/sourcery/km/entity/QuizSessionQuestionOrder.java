package com.sourcery.km.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizSessionQuestionOrder {
    private UUID sessionId;

    private UUID questionId;

    private int questionOrder;

    private boolean isCompleted;
}
