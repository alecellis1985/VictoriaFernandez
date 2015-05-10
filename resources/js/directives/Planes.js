Professionals.directive('planesDetails', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/tpl/planes.html',
        scope: {
            selectedCard: '=',
            elemColapsed:'=',
            selectedPlan:'&'
        },
        replace: true,
        link:function($scope,element,attr){
            
        }
    };
});
