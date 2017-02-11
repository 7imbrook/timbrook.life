#!/bin/bash
set -e

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
# Credit https://github.com/tianon, he made some prs and I'm taking
file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

# default, or file failback 
file_env 'POSTGRES_HOST' 'postgres'
file_env 'POSTGRES_DB' 'postgres'
file_env 'POSTGRES_SCHEMA' 'public'
file_env 'POSTGRES_ROLE' 'anon'
file_env 'POSTGRES_USER' 'postgres'
file_env 'POSTGRES_PASS' 'thisisnotapassword'
file_env 'POSTGRES_PORT' '5432'

m4  -D POSTGRES_HOST=$POSTGRES_HOST \
    -D POSTGRES_DB=$POSTGRES_DB \
    -D POSTGRES_SCHEMA=$POSTGRES_SCHEMA \
    -D POSTGRES_ROLE=$POSTGRES_ROLE \
    -D POSTGRES_USER=$POSTGRES_USER \
    -D POSTGRES_PASS=$POSTGRES_PASS \
    -D POSTGRES_PORT=$POSTGRES_PORT < /tmp/postgrest.m4 > /etc/postgrest.conf

postgrest /etc/postgrest.conf
