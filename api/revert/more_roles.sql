-- Revert api:more_roles from pg

BEGIN;

DROP ROLE notif_reader;

COMMIT;
