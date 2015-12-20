angular.module('zfpxchat').
controller('RoomCtrl',function($rootScope,$scope,socket){
    $scope.room = {messages:[],users:[]};
    $scope.createMessage = function(){
        if($scope.newMessage){
            socket.emit('createMessage',{
                content:$scope.newMessage,
                creator:$rootScope.user,
                creatAt:new Date()
            });
            $scope.newMessage = '';
        }
    }
    socket.on('message.add',function(message){
        $scope.room.messages.push(message);
    })
    //向服务器请求所有的消息
    socket.emit('room')
    socket.on('room',function(room){
        $scope.room= room;
    })

    $scope.$on('$destroy',function(){
        socket.clear();
    });
});