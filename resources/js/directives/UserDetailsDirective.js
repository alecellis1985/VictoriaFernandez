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
                { title:'Servicios', content:'resources/tpl/tabServicios.html' },
                { title:'Informacion', content:'resources/tpl/tabInformacion.html'},
                { title:'Promociones', content:'resources/tpl/tabPromociones.html'},
                { title:'Formas de pago', content:'resources/tpl/tabFormadePago.html'},
                { title:'Mapa', content:'resources/tpl/tabMap.html'}
              ];
        }
    };
});

