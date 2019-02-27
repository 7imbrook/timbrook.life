-- Revert api:roles from pg

BEGIN;

DROP ROLE anonymous;

COMMIT;
