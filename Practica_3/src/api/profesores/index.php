<?php

// importamos el fichero donde tenemos la clase Db
// siempre con rutas absolutas usando __DIR__ constante reservada del sistema
include(__DIR__."/../../middleware/db.php");

// Creamos el objeto Db
$db = new Db();

// ejecucion del codigo SQL para extraer los datos
if (isset($_REQUEST['id'])){
    $idProfesor = $_REQUEST['id'];
    $sql = 'SELECT * FROM Profesores WHERE profesor_id=' . $idProfesor;
}else{
   $sql = 'SELECT * FROM Profesores';
}

$result = $db->executeQuery($sql);

// tratamiento de los datos
while ($data = $result->fetch_object()) {
    $users[] = $data->nombre_prof . " " . $data->apellido_prof;
}

header("Content-Type: application/json");
echo json_encode($users);
?>