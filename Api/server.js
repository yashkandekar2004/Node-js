const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for private messages
  socket.on('private message', (msg) => {
    const recipientSocketId = msg.recipientSocketId;
    const senderSocketId = socket.id;

    // Send the message only to the recipient
    io.to(recipientSocketId).emit('private message', msg);
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
