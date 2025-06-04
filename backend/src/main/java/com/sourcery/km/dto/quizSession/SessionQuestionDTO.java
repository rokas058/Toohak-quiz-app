package com.sourcery.km.dto.quizSession;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionQuestionDTO {
    private UUID id;

    private UUID imageId;

    private String title;

    private int durationSeconds;

    private List<SessionOptionDTO> questionOptions;
}
