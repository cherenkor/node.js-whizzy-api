var db = require('../../../db');
var ObjectID = require('mongodb').ObjectID;

//POST
exports.postWorld = function(id, newValues, callback){

  // db.get().collection('kids').findOne({ _id : ObjectID(id) }, function(err, kid){
  //
  //       console.log(i + ". Find");
  //       //IF old game
  //       // try{
  //       //     console.log("OLD");
  //       //
  //       //     var data = kid.data;
  //       //     var history = game.history;
  //       //     var bestTime, bestScore;
  //       //     history.push({ "timestamp" : newGame.timestamp, "time_in_game" : newGame.timeInGame, "result" : newGame.result});
  //       //
  //       //
  //       //     //Calculate best result
  //       //     if(newGame.result == "success"){
  //       //         bestTime = newGame.bestTime > game.best_result.best_time ? newGame.bestTime : game.best_result.best_time;
  //       //         bestScore = newGame.bestScore > game.best_result.best_score ? newGame.bestScore : game.best_result.best_score;
  //       //     } else {
  //       //         bestTime = game.best_result.best_time;
  //       //         bestScore = game.best_result.best_score;
  //       //     }
  //       //
  //       //     var oldData = "{";
  //
  //           // games.forEach(game => {
  //           //
  //           //     var newData = JSON.stringify({ name : {
  //           //         "games" : {
  //           //             [game.name] : {
  //           //                 "name" : game.name,
  //           //                 "level" : game.level,
  //           //                 "subject" : game.subject,
  //           //                 "history" : game.history,
  //           //                 "best_result" : {
  //           //                     "best_time" : game.bestTime,
  //           //                     "best_score" : game.bestScore,
  //           //                 },
  //           //                 "specific_data" : {
  //           //                     "any" : game.specificAny,
  //           //                     [game.specificType] : game.specificData
  //           //                 }
  //           //             }
  //           //         }
  //           //     }
  //           // });
  //           //
  //           //     oldData = oldData + newData;
  //           //
  //           // });
  //           //
  //           // oldData = oldData.substring(0, oldData.length - 1);
  //           // var newData = oldData;
  //           // console.log(oldData);
  //
  //           // var newData = oldData.substring(1, oldData.length - 1);
  //           // newData = newData + "}";
  //           // console.log(newData);
  //
  //           // games.forEach(game => {
  //           //
  //           //     var name = game.world;
  //           //
  //           //     var newData = JSON.stringify({ name : {
  //           //             "games" : {
  //           //                 [game.name] : {
  //           //                     "name" : game.name,
  //           //                     "level" : game.level,
  //           //                     "subject" : game.subject,
  //           //                     "history" : game.history,
  //           //                     "best_result" : {
  //           //                         "best_time" : game.bestTime,
  //           //                         "best_score" : game.bestScore,
  //           //                     },
  //           //                     "specific_data" : {
  //           //                         "any" : game.specificAny,
  //           //                         [game.specificType] : game.specificData
  //           //                     }
  //           //                 }
  //           //             }
  //           //         }
  //           //     });
  //           //
  //           //     oldData = newData + ",";
  //           // });
  //           //
  //           // oldData = oldData.charAt(oldData.length-1);
  //           //
  //           //
  //           //
  //           //
  //           // var newData = { [game.world] : {
  //           //         "games" : {
  //           //             [game.name] : {
  //           //                 "name" : game.name,
  //           //                 "level" : game.level,
  //           //                 "subject" : game.subject,
  //           //                 "history" : history,
  //           //                 "best_result" : {
  //           //                     "best_time" : bestTime,
  //           //                     "best_score" : bestScore,
  //           //                 },
  //           //                 "specific_data" : {
  //           //                     "any" : newGame.specificAny,
  //           //                     [newGame.specificType] : game.specific_data[newGame.specificType]
  //           //                 }
  //           //             }
  //           //         }
  //           //     }
  //           // };
  //
  //       //     var newValues = { $set : { 'data.worlds' : JSON.parse(newData)}};
  //       //
  //       // // IF new game
  //       // } catch (e){
  //           // console.log("NEW GAME");
  //           var newValues = { $set : { ['data.worlds.' + newGame.world + '.games.' + newGame.name] : {
  //               "name" : newGame.name,
  //               "level" : newGame.level,
  //               "subject" : newGame.subject,
  //               "history" : [
  //                   { "timestamp" : newGame.timestamp, "time_in_game" : newGame.timeInGame, "result" : newGame.result}
  //               ],
  //               "best_result" : {
  //                   "best_time" : newGame.bestTime,
  //                   "best_score" : newGame.bestScore
  //               },
  //               "specific_data" : {
  //                   "any" : newGame.specificAny,
  //                   [newGame.specificType] : newGame.specificData
  //               }
  //           } } };
  //       // }
  //
  //
  //
  //       console.log(i + ". END");
  //
  //   });

    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, { upsert: true }, function(err, result){
        console.log(". Update");

        callback(err, result);
    });
};

exports.postAllGames = function(id, world, newData, callback){
    var newValues = { $set : {['data.worlds.' + world + '.games'] : newData }};
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};

exports.postWorldScore = function(id, world, newData, callback){
    var newValues = { $set : {['data.worlds.' + world + '.world_score'] : newData }};
    db.get().collection('kids').update({ _id : ObjectID(id) }, newValues, function(err, result){
        callback(err, result);
    });
};
