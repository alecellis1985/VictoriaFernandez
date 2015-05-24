'use strict';

Professionals.controller('FooterController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', function ($scope, $routeParams, $http, $rootScope, $location) {
    
    $scope.template = {
        "footer": "resources/tpl/footer.html"
    };

    $scope.triggerLogin = function(){
        
    }
    
    
    $scope.ingresarClk = function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        $('#profIngresar').trigger('click');
    };
    
    $scope.clicked = false;
}]);