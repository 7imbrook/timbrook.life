-- Revert api:quotes from pg

BEGIN;

drop table quotes;

COMMIT;
