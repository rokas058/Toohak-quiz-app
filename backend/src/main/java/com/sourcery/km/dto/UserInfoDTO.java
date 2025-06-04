package com.sourcery.km.dto;

import lombok.*;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserInfoDTO {
    String sub;

    String name;

    String email;

    UUID id;
}
