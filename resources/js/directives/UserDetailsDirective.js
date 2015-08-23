Professionals.directive('userDetails', ['$timeout',function($timeout){
    return {
        restrict: 'E',
        templateUrl: 'resources/tpl/userDetails.html',
        scope: {
            selectedUser: '=',
            elemColapsed:'='
        },
        replace: true,
        link:function($scope,element,attr){
            $scope.userMarkers = [];
            $scope.renderMap = false;
            
            $scope.tabs = [
                { title:'Servicios', content:'resources/tpl/tabServicios.html',active:true },
                { title:'Información', content:'resources/tpl/tabInformacion.html',active:false},
                { title:'Formas de pago', content:'resources/tpl/tabFormadePago.html',active:false},
                { title:'Mapa', content:'resources/tpl/tabMap.html',active:false}
              ];
              
            $scope.tabSelected = function(tab){
                if($scope.selectedUser.markers.length < 1)
                    return;
                
                if(tab.title === 'Mapa'){
                    $scope.userMarkers = $scope.selectedUser.markers;
                    $scope.renderMap = true;
                }
            }
            
            $scope.$watch('elemColapsed',function(newval){
                if(newval === false){
                    $scope.tabs.map(function(elem){elem.active = false;});
                    $scope.tabs[0].active = true;
                    $scope.renderMap = false;
                }
            });
            
             $scope.$watch('selectedUser',function(newVal,oldVal){
                 if(newVal !== oldVal && newVal !== null &&  newVal !== undefined && $scope.elemColapsed === false){
                    $scope.tabs.map(function(elem){elem.active = false;});
                    $scope.tabs[0].active = true;
                    $scope.renderMap = false;
                }
             });
        }
    };
}]);

