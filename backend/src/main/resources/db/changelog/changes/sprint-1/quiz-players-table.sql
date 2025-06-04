-- liquibase formatted sql

-- changeset JSF2025S-9:009
-- comment: The anonymous players who join the session
CREATE TABLE quiz_players
(
    id              UUID PRIMARY KEY,
    quiz_id         UUID         NOT NULL REFERENCES quizzes (id),
    quiz_session_id UUID         NOT NULL REFERENCES quiz_sessions (id),
    nickname        VARCHAR(100) NOT NULL,
    score           INTEGER      NOT NULL DEFAULT 0,
    joined_at       TIMESTAMPTZ           DEFAULT CURRENT_TIMESTAMP
);

-- changeset JSF2025S-9:014
CREATE INDEX idx_quiz_players_quiz_id ON quiz_players (quiz_id);
-- changeset JSF2025S-9:015
CREATE INDEX idx_quiz_players_quiz_session_id ON quiz_players (quiz_session_id);
