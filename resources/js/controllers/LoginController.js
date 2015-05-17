'use strict';

Professionals.controller('LoginController', ['$scope', '$routeParams', '$http', '$rootScope', '$location','$modalInstance','CommonService', function ($scope, $routeParams, $http, $rootScope, $location,$modalInstance,CommonService) {
//    $scope.ok = function () {
//        $modalInstance.close($scope.selected.item);
//        //login
//        CommonService.postRequest('api/login', data).then(function (result) {
//            if (result.data.success)
//                $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Has sido registrado con exito'});
//            else
//                $rootScope.$broadcast('alert-event', {type: 'error', msg: result.data.msg});
//        });
//    };
    
    $scope.login = function (isValid)
    {
//        if (!isValid || !validForm()) {
//            $rootScope.$broadcast('alert-event', {type: 'error', msg: "Existen errores en el formulario!"});
//            return;
//        }
//        $modalInstance.close($scope.selected.item);
        //login
        CommonService.postJsonRequest('api/login', $scope.userlogin).then(function (result) {
            if (result.data.success)
                $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Has sido registrado con exito'});
            else
                $rootScope.$broadcast('alert-event', {type: 'error', msg: result.data.msg});
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

}]);