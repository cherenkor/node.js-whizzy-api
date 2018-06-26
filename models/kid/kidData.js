var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;

//POST
exports.postAge = function(id, newData, callback){
    var newValues = { $set : { 'data.age' : newData}};    
    console.log(newValues);  
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};

exports.postName = function(id, newData, callback){
    var newValues = { $set : { 'data.name' : newData}};  
    console.log(newValues);  
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};

exports.postGender = function(id, newData, callback){
    var newValues = { $set : { 'data.gender' : newData}};    
    console.log(newValues);  
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};

exports.postWorlds = function(id, newData, callback){
    var getWorldNameFromNewData = Object.keys(newData)[0];
    var newValues = { $set : { ['data.worlds.' + getWorldNameFromNewData] : newData[Object.keys(newData)[0]]}};    
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, {upsert : true}, function(err, result){
        callback(err, result);
    });
};