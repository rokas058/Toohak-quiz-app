-- liquibase formatted sql

-- changeset JSF2025S-86:003
ALTER TABLE quiz_players
    DROP COLUMN quiz_id;