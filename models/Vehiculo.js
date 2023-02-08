var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Usuario = require("../models/Usuario");

var VehicleSchema = new Schema({
  Matricula: { type: String, required: true, index: { unique: true } },
  Propietario: {
    type: Schema.ObjectId,
    ref: "Usuario",
  },
  Tipo: { type: String, required: true },
  Modelo: { type: String, required: true },
  Color: { type: String },
  Descripcion: { type: String },
  Precio: { type: Number },
  Anyo: { type: Date }
});

module.exports = mongoose.model("Vehículo", VehicleSchema);
