var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;

//Kid Meta
exports.postMeta = function(id, newMeta, callback){
    var newValues = { $set : { 'meta' : newMeta }};
    db.get().collection('kids').findOneAndUpdate({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};

//Kid Data
exports.postData = function(id, newData, kid, callback){

    var newValues = { $set : { 
        "data" : {
            "name" : newData.name,
            "age" : newData.age,
            "gender" : newData.gender,
            "worlds" : kid.data.worlds
        } 
    }};    
    db.get().collection('kids').findOneAndUpdate({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};