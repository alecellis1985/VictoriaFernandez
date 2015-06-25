'use strict';

Professionals.controller('EditPwdController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', '$modalInstance', 'CommonService',
    function EditPwdController($scope, $routeParams, $http, $rootScope, $location, $modalInstance, CommonService) {
        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.userPwd = {};

        $scope.cambiarPwd = function (e)
        {
            e.preventDefault();
            var data = {
                'oldPwd': $scope.userLogin.oldPwd,
                'newPwd': $scope.userLogin.newPwd
            };
//            CommonService.postJsonRequest('api/login-user', data).then(function (result) {
//                if (result.success) {
//                    $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Bienvenido ' + result.data.username + ' !'});
//                    $rootScope.user = result.data;
//                    $modalInstance.close(0);
//                    $location.path('/ver-usuario');
//                } else
//                    $rootScope.$broadcast('alert-event', {type: 'error', msg: result.msg});
//            });
        };

    }]);