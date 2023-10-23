<?php

// importamos el fichero donde tenemos la clase Db
// siempre con rutas absolutas usando __DIR__ constante reservada del sistema
include(__DIR__."/../../middleware/db.php");

// Creamos el objeto Db
$db = new Db();


// ejecucion del codigo SQL para extraer los datos
$sql = 'SELECT * FROM profesores';
$result = $db->executeQuery($sql);

// tratamiento de los datos
while ($data = $result->fetch_object()) {
    $users[] = $data;
}

// pintado de los datos
foreach ($users as $user) {
    echo "<br>";
    echo $user->nombre . " " . $user->apellido;
    echo "<br>";
}

?>