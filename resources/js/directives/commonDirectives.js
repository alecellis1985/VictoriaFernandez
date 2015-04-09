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
            elementsArr:'='
        },
        replace: true,
        link:function($scope,elem,attr){
            
            $scope.clearModel = function(evt)
            {
                $scope.dropdownFilter = '';
                evt.preventDefault();
                evt.stopPropagation();
            };
            
            $scope.selectedElement = function(e,elem)
            {
                e.preventDefault();
                $scope.selectedElem = elem;
            };
            
        }
    };
});


//$scope.categorias.unshift({categoriaNombre:"Seleccione Categoria",categoriaId:-1});
//    $scope.selectedCategoria = $scope.categorias[0];
//    $scope.selectCategoria = function(e,categoria)
//    {
//        e.preventDefault();
//        $scope.selectedCategoria = categoria;
//    };
//    
//    $scope.categoriasFilterClk = function(e)
//    {
//        e.preventDefault();
//        e.stopPropagation();
//    };
//    
//    $scope.clearModel = function(evt,model)
//    {
//        $scope[model] = '';
//        evt.preventDefault();
//        evt.stopPropagation();
//    };