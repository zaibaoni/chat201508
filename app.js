var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname,'app')));
var server = app.listen(8080);
var io = require('socket.io').listen(server);
var messages = [];
io.on('connection',function(socket){
    socket.emit('connected');
    socket.on('createMessage',function(message){
        messages.push(message);
        io.sockets.emit('message.add',message);
    });
    socket.on('allMessages',function(){
      socket.emit('allMessages',messages);
    });
});