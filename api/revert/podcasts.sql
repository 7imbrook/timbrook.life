-- Revert api:podcasts from pg

BEGIN;

drop table episodes;
drop table podcasts;

COMMIT;
