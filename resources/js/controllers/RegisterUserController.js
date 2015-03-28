'use strict';

Professionals.controller('RegisterUserController', ['$scope', '$routeParams', '$http', '$rootScope', '$location','departamentosList','categoriasList', function ($scope, $routeParams, $http, $rootScope, $location,departamentosList,categoriasList) {
    $scope.categorias = categoriasList.data;
    $scope.categorias.unshift({categoriaNombre:"Seleccione Categoria",id:-1});
    $scope.selectedCategoria = $scope.categorias[0];
    $scope.selectCategoria = function(e,categoria)
    {
        e.preventDefault();
        $scope.selectedCategoria = categoria;
    };
    
    //$scope.departamentosList = [{name:"Seleccione Departamento",id:-1},{name:"Montevideo",id:0},{name:"Artigas",id:1},{name:"Canelones",id:2},{name:"Cerro Largo",id:3},{name:"Colonia",id:4},{name:"Durazno",id:5},{name:"Flores",id:6},{name:"Florida",id:7},{name:"Lavalleja",id:8},{name:"Maldonado",id:9},{name:"Paysandú",id:10},{name:"Río Negro",id:11},{name:"Rivera",id:12},{name:"Rocha",id:13},{name:"Salto",id:14},{name:"San José",id:15},{name:"Soriano",id:16},{name:"Tacuarembó",id:17},{name:"Treinta y Tres",id:18}];
    $scope.departamentosList = departamentosList.data;
    $scope.departamentosList.unshift({nombreDepartamento:"Seleccione Departamento",id:-1});
    $scope.depSelected = $scope.departamentosList[0];
    $scope.selectDepartamento = function(e,departamento)
    {
        e.preventDefault();
        $scope.depSelected = departamento;
    };
}]);