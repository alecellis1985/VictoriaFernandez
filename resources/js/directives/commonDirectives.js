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
 
 Professionals.directive('disableBtn', function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attr) {
            if(attr.disableBtn === 'true')
            {
                element.addClass('notAvailable');
                element.attr('title','No Disponible');
                element.bind('click', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        }
    };
 });
// Professionals.directive('enableHref', function () {
//    return {
//        restrict: 'A',
//        link: function ($scope, element, attr) {
//            $scope.setHref = function(element,href)
//            {
//               if(href === '')
//                {
//                    element.addClass('notAvailable');
//                    element.attr('title','No Disponible');
//                    element.bind('click', function (e) {
//                        e.stopPropagation();
//                        e.preventDefault();
//                    });
//                }
//                else
//                {
//                    $(element).attr('href',href);
//                } 
//            }
//            $scope.href = attr.enableHref;
//            $scope.setHref(element,attr.enableHref);
//            
//            $scope.$watch('$scope.href',function(prev,next){
//                $scope.setHref(element,$scope.href);
//            });
//        }
//    };
// });

Professionals.directive('profACustom', function () {
    return {
        restrict: 'E',
        scope:
        {
            hrefLink:'=',
            icon:'@',
            iconTitle:'@'
        },
        template:'<a href="{{hrefLink}}" target="_blank" title="{{profATitle}}" stop-Event><i class="{{icon}}"></i></a>',
        link: function ($scope, element, attr) {
            $scope.profATitle = 'No Disponible';
            $scope.checkHref = function(element,val)
            {
               if(!val || val === '' )
                {
                    element.addClass('notAvailable');
                    $scope.profATitle = 'No Disponible';
                    element.bind('click', function (e) {
                        e.preventDefault();
                    });
                }
                else
                {
                    element.off('click');
                    $scope.profATitle = $scope.iconTitle;
                    element.removeClass('notAvailable');
                    element.attr('title','No Disponible');
                }
            };
            
            $scope.checkHref(element.find('a'),$scope.hrefLink);
            $scope.$watch('hrefLink', function(newValue, oldValue) {
                $scope.checkHref(element.find('a'), newValue);
            }, true);
        }
    };
 });



Professionals.directive('scrollToTop', function ($document) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                elm.bind("click", function () {

                    function scrollToTop(element, to, duration) {
                        if (duration < 0) return;
                        var difference = to - element.scrollTop;
                        var perTick = difference / duration * 10;

                        setTimeout(function () {
                            element.scrollTop = element.scrollTop + perTick;
                            scrollToTop(element, to, duration - 10);
                        }, 10);
                    }

                    // then just add dependency and call it
                    scrollToTop($document[0].body, 0, 400);
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