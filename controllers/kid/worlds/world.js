var World = require('../../../models/kid/worlds/world');
var Kids = require('../../../models/kids');
var ObjectID = require('mongodb').ObjectID;

//GET
exports.getWorld = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.send(err);
        }

        res.send(kid.data.worlds[req.params.world]);
    });
};

exports.getAllGames = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.send(err);
        }

        res.send(kid.data.worlds[req.params.world].games);
    });
};

exports.getGameHistory = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.send(err);
        }

        res.send(kid.data.worlds[req.params.world].games[req.params.game].history);
    });
};

exports.getGameBestResult = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.send(err);
        }

        res.send(kid.data.worlds[req.params.world].games[req.params.game].best_result);
    });
};


exports.getGameNames = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.send(err);
        }
        var getKeys = function(obj){
    	    var keys = [];
    	    for(var key in obj){
        	keys.push(key);
    	    }
    	    return keys;
	}

        res.send(getKeys(kid.data.worlds[req.params.world].games));
    });
};


exports.getWorldScore = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    Kids.findById(req.params.id, function(err, kid){
        if(err){
            console.log(err);
            return res.send(err);
        }

        res.send(kid.data.worlds[req.params.world].world_score.toString());
    });
};

//POST
exports.postWorld = function(req, res){

    //Parse games' saves from sent json
    console.log(req.body);
    var gamesArr = JSON.parse("[ " + req.body + " ]");

    // Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
      return res.sendStatus(400);

    var id = req.params.id;

    Kids.findById(id, function(err, kid) {
        if(err){
            console.log(err);
            return res.sendStatus(err);
        }

        if(kid == null)
          res.sendStatus(404);

        var kidGamesData = kid.data.worlds;

        for (var i = 0; i < gamesArr.length; i++) {
          var newGame = gamesArr[i];

          try {
              var game = kidGamesData[newGame.world].games[newGame.name];

              if(kidGamesData[newGame.world].games[newGame.name] == undefined)
                throw new Error("New Game in Array");

              var bestTime, bestScore;
              kidGamesData[newGame.world].games[newGame.name].history.push(
                { "timestamp" : newGame.timestamp, "time_in_game" : newGame.timeInGame, "result" : newGame.result, "score" : newGame.bestScore}
              );
              
              //Calculate best result
              if(newGame.result == "success"){
                bestTime = newGame.timeInGame < game.best_result.best_time ? newGame.timeInGame : game.best_result.best_time;
                bestScore = newGame.bestScore > game.best_result.best_score ? newGame.bestScore : game.best_result.best_score;
                kidGamesData[newGame.world].games[newGame.name].best_result = {
                  "best_time" : bestTime,
                  "best_score" : bestScore
                };
              }

              console.log("OLD GAME");

          } catch(e) {

              console.log("NEW GAME");

              try {
                kidGamesData[newGame.world].games[newGame.name] =  {
                    "name" : newGame.name,
                    "level" : newGame.level,
                    "subject" : newGame.subject,
                    "history" : [
		                { "timestamp" : newGame.timestamp, "time_in_game" : newGame.timeInGame, "result" : newGame.result, "score" : newGame.best_score}
                      ],
                    "best_result" : {
                        "best_time" : 1001,
                        "best_score" : newGame.bestScore
                    },
                    "specific_data" : newGame.specificData
                };

              } catch (e){

                  kidGamesData[newGame.world] =  { "games" : {
                    [newGame.name] : {
                        "name" : newGame.name,
                        "level" : newGame.level,
                        "subject" : newGame.subject,
                        "history" : [
			                { "timestamp" : newGame.timestamp, "time_in_game" : newGame.timeInGame, "result" : newGame.result, "score" : newGame.best_score}
                          ],
                        "best_result" : {
                            "best_time" : 1001,
                            "best_score" : newGame.bestScore
                        },
                        "specific_data" : newGame.specificData
                      }
                    }
                  };
                }
            }
          }

        console.log("ENDED " );
        console.log(kid.data.worlds);

        newValues = { $set : { 'data.worlds' : kidGamesData }};
        World.postWorld(id, newValues, (err, result) => {
          if(err){
               console.log(err);
               return res.send(err);
           }

           res.sendStatus(200);

        });
    });
};

exports.postAllGames = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    World.postAllGames(req.params.id, req.params.world, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.send(err);
        }

        res.sendStatus(200);
    });
};

exports.postWorldScore = function(req, res){
    //Check ObjectID support for requested id
    if(ObjectID.isValid(req.params.id) == false)
        return res.sendStatus(400);

    World.postWorldScore(req.params.id, req.params.world, req.body, function(err, result){
        if(err){
            console.log(err);
            return res.send(err);
        }

        res.sendStatus(200);
    });
};
