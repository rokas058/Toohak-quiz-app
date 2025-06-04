-- changeset JSF2025S-129:001
ALTER TABLE quiz_sessions DROP CONSTRAINT fk_quiz_id;

-- changeset JSF2025S-129:002
ALTER TABLE quiz_sessions
    ADD CONSTRAINT fk_quiz_id
    FOREIGN KEY (quiz_id) REFERENCES quizzes (id) ON DELETE SET NULL;