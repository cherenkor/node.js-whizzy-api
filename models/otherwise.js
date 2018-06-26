var db = require('../db');
var ObjectID = require('mongodb').ObjectID;


exports.progress = function(world,prog, callback){
    db.get().collection('otherwise').findOne({ _id :ObjectID("5b0da79634e8ccea64d95162")}, 
		function(err, rez){
	//console.log(prog);
	//console.log(rez["progress"][world][prog]);
        callback(err, rez["progress"][world][prog]);
    });
};

