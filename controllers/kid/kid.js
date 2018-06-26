var Kid = require('../../models/kid/kid');
var Kids = require('../../models/kids');
var Parents = require('../../models/parents');
var Parent = require('../../models/parent/parent');
var ObjectID = require('mongodb').ObjectID;
var KidMeta = require('../../models/kid/kidMeta');
var db = require('../../db');

//Kid Meta
exports.getMeta = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);
    
    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.meta);
    });
};

exports.postMeta = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        if(kid == null)
            return res.sendStatus(404);

        var meta = kid.meta;
        var devices = meta.devices;
        devices.push(req.body.device);

        var mostFrequent = 1;
        var currentMostFrequent = 0;
        var mostActive;

        //Find most active device
        for (var i = devices.length - 1; i >= 0; i--) {
            for (var j=i; j < devices.length; j++){
                    if (devices[i] == devices[j])
                     currentMostFrequent++;

                    if (mostFrequent < currentMostFrequent){
                      mostFrequent = currentMostFrequent; 
                      mostActive = devices[i];
                    }
            }

            currentMostFrequent = 0;
        }
        //

        var newMeta = {
            "devices": devices,
            "mostactive_device": mostActive,
            "last_connected_device": req.body.device,
            "parents": kid.meta.parents
        };

        Kid.postMeta(req.params.id, newMeta, function(err, result){
            if(err){
                console.log(err);
                return res.sendStatus(err);
            }

            res.sendStatus(200);
        });

    });
};
//end Meta

//Kid Data
exports.getData = function(req, res){
    console.log("DATA");
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(kid.data);
    });
};

exports.postData = function(req, res){
    var kidData = JSON.parse(req.body);
    
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false){      
        return res.sendStatus(400);
    }

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        if(kid == null){
            console.log("Bad request in kid 404");            
            return res.sendStatus(404);
        }

        Parents.findById(kidData.parent_id, function(err, parent){
            if(err){
                console.log(err);
                return res.send(err);
            }
            
            if (!("data" in parent))
                parent.data={children:[]};
            if (!("children" in parent.data))
                    parent.data.children=[];
            var request = parent.data["children"];
            var kidAdded = false;
            var children;
    
            if(request){
                children = parent.data.children;
            } else {
                console.log("Bad request in parent 400");                
                res.sendStatus(400);
            }

            children.forEach(kid => {
                if(req.params.id == kid._id)
                    kidAdded = true;
            });

            if(kidAdded){
                console.log("Bad request 401");
                res.sendStatus(401);
            } else {
                Parent.postInParentData(kidData.parent_id, "children", req.params.id, function(err, result){
                    if(err){
                        console.log(err);
                        return res.send(err);
                    }
            
                    KidMeta.postParents(req.params.id, kidData.parent_id, function(err, result){
                        if(err){
                            console.log(err);
                            return res.sendStatus(err);
                        }
                
                        Kid.postData(req.params.id, kidData, kid, function(err, result){
                            if(err){
                                console.log(err);
                                return res.sendStatus(err);
                            }

                            res.sendStatus(200);
                            console.log("ENDED");
                        });
                    });
                });
            }
        });
    });
};
//end Data



