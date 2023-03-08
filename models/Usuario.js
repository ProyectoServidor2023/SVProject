var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UsuarioSchema = new Schema({
  dni: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: { type: String },
  nombre: { type: String },
  apellidos: { type: String },
  direcion: { type: String },
  correo: { type: String },
  telefono: { type: Number },
});

var bcrypt = require("../node_modules/bcrypt");
var SALT_WORK_FACTOR = 10;

UsuarioSchema.pre("save", function (next) {
  var usuario = this;
  // solo aplica una función hash al password si ha sido modificado (o es nuevo)
  if (!usuario.isModified("password ")) return next();
  // genera la salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // aplica una función hash al password usando la nueva salt
    bcrypt.hash(usuario.password, salt, function (err, hash) {
      if (err) return next(err);
      // sobrescribe el password escrito con el “hasheado”
      usuario.password = hash;
      next();
    });
  });
});

UsuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
