-- liquibase formatted sql

-- changeset JSF2025S-9:010
-- comment: Tracks what answers the players have given
CREATE TABLE player_answers
(
    id                 UUID PRIMARY KEY,
    quiz_player_id     UUID NOT NULL REFERENCES quiz_players (id),
    question_id        UUID NOT NULL REFERENCES questions (id),
    question_option_id UUID NOT NULL REFERENCES question_options (id),
    answered_at        TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (quiz_player_id, question_id)
);

-- changeset JSF2025S-9:016
CREATE INDEX idx_player_answers_quiz_player_id ON player_answers (quiz_player_id);
-- changeset JSF2025S-9:017
CREATE INDEX idx_player_answers_question_id ON player_answers (question_id);
