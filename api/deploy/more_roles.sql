-- Deploy api:more_roles to pg

BEGIN;

CREATE ROLE notif_reader NOLOGIN;
GRANT notif_reader TO doadmin;

GRANT SELECT ON notification TO notif_reader;

COMMIT;
