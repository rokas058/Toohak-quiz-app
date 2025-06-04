-- liquibase formatted sql

-- changeset JSF2025S-9:005
-- comment: Lower in hierarchy than Quiz
CREATE TABLE questions
(
    id      UUID PRIMARY KEY,
    quiz_id UUID         NOT NULL REFERENCES quizzes (id),
    image   UUID REFERENCES files (id),
    title   VARCHAR(200) NOT NULL
);

-- changeset JSF2025S-9:012
CREATE INDEX idx_questions_quiz_id ON questions (quiz_id);