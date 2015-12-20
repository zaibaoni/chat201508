angular.module('zfpxchat').
controller('NavCtrl',function($rootScope,$scope,$http,socket,$location){
    $scope.isActive = function(curr){
        return $location.path() == curr;
    }
    $scope.logout = function(){
        $http({
            url:'/users/logout',
            method:'GET'
        }).success(function(data){
            if(data['code'] == 1){
                $rootScope.user = null;
                $location.path('/login');
            }else{
                alert(data['msg']);
            }
        }).error(function(data){
            alert(data['msg']);
        });
    }

});