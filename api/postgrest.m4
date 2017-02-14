# postgrest.conf

# The standard connection URI format, documented at
# https://www.postgresql.org/docs/current/static/libpq-connect.html#AEN45347
db-uri       = "postgres://POSTGRES_USER:POSTGRES_PASS@POSTGRES_HOST:POSTGRES_PORT/POSTGRES_DB"

# The name of which database schema to expose to REST clients
db-schema    = "POSTGRES_SCHEMA"

# The database role to use when no client authentication is provided.
# Can (and probably should) differ from user in db-uri
db-anon-role = "POSTGRES_ROLE"

# TODO, allow empty and not set
jwt-secret = "JWT_SECRET"
