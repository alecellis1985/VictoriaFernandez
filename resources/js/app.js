'use strict';

var Professionals = angular.module('Professionals', ['ngRoute', 'angularFileUpload', 'ui.bootstrap']);//, 'ngSanitize'
Professionals.config(function ($routeProvider, $httpProvider) { //, $provide

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
            }
        }
    });
    $routeProvider.when('/contacto', {
        templateUrl: 'resources/tpl/contacto.html',
        controller: 'ContactoController'
    });

//    $routeProvider.otherwise({
//        templateUrl: 'resources/tpl/lists.html',
//        controller: 'HomeController'
//    });

});

Professionals.run(function ($rootScope, $http, $location, $timeout, $filter) {
    //TODO: DELETE THIS
    $timeout(function () {
        $('div[align="center"]').remove();
        $('body').children().last().remove();
    }, 1500);
});

//Professionals.directive('hello', function(){
//    return {
//        restrict: 'E',
//        templateUrl: 'resources/tpl/header.html',
//        
//    };
//});