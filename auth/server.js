const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      provider = require('./provider'),
      db = require('./db');
      conn = db.init()
;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res, next) => {
    provider.validOTPCode(req.body.username, req.body.code)
        .then(valid => {
            if (valid) {
                provider.tokenForUser(req.body.username)
                    .then(token => {
                        console.info('Leasing token for ' + req.body.username);
                        res.send({token});
                    })
                    .catch(next);
            } else {
                const err = new Error('Unauthorized');
                err.statusCode = 401;
                next(err);
            }
        })
        .catch(next);
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.send(err.message);
    console.log(err.message, req.body);
});

app.set('PORT', parseInt(process.env.PORT || 8080));
db.setup(conn)
    .then(() => {
        app.listen(app.get('PORT'), () => {
            console.info('Auth service up listening on ' + app.get('PORT'));
        });
    });
