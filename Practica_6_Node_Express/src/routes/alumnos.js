const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Todos los alumnos
app.get("/alumnos", (req, res) => {
  db.query("SELECT * FROM estudiante", (err, result) => {
    if (err) {
      res.status(500).send("Error al obtener los alumnos");
    } else {
      res.json(result);
    }
  });
});

// Buscar por id
app.get("/alumnos/:id", (req, res) => {
  const estudianteId = req.params.id;
  db.query("SELECT * FROM estudiante WHERE id = ?", [estudianteId], (err, result) => {
    if (err) {
      res.status(500).send(`Error al obtener estudiante con ID ${estudianteId}`);
    } else if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send(`Estudiante con ID ${estudianteId} no encontrado`);
    }
  });
});

// Crear
app.post("/alumnos", (req, res) => {
  const estudiante = req.body;
  db.query("INSERT INTO estudiante SET ?", estudiante, (err, result) => {
    if (err) {
      res.status(500).send("Error al insertar estudiante");
    } else {
      res.status(201).send("Estudiante insertado exitosamente");
    }
  });
});

// Actualizar
app.put("/alumnos/:id", (req, res) => {
  const estudianteId = req.params.id;
  const nuevoEstudiante = req.body;
  db.query("UPDATE estudiante SET ? WHERE id = ?", [nuevoEstudiante, estudianteId], (err, result) => {
    if (err) {
      res.status(500).send(`Error al actualizar estudiante con ID ${estudianteId}`);
    } else if (result.affectedRows > 0) {
      res.send(`Estudiante con ID ${estudianteId} actualizado exitosamente`);
    } else {
      res.status(404).send(`Estudiante con ID ${estudianteId} no encontrado`);
    }
  });
});

// Eliminar 
app.delete("/alumnos/:id", (req, res) => {
  const estudianteId = req.params.id;
  db.query("DELETE FROM estudiante WHERE id = ?", [estudianteId], (err, result) => {
    if (err) {
      res.status(500).send(`Error al eliminar estudiante con ID ${estudianteId}`);
    } else if (result.affectedRows > 0) {
      res.send(`Estudiante con ID ${estudianteId} eliminado exitosamente`);
    } else {
      res.status(404).send(`Estudiante con ID ${estudianteId} no encontrado`);
    }
  });
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app; 