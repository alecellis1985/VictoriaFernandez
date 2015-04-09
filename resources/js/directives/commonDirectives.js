Professionals.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
 });
 
 Professionals.directive('stopAllEvents', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
        }
    };
 });

Professionals.directive('dropdownFilter', function(){
    return {
        restrict: 'E',
        templateUrl: 'resources/tpl/dropdownDirective.html',
        scope: {
            selectedElem: '=',
            placeholderFilter:'@',
            nameProp:'@',
            elementsArr:'=',
            selectedElementFn:'='
        },
        replace: true,
        link:function($scope,elem,attr){
            
            $scope.clearModel = function(evt)
            {
                $scope.dropdownFilter = '';
                evt.preventDefault();
                evt.stopPropagation();
            };
            
            $scope.selectedElement = $scope.selectedElementFn || function(e,elem)
            {
                e.preventDefault();
                $scope.selectedElem = elem;
            };
            
        }
    };
});