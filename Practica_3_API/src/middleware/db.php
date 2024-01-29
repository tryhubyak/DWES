<?php

// incluimos el fichero donde tenemos las constantes
// siempre con rutas absolutas usando __DIR__ constante reservada del sistema
include(__DIR__."/../config/config.php");

// definicion de la clase
class Db {
    // definicion de una variable con su tipo en este caso
    // objeto Mysqli clase interna de php
    public Mysqli $conn;

    // inicializamos el constructor para luego crear un objeto Db
    public function __construct() {

        // iniciamos la conexion con los datos
        $this->conn = new mysqli(
            __HOST__, 
            __USER__, 
            __PASSWORD__, 
            __DATABASE__
        );

        // comprobamos si la conexion se ha realizado correctamente
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    // Creamos una funcion que tendra la ejecucion de nuestras 
    // llamadas a BBDD
    public function executeQuery(String $sql) {
        return $this->conn->query($sql);
    }
}
?>