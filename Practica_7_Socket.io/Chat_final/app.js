import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("chat message", (data) => {
    console.log(data);
    io.to(data.room).emit("chat message", {
      username: data.username,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
    for (const room in connectedUsers) {
      const userIndex = connectedUsers[room].findIndex(
        (user) => user.id === socket.id
      );
      if (userIndex !== -1) {
        const username = connectedUsers[room][userIndex].username;
        connectedUsers[room].splice(userIndex, 1);
        updateConnectedUsers(room);
        console.log(`Usuario ${username} abandonó la sala: ${room}`);
        io.to(room).emit("user left", { username, room });
      }
    }
  });

  socket.on("join room", (data) => {
    const { room, username } = data;
    socket.join(room);
    console.log(`Usuario ${username} se unió a la sala: ${room}`);

    if (!connectedUsers[room]) {
      connectedUsers[room] = [];
    }

    connectedUsers[room].push({ id: socket.id, username });
    updateConnectedUsers(room);
    io.to(room).emit("user joined", { username, room });
  });

  socket.on("leave room", (data) => {
    const { room } = data;
    socket.leave(room);
    console.log(`Usuario con ID ${socket.id} abandonó la sala: ${room}`);
  });

  socket.on("private message", (data) => {
    const { recipient, message } = data;
    const recipientUser =
      connectedUsers[data.room] &&
      connectedUsers[data.room].find((user) => user.username === recipient);

    if (recipientUser && message) {
      io.to(recipientUser.id).emit("private message", {
        username: data.username,
        message: data.message,
        recipient: data.recipient,
      });

      socket.emit("private message", {
        username: data.username,
        message: data.message,
        recipient: data.recipient,
      });
    }
  });
});

function updateConnectedUsers(room) {
  if (connectedUsers[room]) {
    const uniqueUsernames = [
      ...new Set(connectedUsers[room].map((user) => user.username)),
    ];
    io.in(room).emit("connected users", uniqueUsernames);
  }
}

const PORT = 3000;
server.listen(PORT, () =>
  console.log(`Servidor escuchando en el puerto ${PORT}`)
);
