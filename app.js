const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

var socket = io();
var el = document.getElementById('server-time');

socket.on('time', function(timeString) {
  el.innerHTML = 'Server time: ' + timeString;
});
  
io.sockets.on('connection', function(socket){
  socket.on('emit_from_client', function(data){
    socket.client_name = data.name;
    socket.client_room = data.room;
    if (socket.client_room) {
      console.log('nononono');
    }
    //io.sockets.emit('emit_from_server', data.select);
    io.sockets.emit('emit_from_server', data);
    //socket.join(data.room);
    //socket.emit('emit_from_server', 'you are in' + data.room);
    //socket.broadcast.to(data.room).emit('emit_from_server', data.select);
  });
});
