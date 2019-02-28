-- Deploy api:podcasts to pg

BEGIN;

create table podcasts(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(80),
    description TEXT,
    url CHARACTER VARYING(500)
);

create table episodes(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(80),
    description TEXT,
    url CHARACTER VARYING(500),
    duration CHARACTER VARYING(20),
    podcast INTEGER REFERENCES podcasts(id)
);

grant select on podcasts to anonymous;
grant select on episodes to anonymous;

COMMIT;
