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
    
    $scope.init();
    

}]);

