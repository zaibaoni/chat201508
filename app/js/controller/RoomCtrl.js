angular.module('zfpxchat').
controller('RoomCtrl',function($scope,socket){
    $scope.messages = [];
    $scope.createMessage = function(){
        if($scope.newMessage){
            socket.emit('createMessage',$scope.newMessage);
            $scope.newMessage = '';
        }
    }
    socket.on('message.add',function(message){
        $scope.messages.push(message);
    })
    //向服务器请求所有的消息
    socket.emit('allMessages')
    socket.on('allMessages',function(messages){
        $scope.messages= messages;
    })

    $scope.$on('$destroy',function(){
        socket.clear();
    });
});