const knex = require('knex'),
      config = require('../config')
;

function setup(conn) {
    return conn.schema.createTableIfNotExists('users', function (table) {
        table.increments();
        table.string('name');
        table.string('role');
    });
}

function destroyTestDB() {
    const fs = require('fs');
    fs.unlinkSync(config.db.connection.filename);
}

module.exports = {
    init: () => {
        return knex(config.db);
    },
    setup,
    destroyTestDB
};
