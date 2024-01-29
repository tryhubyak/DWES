const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

const usuariosConectados = {};

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("nuevoUsuario", (nombreUsuario) => {
    usuariosConectados[socket.id] = nombreUsuario;
    io.emit("mensajeServidor", `${nombreUsuario} se ha unido al chat`);
    io.emit("usuariosConectados", Object.values(usuariosConectados));
  });

  socket.on("mensajeCliente", (mensaje) => {
    const nombreUsuario = usuariosConectados[socket.id];
    io.emit("mensajeServidor", `${nombreUsuario}: ${mensaje}`);
  });

  socket.on("mensajePrivado", (destinatarioId, mensaje) => {
    const remitenteNombre = usuariosConectados[socket.id];
    const destinatarioSocket = io.sockets.sockets.get(destinatarioId);

    if (destinatarioSocket) {
      destinatarioSocket.emit("mensajePrivado", remitenteNombre, mensaje);
    }
  });

  socket.on("disconnect", () => {
    const nombreUsuario = usuariosConectados[socket.id];
    delete usuariosConectados[socket.id];
    io.emit("mensajeServidor", `${nombreUsuario} ha abandonado el chat`);
    io.emit("usuariosConectados", Object.values(usuariosConectados));
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
