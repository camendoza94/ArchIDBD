// Modules
"use strict";
const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes/index');

// Vars
let app = express();

app.use(bodyParser.json({limit: '50mb'}));

// Obtained from http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

routes(app);


const listener = app.listen(process.env.PORT || 8888, function() {
    console.log('App running on http://localhost:' + listener.address().port);
});