var express = require('express');
var path = require('path');
var user = require('./controller/user');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
var signedCookieParser =require('cookie-parser')('zfpxchat');
app.use(express.static(path.join(__dirname,'app')));
app.use(require('body-parser').json());
var sessionStorage = new MongoStore({
    url:'mongodb://123.57.143.189/zfpxchat'
});
app.use(session({
    resave:true,//每次请求的时候都会重新保存
    saveUninitialized:true,//保存未操作过的 session值
    secret:'zfpxchat',
    store:sessionStorage
}));
app.post('/users/reg',user.reg);
app.post('/users/login',user.login);
app.get('/users/logout',user.logout);
app.get('/users/validate',user.validate);
var server = app.listen(8080);
var io = require('socket.io').listen(server);
var messages = [];
var users = [];
io.set('authorization',function(request,next){
    signedCookieParser(request,{},function(err){
        //console.log(request.signedCookies['connect.sid']);
        sessionStorage.get(request.signedCookies['connect.sid'],function(err,session){
            if(err){
                next(err.message,false);
            }else{
                if(session && session.user){
                    request.session = session;
                    next(null,true);
                }else{
                    next("用户未登陆",false);//拒绝继续连接socket.io
                }
            }
        });
    });
});
var SYSTEM = {
    username:'系统'
}
io.on('connection',function(socket){
    var username = socket.request.session.user.username;
    users.push({username:username});
    io.sockets.emit('message.add',{
        content:username+'进入了聊天室',
        creator:SYSTEM,
        creatAt:new Date()
    });

    socket.on('createMessage',function(message){
        messages.push(message);
        io.sockets.emit('message.add',message);
    });
    socket.on('room',function(){
      socket.emit('room',{messages:messages,users:users});
    });
    socket.on('disconnect',function(){
        users.splice(users.indexOf(username),1);
        io.sockets.emit('message.add',{
            content:username+'进入了聊天室',
            creator:SYSTEM,
            creatAt:new Date()
        });
    });
});