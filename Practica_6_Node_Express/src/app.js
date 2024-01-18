var express = require("express");
var app = express();
app.get("/", function (req, res) {
res.send("Hola Mundo!");
});
app.listen(5306, function () {
console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});

const express = require("express");
const app = express();

//const express = require("express");
//const mysql = require("mysql");
//const bodyParser = require("body-parser");
//
//const app = express();
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//
//db.connect((err) => {
//  if (err) {
//    console.error("Error al conectar a la base de datos: ", err);
//  } else {
//    console.log("Conexión exitosa a la base de datos");
//  }
//});
//
//app.get("/estudiantes", (req, res) => {
//  db.query("SELECT * FROM estudiante", (err, result) => {
//    if (err) {
//      res.status(500).send("Error al obtener estudiantes");
//    } else {
//      res.json(result);
//    }
//  });
//});
