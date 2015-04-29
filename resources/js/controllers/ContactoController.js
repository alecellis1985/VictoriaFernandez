'use strict';

Professionals.controller('ContactoController', ['$scope', '$routeParams', '$http', '$rootScope', '$location','CommonService', function ($scope, $routeParams, $http, $rootScope, $location,CommonService) {

    $scope.enviarMail = function(isValid){
        if (!isValid ) {
                $rootScope.$broadcast('alert-event', {type: 'error', msg: "Existen errores en el formulario!"});
                return;
        } 
        CommonService.postJsonRequest('api/sendMail', $scope.user).then(function (result) {
            if (result.data.success)
                $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Has sido registrado con exito'});
            else
                $rootScope.$broadcast('alert-event', {type: 'error', msg: result.data.msg});
        });
    };
}]);

