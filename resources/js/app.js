'use strict';

var Professionals = angular.module('Professionals', ['ngRoute', 'angularFileUpload', 'ui.bootstrap', 'noCAPTCHA']);//, 'ngSanitize'

Professionals.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

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
//        controller: 'ContactoController'
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
    set : function (newUrl) {
      url = newUrl;
    },
    get : function () {
      return url;
    }
  }
})

Professionals.run(['$rootScope', '$http', '$location', '$timeout', '$filter', 'Helper',
    function ($rootScope, $http, $location, $timeout, $filter, Helper) {
        $('.alertsTop').removeClass('hideAll');

        /*Obtain username*/
        Helper.getUser();
//        /*When change the url, dispach the main loader*/
//        $rootScope.$on('$locationChangeSuccess', function () {
//            $rootScope.$broadcast('event:loader', {container: "#loader", sts: true});
//        });
//
//        /*Once the main content is loaded we should close the main loader*/
//        $rootScope.$on('$viewContentLoaded', function () {
//            $rootScope.$broadcast('event:loader', {container: "#loader", sts: false});
//        });

        /**
         * Dispach main loader
         * @args JSON Object
         * @args[container] the element identifier
         * @args[sts] the final status of the loader
         */
//        $rootScope.$on('event:loader', function (envent, args) {
//            $(args.container).css('display', args.sts ? 'block' : 'none');
//        });

    }]);
