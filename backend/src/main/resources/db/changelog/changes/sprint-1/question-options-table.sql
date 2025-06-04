-- liquibase formatted sql

-- changeset JSF2025S-9:006
-- comment: Lowest point in the quiz hierarchy
CREATE TABLE question_options
(
    id          UUID PRIMARY KEY,
    question_id UUID         NOT NULL REFERENCES questions (id),
    title       VARCHAR(200) NOT NULL,
    ordering    INTEGER      NOT NULL,
    is_correct  BOOLEAN      NOT NULL DEFAULT FALSE,
    UNIQUE (question_id, ordering)
);

-- changeset JSF2025S-9:011
CREATE UNIQUE INDEX uq_question_correct_option
    ON question_options (question_id)
    WHERE is_correct = TRUE;