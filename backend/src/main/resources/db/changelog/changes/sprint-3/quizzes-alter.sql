-- liquibase formatted sql

-- changeset JSF2025S-61:005
ALTER TABLE quizzes
    ADD COLUMN cover_image_id UUID;

-- changeset JSF2025S-61:006
ALTER TABLE quizzes
    ADD CONSTRAINT fk_cover_image_id
        FOREIGN KEY (cover_image_id) REFERENCES files (id);