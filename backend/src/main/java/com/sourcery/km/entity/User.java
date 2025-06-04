package com.sourcery.km.entity;

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
public class User {
    @Builder.Default
    UUID id = UUID.randomUUID();

    String auth0Id;

    String email;

    String username;

    Instant createdAt;

    Instant updatedAt;
}
