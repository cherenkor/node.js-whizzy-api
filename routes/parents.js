var express = require('express');
var routes = express();

//Parents CONTROLLERS
var parentsController = require('../controllers/parents');
var parentController = require('../controllers/parent/parent');


//PARENTS routes
routes.get('/', parentsController.all);
routes.post('/', parentsController.create);
routes.get('/:id', parentsController.findById);
routes.post('/authenticate', parentsController.login);
routes.delete('/:id', parentsController.delete);

//PARENT/data
routes.get('/:id/data', parentController.getParentData);

//PARENT/data/:dataType
routes.get('/:id/data/:dataType', parentController.getParentDataInfo);
routes.post('/:id/data/:dataType', parentController.postInParentData);


module.exports = routes;