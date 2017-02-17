const fs = require('fs');

module.exports = {
    jwt_secret: process.env.JWT_SECRET,
    db: process.env.NODE_ENV == 'production' ?
    {
        client: 'pg',
        connection: {
            host: process.env.POSTGRES_HOST,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        }
    }:
    {
        client: 'sqlite3',
        connection: {
            filename: "./development.sqlite"
        },
        useNullAsDefault: true
    }
};
