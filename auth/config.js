const fs = require('fs');

const PASS = fs.existsSync(process.env.POSTGREST_PASSWORD_FILE) 
    ? fs.readFileSync(process.env.POSTGREST_PASSWORD_FILE) : undefined;
const JWT_SECRET = fs.existsSync(process.env.JWT_SECRET_FILE) 
    ? fs.readFileSync(process.env.JWT_SECRET_FILE): undefined;

module.exports = {
    jwt_secret: JWT_SECRET || 'shhhh',
    db: process.env.NODE_ENV == 'production' ?
    {
        client: 'pg',
        connection: 'postgres://postgres:' + PASS + '@postgres:5432/postgres'
    }:
    {
        client: 'sqlite3',
        connection: {
            filename: "./development.sqlite"
        },
        useNullAsDefault: true
    }
};
