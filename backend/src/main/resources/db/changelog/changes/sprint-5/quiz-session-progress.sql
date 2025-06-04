-- liquibase formatted sql

-- changeset JSF2025S-98:002
CREATE TABLE quiz_session_progress (
    session_id          UUID PRIMARY KEY REFERENCES quiz_sessions (id),
    current_question_id UUID REFERENCES questions (id),
    started_at          TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    duration_seconds    INTEGER NOT NULL
);