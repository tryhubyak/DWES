<?php
include(__DIR__."/../../middleware/db.php");

$db = new Db();

if (isset($_REQUEST['id'])){
     $idAlumno = $_REQUEST['id'];
     $sql = '' . $idAlumno;
}else{
    "Ingrese su id para ver el libro de calificaciones";
}

$result = $db->executeQuery($sql);

while ($data = $result->fetch_object()) {
    $users[] = $data->calificacion . " " . $data->asignatura_id;
}

header("Content-Type: application/json");
echo json_encode($users);

?>