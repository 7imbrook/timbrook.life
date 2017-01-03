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
    provider.tokenForUser(req.body.username)
        .then(token => {
            res.send({token});
        })
        .catch(next);
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500);
    res.send(err.message);
});

db.setup(conn)
    .then(() => {
        app.listen(8080, () => {
            console.log('Example app listening on port 8080!')
        });
    });
