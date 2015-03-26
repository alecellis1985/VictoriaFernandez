'use strict'; 

var Professionals = angular.module('Professionals', ['ngRoute']);//, 'ngSanitize'
Professionals.config(function ($routeProvider, $httpProvider) { //, $provide

    $routeProvider.when('/busqueda-profesionales', {
        templateUrl: 'resources/tpl/busquedaProfesionales.html',
        controller: 'ProfessionalsSearchController',
        resolve: {
            departamentosList: function (CommonService) {
                return CommonService.getRequest('api/departamentos');
            },
            categoriasList: function (CommonService) {
                return CommonService.getRequest('api/categorias');
            }
        }
    });
    
    $routeProvider.otherwise({
        templateUrl: 'resources/tpl/lists.html',
        controller: 'HomeController'
    });

});

Professionals.run(function ($rootScope, $http, $location, $timeout, $filter) {
    
});