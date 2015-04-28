'use strict';

Professionals.controller('ContactoController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', function ($scope, $routeParams, $http, $rootScope, $location) {

    $scope.enviarMail = function(){
      var data = $scope.user;  
      //TODO POST DATA TO SERVER
      //FIX HEIIGHT OF THINGS
    };
}]);

