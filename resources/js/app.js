'use strict';

var Professionals = angular.module('Professionals', ['ngRoute', 'angularFileUpload', 'ui.bootstrap','noCAPTCHA']);//, 'ngSanitize'
Professionals.config(['$routeProvider','$httpProvider',function ($routeProvider, $httpProvider) {
    

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
            planes:function(CommonService){
                return CommonService.getRequest('api/userPlans');
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

Professionals.run(function ($rootScope, $http, $location, $timeout, $filter) {
  
});
