-- liquibase formatted sql

-- changeset JSF2025S-98:003
ALTER TABLE quiz_sessions
    ADD COLUMN is_shuffled BOOLEAN NOT NULL DEFAULT FALSE;

-- changeset JSF2025S-98:004
ALTER TABLE quiz_session_progress
    RENAME COLUMN started_at TO current_question_started_at;