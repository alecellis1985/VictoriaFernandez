'use strict';

Professionals.controller('LoginController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', '$modalInstance', 'CommonService',
    function LoginController($scope, $routeParams, $http, $rootScope, $location, $modalInstance, CommonService) {
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
                    $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Bienvenido ' + result.data.username + ' !'});
                    result.data.IsAdmin = result.data.IsAdmin === "1" ? true : false; 
                    $rootScope.user = result.data;
                    $modalInstance.close(0);
                    $location.path('/ver-usuario');
                } else
                    $rootScope.$broadcast('alert-event', {type: 'error', msg: result.msg});
            });
        };

    }]);