-- liquibase formatted sql

-- changeset JSF2025S-9:007
-- comment: PENDING - Waiting for players to join
-- comment: ACTIVE - Quiz has begun
-- comment: INACTIVE - The quiz has ended
CREATE TYPE quiz_status AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');
