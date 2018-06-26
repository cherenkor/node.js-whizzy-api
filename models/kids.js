var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function(callback){
    db.get().collection('kids').find().toArray(function(err, kids){
        callback(err, kids);
    });
};

exports.findById = function(id, callback){
    db.get().collection('kids').findOne({ _id : ObjectID(id) }, function(err, kid){
        callback(err, kid);
    });
};

exports.create = function(data, callback){

    console.log(data.device);
    var kid = {
        "meta": {
            "devices": [ data.device ],
            "mostactive_device": data.device,
            "last_connected_device": data.device,
            "parents": []
        },
        "data": {
            "age": "",
            "name": "",
            "gender": "",
            "worlds": {}
        }
    };

    db.get().collection('kids').insert(kid, function(err, result){
        callback(err, result);
    });
};

exports.delete = function(id, callback){
    db.get().collection('kids').deleteOne({ _id : ObjectID(id) }, function(err, result){
        callback(err, result);
    });
};