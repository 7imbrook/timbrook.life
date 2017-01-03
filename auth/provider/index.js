const jwt = require('jsonwebtoken'),
      config = require('../config.js'),
      db = require('../db'),
      conn  = db.init()
;

/**
 * Gives token assuming user is already authed.
 */
function tokenForUser(user) {
    // fetch role
    return conn
        .select('role')
        .from('users')
        .where({name: user})
        .limit(1)
        .then(users => users[0])
        .then(dbuser => {
            if (dbuser !== undefined) {
                return jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
                    user,
                    role: dbuser.role
                }, config.jwt_secret);
            } else {
                throw new Error('Not a valid user');
            }
        });
};

module.exports = {
    tokenForUser
}
