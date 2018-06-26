var db = require('../../db');
var ObjectID = require('mongodb').ObjectID;

//POST
exports.postInParentData = function(id, dataType, newData, callback){
    
    if(dataType == 'children'){
        var newValues = { $addToSet : { ['data.children'] : { '_id' : newData }}};
        db.get().collection('parents').update({ _id : ObjectID(id)}, newValues, { upsert : true }, function(err, result){
            callback(err, result);
        });
    } else {
        var newValues = { $set : { ['data.' + dataType] : newData }};
        db.get().collection('parents').update({ _id : ObjectID(id)}, newValues, function(err, result){
            callback(err, result);
        });
    }
};

