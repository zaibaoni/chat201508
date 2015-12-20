var express = require('express');
var path = require('path');
var user = require('./controller/user');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
app.use(express.static(path.join(__dirname,'app')));
app.use(require('body-parser').json());
app.use(session({
    resave:true,//每次请求的时候都会重新保存
    saveUninitialized:true,//保存未操作过的 session值
    secret:'zfpxchat',
    store:new MongoStore({
        url:'mongodb://123.57.143.189/zfpxchat'
    })
}));
app.post('/users/reg',user.reg);
app.post('/users/login',user.login);
app.get('/users/logout',user.logout);
app.get('/users/validate',user.validate);
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