angular.module('zfpxchat',['ngRoute']);
angular.module('zfpxchat').config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:'pages/home.html'
    }).when('/room',{
        templateUrl:'pages/room.html',
        controller:'RoomCtrl'
    }).when('/reg',{
        templateUrl:'pages/reg.html',
        controller:'RegCtrl'
    }).when('/login',{
        templateUrl:'pages/login.html',
        controller:'LoginCtrl'
    }).otherwise({
        redirectTo:'/'
    });
});

angular.module('zfpxchat').run(function($location,$rootScope,validator){
 validator.success(function(data){
     if(data['code'] == 1){
         $rootScope.user = data['user'];
         $location.path('/room');
     }else{
         $location.path('/login');
     }
 }).error(function(data){
     $location.path('/login');
 })

});