-- Revert api:mainapp from pg

BEGIN;

drop table resumes;

COMMIT;
