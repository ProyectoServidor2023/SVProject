var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/usuarios");
var VehiculoRouter = require("./routes/vehiculos");
var VentaRouter = require("./routes/ventas");
var app = express();
const dotenv = require("dotenv");
dotenv.config();
const { body, validationResult } = require("express-validator");


var mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));
var db = mongoose.connection;
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/ventas", (req, res) => {
  res.render("ventas");
})

app.post('/registrar_venta', [
  body('vehiculo', 'Ingreese Id de vehiculo válido').exists().isLength({ min: 10, max: 40}),
  body('propietario', 'Ingreese Id de propietario válido').exists().isLength({ min: 10, max: 40}),
  body('comprador', 'Ingreese Id de comprador válido').exists().isLength({ min: 10, max: 40}),
  body('fecha', 'Ingreese Fecha').exists().isLength({ min: 8, max: 8 }),
  body('precio', 'Ingreese Precio').exists().isLength({ min: 1, max: 10 }),
], (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body)
      const valores = req.body  
      const validaciones = errors.array()  
      res.render('ventas', {validaciones:validaciones, valores:valores})  
    } else {
      res.send("Validaciones correctas")
    }
  
})

app.get("/vehiculos", (req, res) => {
  res.render("vehiculos");
})

app.post('/registrar_vehiculo', [
  body('Matricula', 'Ingreese número de matrícula válido').exists().isLength({ min: 7, max: 7}),
  body('Propietario', 'Ingreese Id de propietario válido').exists().isLength({ min: 10, max: 40}),
  body('Tipo', 'Ingreese Tipo').exists().isLength({ min: 0, max: 30 }),
  body('Modelo', 'Ingreese Modelo').exists().isLength({ min: 1, max: 50 }),
  body('Color', 'Ingreese Color').exists().isLength({ min: 1, max: 20 }),
  body('Descripcion', 'Ingreese descripcion').exists().isLength({ min: 0, max: 100 }),
  body('Precio', 'Ingreese precio').exists().isLength({ min: 1, max: 5 }),
  body('Año', 'Ingreese año').exists().isLength({ min: 4, max: 4 }),
], (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body)
      const valores = req.body  
      const validaciones = errors.array()  
      res.render('vehiculo', {validaciones:validaciones, valores:valores})  
    } else {
      res.send("Validaciones correctas")
    }
  
})


app.use("/", indexRouter);
app.use("/usuarios", usersRouter);
app.use("/vehiculos", VehiculoRouter);
app.use("/ventas", VentaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// variables de entorno
require("dotenv").config();
