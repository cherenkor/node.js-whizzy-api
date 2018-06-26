var express = require('express');
var routes = express();

//otherwise CONTROLLERS
var otherwiseController = require('../controllers/otherwise');

//otherwise routes
routes.get('/progress/:world/:progress', otherwiseController.progress);

module.exports = routes;
