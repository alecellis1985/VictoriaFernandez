'use strict';

var Professionals = angular.module('Professionals', ['ngRoute', 'angularFileUpload', 'ui.bootstrap','angularjs-dropdown-multiselect','ng-fi-text']);

Professionals.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/registro-usuario', {
            templateUrl: 'resources/tpl/registroUsuario.html',
            controller: 'RegisterUserController',
            resolve: {
                departamentosList: function (CommonService) {
                    return CommonService.getRequest('api/departamentos');
                },
                categoriasList: function (CommonService) {
                    return CommonService.getRequest('api/categorias');
                },
                barriosList: function (CommonService) {
                    return CommonService.getRequest('api/barrios');
                },
                planes: function (CommonService) {
                    return CommonService.getRequest('api/userPlans');
                },
                userData: function () {
                    return {};
                },
                newUser: function () {
                    return true;
                }
            }
        });

        $routeProvider.when('/editar-usuario', {
            templateUrl: 'resources/tpl/registroUsuario.html',
            controller: 'RegisterUserController',
            resolve: {
                departamentosList: function (CommonService) {
                    return CommonService.getRequest('api/departamentos');
                },
                categoriasList: function (CommonService) {
                    return CommonService.getRequest('api/categorias');
                },
                barriosList: function (CommonService) {
                    return CommonService.getRequest('api/barrios');
                },
                planes: function (CommonService) {
                    return CommonService.getRequest('api/userPlans');
                },
                userData: function (CommonService) {
                    return CommonService.getRequest('api/getCurrentUser');
                },
                newUser: function () {
                    return false;
                }

            }
        });

        $routeProvider.when('/ver-usuario', {
            templateUrl: 'resources/tpl/verUsuario.html',
            controller: 'VerUserController',
            resolve: {
                departamentosList: function (CommonService) {
                    return CommonService.getRequest('api/departamentos');
                },
                categoriasList: function (CommonService) {
                    return CommonService.getRequest('api/categorias');
                },
                barriosList: function (CommonService) {
                    return CommonService.getRequest('api/barrios');
                },
                planes: function (CommonService) {
                    return CommonService.getRequest('api/userPlans');
                },
                userData: function (CommonService) {
                    return CommonService.getRequest('api/getCurrentUser');
                }
            }
        });

        $routeProvider.when('/contacto', {
            templateUrl: 'resources/tpl/contacto.html',
            controller: 'ContactoController'
        });

        $routeProvider.when('/quienessomos', {
            templateUrl: 'resources/tpl/quienessomos.html'
        });

        $routeProvider.when('/administrar-users', {
            templateUrl: 'resources/tpl/users.html',
            controller: 'UsersController'
        });

        $routeProvider.otherwise({
            templateUrl: 'resources/tpl/busquedaProfesionales.html',
            controller: 'ProfessionalsSearchController',
            resolve: {
                departamentosList: function (CommonService) {
                    return CommonService.getRequest('api/departamentos');
                },
                categoriasList: function (CommonService) {
                    return CommonService.getRequest('api/categorias');
                },
                barriosList: function (CommonService) {
                    return CommonService.getRequest('api/barrios');
                }
            }
        });
    }]);

Professionals.factory('imageUrl', function () {

    var url = '';

    return {
        set: function (newUrl) {
            url = newUrl;
        },
        get: function () {
            return url;
        }
    };
});

Professionals.run(['Helper',
    function (Helper) {
        $('.alertsTop').removeClass('hideAll');
        Helper.getUser();
    }]);

function goToTop() {
    $('html,body').scrollTop(0);
}

