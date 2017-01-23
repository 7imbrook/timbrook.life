const jwt = require('jsonwebtoken'),
      config = require('../config.js'),
      otp = require('otplib/lib/authenticator'),
      db = require('../db'),
      conn  = db.init()
;

const EXP_TIME = (60 * 60 * 24);

function assertDefined(arg) {
    if (arg === undefined) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
    }
    return arg;
}

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
        .then(assertDefined)
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
        .then(assertDefined)
        .then(dbuser => {
            return jwt.sign({
                exp: Math.floor(Date.now() / 1000) + EXP_TIME,
                user,
                role: dbuser.role
            }, config.jwt_secret);
        });
};

module.exports = {
    tokenForUser, validOTPCode, EXP_TIME
}

