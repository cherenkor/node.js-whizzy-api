var Otherwise = require('../models/otherwise');
var ObjectID = require('mongodb').ObjectID;

exports.progress = function(req, res){
    Otherwise.progress(req.params.world,req.params.progress,function(err, progress){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(progress);
    });
};

