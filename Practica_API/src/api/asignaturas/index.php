<?php
include(__DIR__ . "/../../middleware/db.php");

$db = new Db();

if (isset($_REQUEST['id'])) {
    $idAsignatura = $_REQUEST['id'];
    $sql = 'SELECT * FROM Asignatura WHERE asignatura_id=' . $idAsignatura;
} else {
    $sql = 'SELECT * FROM Asignatura';
}

$result = $db->executeQuery($sql);

while ($data = $result->fetch_object()) {
    $users[] = $data->nombre_asig;
}

header("Content-Type: application/json");
echo json_encode($users);

?>