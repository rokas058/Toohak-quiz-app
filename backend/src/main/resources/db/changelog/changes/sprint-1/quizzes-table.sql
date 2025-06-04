-- liquibase formatted sql

-- changeset JSF2025S-9:004
-- comment: Highest point of the quiz
CREATE TABLE quizzes
(
    id          UUID PRIMARY KEY,
    created_by  UUID         NOT NULL REFERENCES app_users (id),
    title       VARCHAR(200) NOT NULL,
    description TEXT,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
