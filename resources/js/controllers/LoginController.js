'use strict';

Professionals.controller('LoginController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', '$modalInstance', 'CommonService', 'HeaderOptions',
    function LoginController($scope, $routeParams, $http, $rootScope, $location, $modalInstance, CommonService, HeaderOptions) {
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
                    $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Bienvenido ' + result.data.username + '!'});
                    //TODO: check this
//                    $("#profRegistarse").addClass('hide');
//                    $('#profIngresar').addClass('hide');
//                    $('#profSalir').removeClass('hide');
//                    $('.privateComponent').show();
                    HeaderOptions.sinSesion = false;
                    HeaderOptions.enSesion = true;
                    HeaderOptions.esAdmin = false;
//TODO: Descomentar despues de agregar isAdmin
//                    if (result.data.isAdmin) {
//                        $('.privateAdminComponent').show();
//                    } else {
//                        $('.privateAdminComponent').hide();
//                    }
                    $modalInstance.close(0);
                } else
                    $rootScope.$broadcast('alert-event', {type: 'error', msg: result.msg});

            });
        };

    }]);