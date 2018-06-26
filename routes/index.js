var express = require('express');
var router = express();
var kidsRoutes = require('./kids');
var parentsRoutes = require('./parents');
var otherwiseRoutes  = require('./otherwise');

router.use('/kids', kidsRoutes);
router.use('/parents', parentsRoutes);
router.use("/otherwise",otherwiseRoutes);

module.exports = router;