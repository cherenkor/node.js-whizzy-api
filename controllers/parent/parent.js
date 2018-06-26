var Parents = require('../../models/parents');
var Parent = require('../../models/parent/parent');
var KidMeta = require('../../models/kid/kidMeta');
var Kids = require('../../models/kids');
var ObjectID = require('mongodb').ObjectID;

exports.getParentData = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Parents.findById(req.params.id, function(err, parent){
        if(err){
            console.log(err);
            return res.send(err);
        }

        res.send(parent.data);
    });
};

exports.getParentDataInfo = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Parents.findById(req.params.id, function(err, parent){
        if(err){
            console.log(err);
            return res.send(err);
        }

        var request = parent.data[req.params.dataType];

        if(request){
            if(typeof request === 'number'){
                res.send(request.toString());
            } else {
                res.send(request);
            }
        } else {
            res.sendStatus(400);
        }
    });
};

//POST
exports.postInParentData = function(req, res){
    console.log(req.body);
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Parent.postInParentData(req.params.id, req.params.dataType, req.body, function(err, result){
        console.log(req.body);
        if(err){
            console.log(err);
            return res.send(err);
        }

 
        
        KidMeta.postParents(req.body, req.params.id, function(err, result){
            console.log(req.body);
            if(err){
                console.log(err);
                return res.sendStatus(err);
            }
    
            Kids.findById(req.body, function(err, kid){
            if(err){
                console.log(err);
                return res.sendStatus(err);
            }
            console.log(kid);
            return res.send(kid);
                
            });
//            res.sendStatus(200);
        });
    });

    
};