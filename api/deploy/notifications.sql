-- Deploy api:notifications to pg
BEGIN;

CREATE TYPE notif AS ENUM ( 'SMS'
);

CREATE TYPE source AS ENUM ( 'WOTD'
);

CREATE TABLE IF NOT EXISTS notification_type (
        notif_type notif UNIQUE PRIMARY KEY,
        config json
);

CREATE TABLE IF NOT EXISTS recipient (
        id SERIAL PRIMARY KEY,
        display_name CHARACTER VARYING (140) NOT NULL,
        data json 
);

CREATE TABLE IF NOT EXISTS subscription (
        notif_type notif REFERENCES notification_type (notif_type),
        recipient_id BIGINT REFERENCES recipient (id),
        source source
);

-- Create config data
INSERT INTO notification_type (notif_type, config)
        VALUES ('SMS', '{"sender": "+15852681151"}');
-- Example use case

INSERT INTO recipient (display_name, data)
        VALUES ('Michael', '{"phone_number": "+16073820413"}');
INSERT INTO subscription (notif_type, recipient_id, source)
        VALUES ('SMS', 1, 'WOTD');

-- Nice API view
CREATE VIEW notification
AS
SELECT
    display_name,
    data as user_config,
    s.notif_type,
    source,
    config as notif_config
FROM
    recipient r
    JOIN subscription s ON s.recipient_id = r.id
    JOIN notification_type nt ON s.notif_type = nt.notif_type
;

COMMIT;


