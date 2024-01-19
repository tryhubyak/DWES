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

// Todos los profesores
app.get("/profesores", (req, res) => {
  db.query("SELECT * FROM profesor", (err, result) => {
    if (err) {
      res.status(500).send("Error al obtener profesores");
    } else {
      res.json(result);
    }
  });
});

//buscar por id
app.get("/profesores/:id", (req, res) => {
  const profesorId = req.params.id;
  db.query("SELECT * FROM profesor WHERE id = ?", [profesorId], (err, result) => {
    if (err) {
      res.status(500).send(`Error al obtener profesor con ID ${profesorId}`);
    } else if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send(`Profesor con ID ${profesorId} no encontrado`);
    }
  });
});

// Crear
app.post("/profesores", (req, res) => {
  const profesor = req.body;
  db.query("INSERT INTO profesor SET ?", profesor, (err, result) => {
    if (err) {
      res.status(500).send("Error al insertar profesor");
    } else {
      res.status(201).send("Profesor insertado exitosamente");
    }
  });
});

// Actualizar
app.put("/profesores/:id", (req, res) => {
  const profesorId = req.params.id;
  const nuevoProfesor = req.body;
  db.query("UPDATE profesor SET ? WHERE id = ?", [nuevoProfesor, profesorId], (err, result) => {
    if (err) {
      res.status(500).send(`Error al actualizar profesor con ID ${profesorId}`);
    } else if (result.affectedRows > 0) {
      res.send(`Profesor con ID ${profesorId} actualizado exitosamente`);
    } else {
      res.status(404).send(`Profesor con ID ${profesorId} no encontrado`);
    }
  });
});

// Eliminar
app.delete("/profesores/:id", (req, res) => {
  const profesorId = req.params.id;
  db.query("DELETE FROM profesor WHERE id = ?", [profesorId], (err, result) => {
    if (err) {
      res.status(500).send(`Error al eliminar profesor con ID ${profesorId}`);
    } else if (result.affectedRows > 0) {
      res.send(`Profesor con ID ${profesorId} eliminado exitosamente`);
    } else {
      res.status(404).send(`Profesor con ID ${profesorId} no encontrado`);
    }
  });
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app; 