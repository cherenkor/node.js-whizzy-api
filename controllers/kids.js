var Kids = require('../models/kids');
var ObjectID = require('mongodb').ObjectID;

exports.all = function(req, res){
    Kids.all(function(err, kids){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kids);
    });
};

exports.findById = function(req, res){

    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        return kid == null ? res.sendStatus(404) : res.send(kid);
    });
};

exports.create = function(req, res){
    Kids.create(req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        //return kids ID in response
        res.send(result.ops[0]._id);
    });
};

exports.delete = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.delete(req.params.id, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        //Return 'Not found' if kids wasn't found
        result.result.n == 1 ? res.sendStatus(200) : res.sendStatus(404);
    });
};