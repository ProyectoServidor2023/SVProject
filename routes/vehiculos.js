var express = require("express");
var router = express.Router();
var vehiculo = require("../models/Vehiculo");
var mongoose = require("mongoose");
const Vehiculo = require("../models/Vehiculo");
var db = mongoose.connection;

// GET del listado de vehículos ordenados por fecha de creación
router.get("/", function (req, res, next) {
  let parametro = req.query.Tipo

  if(parametro != null){

  Vehiculo.find({Tipo: {$regex:parametro}}, function(err, vehiculo) {
    if (err) res.status(500).send('¡No hay coches con ese tipo disponibles!');
    // Si hay modelos disponibles...
    if (vehiculo != null) {
        res.status(200).json(vehiculo);
    } else res.status(401).send({ err });
  });
} else{

  Vehiculo.find()
    .sort("-Precio")
    .populate("Propietario")
    .exec(function (err, posts) {
      if (err) res.status(500).send(err);
      else res.status(200).json(posts);
    });
  }
});

//Get Listar vehículos por modelo
router.get('/modelo/:model', function(req, res) {
  let parametro = req.params.model;
  Vehiculo.find({Modelo: {$regex:parametro}}, function(err, vehiculo) {
      if (err) res.status(500).send('¡No hay coches con ese modelo disponibles!');
      // Si hay modelos disponibles...
      if (vehiculo != null) {
          res.status(200).json(vehiculo);
      } else res.status(401).send({ err });
  });
});

//Get Listar vehículos por tipo
router.get('/tipo/:type', function(req, res) {
  let parametro = req.params.type
  Vehiculo.find({Tipo: {$regex:parametro}}, function(err, vehiculo) {
      if (err) res.status(500).send('¡No hay coches con ese tipo disponibles!');
      // Si hay modelos disponibles...
      if (vehiculo != null) {
          res.status(200).json(vehiculo);
      } else res.status(401).send({ err });
  });
});

// GET de un único vehículo por su Id
router.get("/:id", function (req, res, next) {
  Vehiculo.findById(req.params.id)
    .populate("Propietario")
    .exec(function (err, vehiculos) {
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
  Vehiculo.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, vehiculoinfo) {
      if (err) res.status(500).send(err);
      else res.sendStatus(200);
    }
  );
});

// DELETE de un vehículo existente identificado por su Id
router.delete("/:id", function (req, res, next) {
  Vehiculo.findByIdAndDelete(req.params.id, function (err, vehiculoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
