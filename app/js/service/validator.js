angular.module('zfpxchat').factory('validator',function($http){
    return $http({
        url:'/users/validate',
        method:'GET'
    })
});