const jwt = require('jsonwebtoken'),
      config = require('../config.js'),
      otp = require('otplib/lib/authenticator'),
      db = require('../db'),
      conn  = db.init()
;

/**
 * Check a users otp from google authenticator
 */
function validOTPCode(username, code) {
    return conn
        .select('secret')
        .from('users')
        .where({name: username})
        .limit(1)
        .then(users => users[0])
        .then(dbuser => {
            return otp.check(code, dbuser.secret);
        });
}

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
                const error = new Error('Not a valid user');
                error.statusCode = 401;
                throw error;
            }
        });
};

module.exports = {
    tokenForUser, validOTPCode
}

