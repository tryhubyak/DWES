<?php

// importamos el fichero donde tenemos la clase Db
// siempre con rutas absolutas usando __DIR__ constante reservada del sistema
include(__DIR__."/../../middleware/db.php");

// Creamos el objeto Db
$db = new Db();

// ejecucion del codigo SQL para extraer los datos
if (isset($_REQUEST['id'])){
     $idEstudiante = $_REQUEST['id'];
     $sql = 'SELECT * FROM Estudiantes WHERE estudiante_id=' . $idEstudiante;
}else{
    $sql = 'SELECT * FROM Estudiantes';
}

$result = $db->executeQuery($sql);

// tratamiento de los datos
while ($data = $result->fetch_object()) {
    $users[] = $data->nombre_est . " " . $data->apellido_est;
}

header("Content-Type: application/json");
echo json_encode($users);
?>