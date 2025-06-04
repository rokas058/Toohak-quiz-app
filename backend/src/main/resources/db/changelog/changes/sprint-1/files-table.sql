-- liquibase formatted sql

-- changeset JSF2025S-9:001
-- comment: Files are stored on the system and database stores the RELATIVE url to them.
-- comment: The url should look similar to this: images/my-image-name.png
CREATE TABLE files
(
    id         UUID PRIMARY KEY,
    file_type  VARCHAR(100) NOT NULL CHECK (file_type IN ('image/png', 'image/jpeg')),
    file_url   TEXT         NOT NULL,
    created_at TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);
