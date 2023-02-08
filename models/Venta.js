var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Usuario = require("../models/Usuario");
var Vehiculo = require("../models/Vehiculo");

var VentaSchema = new Schema({

Id_vehiculo: {
    type: Schema.ObjectId,
    ref: "Vehiculo",
},
Id_propietario: {
    type: Schema.ObjectId,
    ref: "Usuario",
},  
Id_comprador: {
    type: Schema.ObjectId,
    ref: "Usuario",
},  
fecha: { type: Date, required: true },
precio: { type: Number, required: true }
});

module.exports = mongoose.model("Venta", VentaSchema);
