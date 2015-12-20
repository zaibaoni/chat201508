angular.module('zfpxchat').factory('socket',function($rootScope){
   var socket = io.connect('http://'+window.location.host);
    return {
        //注册监听
        on:function(eventName,callback){
            console.log(socket);
            socket.on(eventName,function(){
                var args = arguments;
                //回调之后刷新视图
                $rootScope.$apply(function(){
                    callback.apply(socket,args);
                });
            });
        },
        //发射事件
        emit:function(eventName,data){
            socket.emit(eventName,data);
        },
        clear:function(){
            socket.removeAllListeners();
        }
    }
});