const provider = require('../provider'),
      should = require('should'),
      db = require('../db'),
      otp = require('otplib/lib/authenticator')
;

const SECRET = otp.generateSecret();

describe('Provider', () => {
    describe('#tokenForUser', () => {

        const conn = db.init();
        before(() => {
            return db.setup(conn)
                .then(() => {
                    return conn('users')
                        .insert({
                            name: 'testuser',
                            role: 'readonly',
                            secret: SECRET
                        });
                });
        });

        after(() => {
            return conn.destroy()
                .then(() => {
                    db.destroyTestDB();
                });
        });

        it('should return valid token structor', () => {
            return provider.tokenForUser("testuser").then(
                token => {
                    token.should.be.type('string');
                    token.split('.').should.have.length(3);
                    // Not verifing payload
                    const buf = new Buffer(token.split('.')[1], 'base64');
                    const payload = JSON.parse(buf.toString());
                    payload.should.have.properties('exp', 'user', 'role');
                }
            );
        });
        it('should expire in an hour', () => {
            return provider.tokenForUser("testuser").then(
                token => {
                    // Not verifing payload
                    const buf = new Buffer(token.split('.')[1], 'base64');
                    const payload = JSON.parse(buf.toString());
                    const exp = parseInt(payload.exp);
                    exp.should.equal(
                        Math.floor(Date.now() / 1000) + provider.EXP_TIME
                    );
                }
            );
        });
        it('should fail if user is not found', () => {
            return provider.tokenForUser("notauser")
                .then(token => {
                    console.log(token);
                }).catch(err => {
                    err.message.should.equal('Unauthorized');
                });
        });
    });

    describe('#validOTPCode', () => {
        it('doesn\'t work for a non existant user', () => {
            return provider.validOTPCode('blabla', 000000)
                .should.be.rejectedWith(Error, { message: 'Unauthorized' });
        });
        it('correctly fails wrong code', () => {
            return provider.validOTPCode('testuser', 000000)
                .should.be.fulfilledWith(false);
        });
        it('correctly verify correct code', () => {
            const code = otp.generate(SECRET);
            return provider.validOTPCode('testuser', code)
                .should.be.fulfilledWith(true);
        });
    });
});
