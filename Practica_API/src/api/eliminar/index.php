<?php
include(__DIR__ . "/../../middleware/db.php");

$db = new Db();

if (isset($_REQUEST['id'])) {
    $idestudiante = $_REQUEST['id'];
    $sql = 'DELETE FROM `Estudiantes` WHERE estudiante_id= ' . $idestudiante;
    echo "El estudiante ha sido eliminado";
} else {
    echo "Estudiante no registrado";
}

$result = $db->executeQuery($sql);

while ($data = $result->fetch_object()) {
    $users[] = $data->nombre_est;
}

header("Content-Type: application/json");
echo json_encode($users);

?>
