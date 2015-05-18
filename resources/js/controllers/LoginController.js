'use strict';

Professionals.controller('LoginController', ['$scope', '$routeParams', '$http', '$rootScope','$location', '$modalInstance', 'CommonService',
    function ($scope, $routeParams, $http, $rootScope, $location, $modalInstance, CommonService) {
        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.userLogin = {};

        $scope.loginUser = function (e)
        {
            e.preventDefault();

            var data = {
                'username': $scope.userLogin.username,
                'password': $scope.userLogin.password
            };

            CommonService.postJsonRequest('api/login-user', data).then(function (result) {
                if (result.success) {
                    $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Loggeado con exito'});
                    //TODO: check this
                    $modalInstance.close(0);
                } else
                    $rootScope.$broadcast('alert-event', {type: 'error', msg: result.msg});

            });
        };

    }]);