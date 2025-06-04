-- changeset JSF2025S-184:001

-- comment: Adds a unique index to ensure nickname is unique within a session
CREATE UNIQUE INDEX uq_quiz_session_nickname ON quiz_players (quiz_session_id, nickname);
