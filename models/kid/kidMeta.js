var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;

//POST
exports.postDevices = function(id, newData, callback){
    var newValues = { $addToSet : { 'meta.devices' : newData}};    
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};

exports.postMostActiveDevice = function(id, newData, callback){
    var newValues = { $set : { 'meta.mostactive_device' : newData}};    
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};

exports.postLastConnectedDevice = function(id, newData, callback){
    var newValues = { $set : { 'meta.last_connected_device' : newData}};    
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};

exports.postParents = function(id, newData, callback){
    var newValues = { $addToSet : { 'meta.parents' : { '_id' : newData}}}; 
    console.log(newValues);
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};