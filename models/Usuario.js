var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UsuarioSchema = new Schema({
  dni: { type: String, required: true, index:{
    unique:true
  }
},
  nombre: {type: String},
  apellidos: {type: String},
  direcion: {type: String},
  correo: {type: String},
  telefono: {type: Number}
});
module.exports = mongoose.model("Usuario", UsuarioSchema);
