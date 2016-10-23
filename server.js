'use strict';

const path = require('path'),
      express = require('express'),
      app = express();

app.use(express.static(__dirname + '/dist'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(8080, () => console.log('serving on 8080...') );

