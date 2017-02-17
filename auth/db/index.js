const knex = require('knex'),
      config = require('../config')
;

function setup(conn) {
    return conn.schema.createTableIfNotExists('users', function (table) {
        table.increments();
        table.string('name');
        table.string('role');
        table.string('secret');
    });
}

function destroyTestDB() {
    const fs = require('fs');
    fs.unlinkSync(config.db.connection.filename);
}

module.exports = {
    init: () => {
        console.log(config.db);
        return knex(config.db);
    },
    setup,
    destroyTestDB
};
