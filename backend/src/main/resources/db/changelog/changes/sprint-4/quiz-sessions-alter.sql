-- liquibase formatted sql

-- changeset JSF2025S-86:001
ALTER TABLE quiz_sessions
    ADD COLUMN quiz_id UUID;

-- changeset JSF2025S-86:002
ALTER TABLE quiz_sessions
    ADD CONSTRAINT fk_quiz_id
        FOREIGN KEY (quiz_id) REFERENCES quizzes (id);

-- changeset JSF2025S-86:005
ALTER TABLE quiz_sessions
    DROP COLUMN last_active;

-- changeset JSF2025S-86:006
CREATE INDEX idx_quiz_sessions_join_id ON quiz_sessions (join_id);