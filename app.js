var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var ObjectID = require('mongodb').ObjectID;
var configs = require('./configs');
var router = require('./routes');
var os = require('os');

//Body-parser middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended : true}));
app.get('/api', function(req, res){ 
    res.send({ "message" : "welcome to whizzy api"});
});

//Main route
app.use('/api', router);

db.connect(configs.db.url, function(err){
    if(err){
        return console.log(err);
    }

    app.listen(configs.app.port, function () {
        console.log('Connected to the DB on port ' + configs.app.port);
    });
});