-- Deploy api:mainapp to pg

BEGIN;

CREATE TABLE IF NOT EXISTS resumes (
    id serial primary key,
    short_name character varying(80)
);

COMMIT;
