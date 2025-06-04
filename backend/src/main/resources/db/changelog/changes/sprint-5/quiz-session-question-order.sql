-- liquibase formatted sql

-- changeset JSF2025S-98:001
CREATE TABLE quiz_session_question_order (
    session_id      UUID NOT NULL REFERENCES quiz_sessions (id),
    question_id     UUID NOT NULL REFERENCES questions (id),
    question_order  INTEGER NOT NULL,
    is_completed    BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (session_id, question_id)
);