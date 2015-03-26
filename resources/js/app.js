'use strict'; 

var Professionals = angular.module('Professionals', ['ngRoute']);//, 'ngSanitize'
Professionals.config(function ($routeProvider, $httpProvider) { //, $provide

    $routeProvider.when('/busqueda-profesionales', {
        templateUrl: 'resources/tpl/busquedaProfesionales.html',
        controller: 'ProfesionalsSearchController'
    });
    
    $routeProvider.otherwise({
        templateUrl: 'resources/tpl/lists.html',
        controller: 'HomeController'
    });



});

Professionals.run(function ($rootScope, $http, $location, $timeout, $filter) {
    
});