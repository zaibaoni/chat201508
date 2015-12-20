angular.module('zfpxchat').
controller('RegCtrl',function($rootScope,$scope,$http,socket,$location){
    $scope.user = {};
    $scope.reg = function(){
        $http({
            url:'/users/reg',
            method:'POST',
            data:$scope.user
        }).success(function(data){
            if(data['code'] == 1){
                $rootScope.user = data['user'];
                $location.path('/room');
            }else{
                alert(data['msg']);
            }
        }).error(function(data){
            alert(data['msg']);
        });
    }

});