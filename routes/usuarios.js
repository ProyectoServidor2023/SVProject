var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var db = mongoose.connection;

const Usuario = require("../models/Usuario");

// Listar todos los usuarios

router.get("/", function (req, res, next) {
  Usuario.find()
    .sort("-creationdate")
    .exec(function (err, usuarios) {
      if (err) res.status(500).send(err);
      else res.status(200).json(usuarios);
    });
});

// Obterner usuario por id

router.get("/:id", function (req, res, next) {
  Usuario.findById(req.params.id, function (err, usuario) {
    if (err) res.status(500).send(err);
    else res.status(200).json(usuario);
  });
});

// Insertar usuario

router.post("/", function (req, res, next) {
  Usuario.create(req.body, function (err, usuario) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// Actualizar usuario

router.put("/:id", function (req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function (err, usuario) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// Eliminar usuario

router.delete("/:id", function (req, res, next) {
  Usuario.findByIdAndDelete(req.params.id, function (err, usuario) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;
