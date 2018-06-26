var KidMeta = require('../../models/kid/kidMeta');
var Kids = require('../../models/kids');
var ObjectID = require('mongodb').ObjectID;

//GET
exports.getDevices = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.meta.devices);
    });
};

exports.getMostActiveDevice = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.meta.mostactive_device);
    });
};

exports.getLastConnectedDevice = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.meta.last_connected_device);
    });
};

exports.getParents = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.meta.parents);
    });
};

//POST
exports.postDevices = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    KidMeta.postDevices(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(result);
    });
};

exports.postMostActiveDevice = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    KidMeta.postMostActiveDevice(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(result);
    });
};

exports.postLastConnectedDevice = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    KidMeta.postLastConnectedDevice(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(result);
    });
};

exports.postParents = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    KidMeta.postParents(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(result);
    });
};