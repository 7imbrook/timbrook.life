CREATE OR REPLACE FUNCTION process_episode_change ()
    RETURNS TRIGGER
    AS $ep_trigger$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        PERFORM
            pg_notify('purge_asset', row_to_json(OLD)::text);
        RETURN OLD;
	ELSIF (NEW.storage_key = OLD.storage_key) THEN
		RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        PERFORM
            pg_notify('update_permission', row_to_json(NEW)::text);
        RETURN NEW;
    ELSIF (TG_OP = 'INSERT') THEN
        PERFORM
            pg_notify('update_permission', row_to_json(NEW)::text);
        RETURN NEW;
    END IF;
    RETURN NULL;
    -- result is ignored since this is an AFTER trigger
END;
$ep_trigger$
LANGUAGE plpgsql;

CREATE TRIGGER episodes_cleanup
    AFTER INSERT
    OR UPDATE
    OR DELETE ON episodes
    FOR EACH ROW
    EXECUTE PROCEDURE process_episode_change ();

