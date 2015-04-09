Professionals.directive('userDetails', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/tpl/userDetails.html',
        scope: {
            selectedUser: '=',
            elemColapsed:'='
        },
        replace: true
    };
});

