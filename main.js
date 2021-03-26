'use strict';

require('./init')();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const hostname = '127.0.0.1';
const port = 3000;

const apiRoutes = require('./routes/api');
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));

app.use('/api', apiRoutes);



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});