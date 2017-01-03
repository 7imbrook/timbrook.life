const provider = require('../provider'),
      should = require('should')
;

describe('Provider', () => {
    describe('#tokenForUser', () => {
        it('should return valid token structor', () => {
            const token = provider.tokenForUser("testuser");
            token.should.be.type('string');
            token.split('.').should.have.length(3);
            // Not verifing payload
            const buf = new Buffer(token.split('.')[1], 'base64');
            const payload = JSON.parse(buf.toString());
            payload.should.have.properties('exp', 'user', 'role');
        });
        it('should expire in an hour', () => {
            const token = provider.tokenForUser("testuser");
            // Not verifing payload
            const buf = new Buffer(token.split('.')[1], 'base64');
            const payload = JSON.parse(buf.toString());
            const exp = parseInt(payload.exp);
            exp.should.equal(Math.floor(Date.now() / 1000) + (60 * 60));
        });
    });
});
