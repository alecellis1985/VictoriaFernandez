'use strict';

Professionals.controller('UsersController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout','$location','CommonService', function ($scope, $routeParams, $http, $rootScope, $timeout ,$location,CommonService) {

    $scope.users = [];
    $scope.loader = true;
    $scope.getAllUsers = function(){
        $timeout(function(){
            CommonService.getRequest('api/users').then(function(data){
                $scope.users = data.data;
                $scope.loader = false;
            });
        },1000);
    };
    
    $scope.init = function(){
        $scope.getAllUsers();
    };
    
    $scope.changeUserState = function(user){
        CommonService.postJsonRequest('api/update_userState',{'username':user.username}).then(function(result){
            if (result.success) {
                user.IsActive = user.IsActive === "1"?"0":"1";
                $rootScope.$broadcast('alert-event', {type: 'success', msg: result.msg});
                } else
                    $rootScope.$broadcast('alert-event', {type: 'danger', msg: result.msg});
        });
    }
    
    $scope.init();
    

}]);

