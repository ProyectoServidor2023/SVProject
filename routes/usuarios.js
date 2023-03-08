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

// Obtener usuario por dni
router.post("/dni", function (req, res) {
  Usuario.findOne({ dni: req.body.dni }, function (err, usuario) {
    if (err) res.status(500).send("¡Error comprobando el usuario!");
    // Si el usuario existe...
    if (usuario != null) {
      res.status(200).json(usuario);
    } else res.status(401).send({ err });
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

// Login de usuario
router.post("/signin", function (req, res, next) {
  Usuario.findOne({ dni: req.body.dni }, function (err, usuario) {
    if (err) res.status(500).send("¡Error comprobando el usuario!");
    // Si el usuario existe...
    if (usuario != null) {
      usuario.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return next(err);
        // Si el password es correcto...
        if (isMatch)
          res
            .status(200)
            .send({ message: "ok", role: usuario.role, id: usuario._id });
        else res.status(200).send({ message: "la password no coincide" });
      });
    } else res.status(401).send({ message: "usuario no registrado" });
  });
});

module.exports = router;
