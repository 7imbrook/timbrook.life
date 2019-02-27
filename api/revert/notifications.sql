-- Revert api:notifications from pg

BEGIN;

drop view notification;
drop table subscription;
drop table notification_type;
drop table recipient;
drop type notif;
drop type source;

COMMIT;
