var KidData = require('../../models/kid/kidData');
var Kids = require('../../models/kids');
var ObjectID = require('mongodb').ObjectID;

//GET
exports.getAge = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.data.age);
    });
};

exports.getName = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.data.name);
    });
};

exports.getGender = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.data.gender);
    });
};

exports.getWorlds = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.data.worlds);
    });
};

exports.getWorldNames = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }
       var getKeys = function(obj){
	    var keys = [];
	    for(var key in obj){
    	keys.push(key);
	    }
	    return keys;
    }

        res.send(getKeys(kid.data.worlds));
    });
};


//POST
exports.postAge = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    KidData.postAge(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(result);
    });
};

exports.postName = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    KidData.postName(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(result);
    });
};

exports.postGender = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    KidData.postGender(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(result);
    });
};

exports.postWorlds = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    KidData.postWorlds(req.params.id, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(result);
    });
};