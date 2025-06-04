-- liquibase formatted sql

-- changeset JSF2025S-9:003
CREATE TABLE app_users
(
    id         UUID PRIMARY KEY,
    auth0_id   UUID                NOT NULL,
    picture    UUID REFERENCES files (id),
    email      VARCHAR(200) UNIQUE NOT NULL,
    username   VARCHAR(200) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
