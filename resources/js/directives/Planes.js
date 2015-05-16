Professionals.directive('planesDetails', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/tpl/planes.html',
        scope: {
            selectedPlan: '=',
            elemColapsed:'=',
            selectedPlanFn:'&',
            availablePlans:'='
        },
        replace: true,
        link:function($scope,element,attr){
            $scope.clearSelectedPlan = function(){
                $scope.elemColapsed = true;
                $scope.selectedPlan = {};
            }
        }
    };
});
