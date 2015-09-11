'use strict';

Professionals.controller('UsersController', ['$scope', '$routeParams', '$http', '$rootScope', '$timeout', '$location', 'CommonService','Helper', function ($scope, $routeParams, $http, $rootScope, $timeout, $location, CommonService,Helper) {

        $scope.users = [];
        $scope.loader = true;
        $scope.showUnauthorized = false;
        $scope.currentUserIsAdmin = false;

        $scope.getAllUsers = function () {
            $timeout(function () {
                CommonService.getRequest('api/users').then(function (data) {
                    data.data.map(function(elem){
                        if(elem.direccion !== null || elem.direccion !== undefined){
                            elem.direccion = $.parseJSON(elem.direccion);
                        }
                    });
                    $scope.users = data.data;
                    $scope.loader = false;
                });
            }, 1000);
        };

        $scope.init = function () {
            Helper.getUser().then(function(user){
                if (user.IsAdmin){
                    $scope.currentUserIsAdmin = true;
                    $scope.getAllUsers();
                }else{
                    $scope.showUnauthorized = true;
                }
            })
        };

        $scope.changeUserState = function (user) {
            CommonService.postJsonRequest('api/update_userState', {'username': user.username}).then(function (result) {
                if (result.success) {
                    user.IsActive = user.IsActive === 1 ? 0 : 1;
                    $rootScope.$broadcast('alert-event', {type: 'success', msg: result.msg});
                } else
                    $rootScope.$broadcast('alert-event', {type: 'danger', msg: result.msg});
            });
        }

        $scope.init();


    }]);

