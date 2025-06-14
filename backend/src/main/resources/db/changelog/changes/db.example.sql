-- liquibase formatted sql
-- This always needs to be up top for liquibase

-- A changeset in Liquibase is a single unit of change that describes one or more database modifications (such as creating a table, altering a column, or inserting data).
-- It is identified with "changeset author:id"
-- For this project the suggestion would be to do it like this: jyra-issue:3-digit-number

-- EXAMPLE:
-- changeset JSF2025S-8:001
-- comment: Comment nr. 1
-- comment: Comment nr. 2
-- CREATE TABLE questions
-- (
--     id    INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
--     title VARCHAR(200) NOT NULL
-- );
