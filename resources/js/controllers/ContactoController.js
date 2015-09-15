'use strict';

Professionals.controller('ContactoController', ['$scope', '$routeParams', '$http', '$rootScope', '$location','CommonService', function ($scope, $routeParams, $http, $rootScope, $location,CommonService) {
    goToTop();
    $scope.gRecaptchaResponse = '';

    $scope.$watch('gRecaptchaResponse', function (){
      $scope.expired = false;
    });

    $scope.expiredCallback = function expiredCallback(){
      $scope.expired = true;
    };
          
    $scope.enviarMail = function(isValid){
        if (!isValid ) {
                $rootScope.$broadcast('alert-event', {type: 'danger', msg: "Existen errores en el formulario!"});
                return;
        } 
        CommonService.postJsonRequest('api/sendMail', $scope.user).then(function (result) {
            if (result.data.success)
                $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Has sido registrado con éxito'});
            else
                $rootScope.$broadcast('alert-event', {type: 'danger', msg: result.data.msg});
        });
    };
}]);

