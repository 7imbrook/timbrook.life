module.exports = {
    jwt_secret: 'a9snfp9p23fiq23',
    db: process.env.NODE_ENV == 'production' ?
    {
        client: 'pg',
        connection:
            'postgres://' + (process.env.PG_ENV_POSTGRES_USER || 'postgres') + ':' +
            process.env.PG_ENV_POSTGRES_PASSWORD + '@' + 'pg:5432/' +
            (process.env.PG_ENV_POSTGRES_DB || 'postgres')
    }:
    {
        client: 'sqlite3',
        connection: {
            filename: "./development.sqlite"
        },
        useNullAsDefault: true
    }
};

