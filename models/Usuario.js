var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "Usuario",
  },
  dni: { type: String, required: true },
  nombre: String,
  apellidos: String,
  direcion: String,
  correo: String,
  telefono: String,
});
module.exports = mongoose.model("Usuario", PostSchema);
