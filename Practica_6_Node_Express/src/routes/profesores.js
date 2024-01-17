const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getCarta = (request, response) => {
    connection.query("SELECT * FROM profesores",
    (error, results) => {
    if(error)
    throw error;
    response.status(200).json(results);
    });
};
    
//ruta
app.route("/profesores")
.get(getCarta);

module.exports = app;