-- Deploy api:roles to pg

BEGIN;

CREATE ROLE anonymous NOLOGIN;

COMMIT;
