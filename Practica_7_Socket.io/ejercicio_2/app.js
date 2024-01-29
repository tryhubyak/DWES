const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  io.emit("mensaje", "¡Un nuevo cliente se ha conectado!");

  socket.on("mensajeCliente", (mensaje) => {
    console.log(`Mensaje del cliente: ${mensaje}`);
    io.emit("mensajeServidor", `Cliente: ${mensaje}`);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
