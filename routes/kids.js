var express = require('express');
var routes = express();

//Kids CONTROLLERS
var kidsController = require('../controllers/kids');
var kidController = require('../controllers/kid/kid');
var kidMetaController = require('../controllers/kid/kidMeta');
var kidDataController = require('../controllers/kid/kidData');
var kidDataWorldController = require('../controllers/kid/worlds/world');

//KIDS routes
routes.get('/', kidsController.all);
routes.post('/', kidsController.create);
routes.get('/:id', kidsController.findById);
routes.delete('/:id', kidsController.delete);

// KID/META
routes.get('/:id/meta', kidController.getMeta);
routes.post('/:id/meta', kidController.postMeta);

// KID/meta/devices
routes.get('/:id/meta/devices', kidMetaController.getDevices);
routes.post('/:id/meta/devices', kidMetaController.postDevices);

// KID/meta/most_active_device
routes.get('/:id/meta/mostactive_device', kidMetaController.getMostActiveDevice);
routes.post('/:id/meta/mostactive_device', kidMetaController.postMostActiveDevice);

// KID/meta/last_connected_device
routes.get('/:id/meta/last_connected_device', kidMetaController.getLastConnectedDevice);
routes.post('/:id/meta/last_connected_device', kidMetaController.postLastConnectedDevice);

// KID/meta/parents
routes.get('/:id/meta/parents', kidMetaController.getParents);
routes.post('/:id/meta/parents', kidMetaController.postParents);

// KID/DATA
routes.get('/:id/data', kidController.getData);
routes.post('/:id/data', kidController.postData);

// KID/data/age
routes.get('/:id/data/age', kidDataController.getAge);
routes.post('/:id/data/age', kidDataController.postAge);

// KID/data/name
routes.get('/:id/data/name', kidDataController.getName);
routes.post('/:id/data/name', kidDataController.postName);

// KID/data/gender
routes.get('/:id/data/gender', kidDataController.getGender);
routes.post('/:id/data/gender', kidDataController.postGender);

// KID/data/worlds
routes.get('/:id/data/worlds', kidDataController.getWorlds);
routes.get('/:id/data/worldnames', kidDataController.getWorldNames);

//KID/data/worlds/:world
routes.get('/:id/data/worlds/:world', kidDataWorldController.getWorld);
routes.post('/:id/data/worlds/', kidDataWorldController.postWorld);

//KID/data/worlds/:world/world_score
routes.get('/:id/data/worlds/:world/world_score', kidDataWorldController.getWorldScore);
routes.post('/:id/data/worlds/:world/world_score', kidDataWorldController.postWorldScore);

//KID/data/worlds/:world/games
routes.get('/:id/data/worlds/:world/games', kidDataWorldController.getAllGames);
routes.get('/:id/data/worlds/:world/gamenames', kidDataWorldController.getGameNames);
routes.get('/:id/data/worlds/:world/games/:game/history', kidDataWorldController.getGameHistory);
routes.get('/:id/data/worlds/:world/games/:game/best_result', kidDataWorldController.getGameBestResult);


module.exports = routes;
