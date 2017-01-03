const jwt = require('jsonwebtoken'),
      config = require('../config.js')
;

/**
 * Gives token assuming user is already authed.
 */
function tokenForUser(user) {
    // fetch role
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
        user,
        role: 'readonly'
    }, config.jwt_secret);
};

module.exports = {
    tokenForUser
}
