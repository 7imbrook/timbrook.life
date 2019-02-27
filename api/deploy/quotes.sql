-- Deploy api:quotes to pg

BEGIN;


CREATE TABLE IF NOT EXISTS quotes (
    id serial primary key,
    quote text
);

grant select on quotes to anonymous;

COMMIT;
