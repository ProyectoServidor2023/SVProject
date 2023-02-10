var express = require('express');
var router = express.Router();
var vehiculo = require('../models/Vehiculo');
var mongoose = require('mongoose');
const Vehiculo = require('../models/Vehiculo');
var db = mongoose.connection;

// GET del listado de vehículos ordenados por fecha de creación
router.get("/", function (req, res, next) {
  Vehiculo.find()
    .sort("-Tipo")
    .populate('Propietario').exec(function(err
      , posts){
        if (err) res.status(500).send(err);
        else res.status(200).json(posts);
    });
});

// GET de un único vehículo por su Id
router.get('/all/:id', function(req, res, next) {
  Vehiculo.find({'Vehiculo': req.params.id }).sort('-Tipo').populate('Propietario').exec(function(err, vehiculos) {
      if (err) res.status(500).send(err);
      else res.status(200).json(vehiculos);
  });
});

// POST de un nuevo vehículo
router.post("/", function (req, res, next) {
  Vehiculo.create(req.body, function (err, vehiculoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

//PUT de un vehículo para actualizarlo
router.put("/:id", function (req, res, next) {
  Vehiculo.findByIdAndUpdate(req.params.id, req.body, function (err, vehiculoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de un vehículo existente identificado por su Id
router.delete('/:id', function(req, res, next) {
  Vehiculo.findByIdAndDelete(req.params.id, function(err, vehiculoinfo) {
  if (err) res.status(500).send(err);
  else res.sendStatus(200);
  });
  });

module.exports = router;
