-- liquibase formatted sql

-- changeset JSF2025S-61:001
ALTER TABLE files
    ADD COLUMN created_by UUID;

-- changeset JSF2025S-61:002
ALTER TABLE files
    ADD CONSTRAINT fk_created_by
        FOREIGN KEY (created_by) REFERENCES app_users (id);

-- changeset JSF2025S-61:003
ALTER TABLE files
    ADD COLUMN is_temporary BOOLEAN;

-- changeset JSF2025S-61:004
ALTER TABLE files
    DROP COLUMN file_url;