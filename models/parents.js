var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

exports.all = function(callback){
    db.get().collection('parents').find().toArray(function(err, parents){
        callback(err, parents);
    });
};

exports.findByEmail = function(email, callback){
    db.get().collection('parents').findOne({ email : email }, function(err, parent){
        callback(err, parent);
    });
};

exports.findById = function(id, callback){
    db.get().collection('parents').findOne({ _id : ObjectID(id) }, function(err, parent){
        callback(err, parent);
    });
};

exports.create = function(parent, callback){

    var parentStructure = {
        "name" : parent.name,
        "email" : parent.email,
        "password" : parent.password,
        "data" : {
            "children" : []
        }
    };

    db.get().collection('parents').insert(parentStructure, function(err, result){
        callback(err, result);
    });
};

exports.delete = function(id, callback){
    db.get().collection('parents').deleteOne({ _id : ObjectID(id) }, function(err, result){
        callback(err, result);
    });
};