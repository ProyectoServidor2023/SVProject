var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var db = mongoose.connection;

//Modelos
var User = require("../models/Usuario.js");
var Vehiculo = require("../models/Vehiculo.js");
var Venta = require("../models/Venta");

// GET de todas las ventas
router.get("/", function (req, res, next) {
  Venta.find()
    .sort("-fecha")
    .populate("Id_vehiculo")
    .populate("Id_comprador")
    .exec(function (err, Venta) {
      if (err) res.status(500).send(err);
      else res.status(200).json(Venta);
    });
});

// GET de una venta segun su id
router.get("/all/:id", function (req, res, next) {
  Venta.find({ Venta: req.params.id })
    .populate("Id_vehiculo")
    .populate("Id_comprador")
    .exec(function (err, Venta) {
      if (err) res.status(500).send(err);
      else res.status(200).json(Venta);
    });
});

// POST de una venta
router.post("/", function (req, res, next) {
  Venta.create(req.body, function (err, Venta) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT de una venta para actualizarla segun su id
router.put("/:id", function (req, res, next) {
  Venta.findByIdAndUpdate(req.params.id, req.body, function (err, Venta) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de una venta segun su id
router.delete("/:id", function (req, res, next) {
  Venta.findByIdAndDelete(req.params.id, function (err, Venta) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
