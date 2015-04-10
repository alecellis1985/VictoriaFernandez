Professionals.directive('userDetails', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/tpl/userDetails.html',
        scope: {
            selectedUser: '=',
            elemColapsed:'='
        },
        replace: true,
        link:function($scope,element,attr){
            
            $scope.tabs = [
                { title:'Servicios', content:'Dynamic content 1' },
                { title:'Informacion', content:'Dynamic content 2', disabled: true },
                { title:'Promociones', content:'Dynamic content 2', disabled: true },
                { title:'Formas de pago', content:'Dynamic content 2', disabled: true },
                { title:'Mapa', content:'Dynamic content 2', disabled: true }
              ];
        }
    };
});

