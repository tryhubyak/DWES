<?php
include(__DIR__."/../../middleware/db.php");

$db = new Db();

if (isset($_REQUEST['id'])){
     $idInscripcion = $_REQUEST['id'];
     $sql = 'SELECT * FROM Inscripciones WHERE estudiante_id=' . $idInscripcion;
}else{
    echo 'Ingrese un id';
}

$result = $db->executeQuery($sql);

while ($data = $result->fetch_object()) {
    $users[] = $data->inscripcion_id . " " . $data->fecha_ins;
}

header("Content-Type: application/json");
echo json_encode($users);
?>