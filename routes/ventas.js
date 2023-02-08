var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var db = mongoose.connection;

//Modelos
var User = require('../models/Usuario.js');
var Vehiculo = require('../models/Vehiculo.js');
var Venta = require('../models/Venta');

/* GET users listing. */
router.get('/', function(req, res, next) {

  Venta.find().sort('-fecha').populate('Id_propietario', 'Id_vehiculo', 'Id_comprador')
});

module.exports = router;
