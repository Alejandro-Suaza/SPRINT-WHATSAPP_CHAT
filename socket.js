const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

// Configura Socket.io para escuchar en un puerto diferente
const socketPort = 3000;

io.on('connection', (socket) => {
  console.log('Usuario conectado a Socket.io');

  socket.on('disconnect', () => {
    console.log('Usuario desconectado de Socket.io');
  });
});

httpServer.listen(socketPort, () => {
  console.log(`Servidor Socket.io en ejecución en el puerto ${socketPort}`);
});
