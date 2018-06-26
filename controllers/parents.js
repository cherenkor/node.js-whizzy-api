var Parents = require('../models/parents');
const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
var ObjectID = require('mongodb').ObjectID;

exports.all = function(req, res){
    Parents.all(function(err, parents){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        res.send(parents);
    });
};

exports.login = function(req,res) {
    //console.log(req);
    const credentials = auth(req);
    console.log(credentials.name, credentials.pass);
      //  if(ObjectID.isValid(redentials.name) == false)
      //  return res.sendStatus(400);

    Parents.findByEmail(credentials.name, function(err, parent){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        if (parent!=null && parent.password==credentials.pass) {
    const token = jwt.sign({name: credentials.name, pass: credentials.pass},'Learn2Crack',{expiresIn:1440});
            parent.token=token;
        console.log(parent);
        res.send( parent);

        } else {
            if (parent==null)
                res.sendStatus(404);
            else
                res.sendStatus(401);
        }
    });


}

exports.findById = function(req, res){
    //Check ObjectID support for requested id
    console.log(req.params.id);
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Parents.findById(req.params.id, function(err, parent){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        parent == null ? res.sendStatus(404) : res.send(parent);
        if (parent!=null)
        console.log(parent);
    });
};

exports.create = function(req, res){
    console.log(req.body);

    Parents.findByEmail(req.body.email, function(err, parent){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        if (parent){
          res.sendStatus(400);
        } else {
          Parents.create(req.body, function(err, result){
              if(err){
                  console.log(err);
                  return res.sendStatus(err);
              }
              //return parent ID in response
              res.send({
                type: 'POST' ,
                body: result.ops[0]._id
              });
          });
        }
    });
};

exports.delete = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Parents.delete(req.params.id, function(err, result){
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        //Return 'Not found' if kids wasn't found
        result.result.n == 1 ? res.sendStatus(200) : res.sendStatus(404);
    });
};
