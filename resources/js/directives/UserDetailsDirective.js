Professionals.directive('userDetails', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/tpl/userDetails.html',
        scope: {
            selectedUser: '=',
            elemColapsed:'='
        },
        replace: true,
        link:function($scope,elem,attr)
        {
            $scope.closeDialog = function()
            {
                $scope.elemColapsed = true;
            };
            
        }
    };
});

