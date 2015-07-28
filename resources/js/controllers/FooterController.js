'use strict';

Professionals.controller('FooterController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', function ($scope, $routeParams, $http, $rootScope, $location) {
    
    $scope.template = {
        "footer": "resources/tpl/footer.html"
    };

    
    $scope.ingresarClk = function(evt){
        debugger;
        evt.preventDefault();
        evt.stopPropagation();
        $('#profIngresar').trigger('click');
    };
    
    $scope.salirClk = function(evt){
        
        evt.preventDefault();
        evt.stopPropagation();
        $('#profSalir').trigger('click');
    };
    
    $scope.clicked = false;
}]);