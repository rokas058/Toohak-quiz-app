package com.sourcery.km.dto.quizSession;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionOptionDTO {
    private UUID id;

    private String title;

    private Integer ordering;
}
