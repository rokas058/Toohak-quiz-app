-- liquibase formatted sql

-- changeset JSF2025S-9:008
-- comment: The session which anonymous players will connect to
CREATE TABLE quiz_sessions
(
    id          UUID PRIMARY KEY,
    status      quiz_status  NOT NULL,
    join_id     VARCHAR(100) NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
