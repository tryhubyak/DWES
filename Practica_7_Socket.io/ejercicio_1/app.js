//Bibliotecas
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

//Servidor de Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//Ruta pagina principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Conexion
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    //Conexion de nuevo cliente
    io.emit('mensaje', '¡Un nuevo cliente se ha conectado!');

    //Manejo de eventos de cliente
    socket.on('eventoPersonalizado', (data) => {
        console.log('Evento personalizado recibido:', data);
    });

    //Desconexion del cliente
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

//Puerto del servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
