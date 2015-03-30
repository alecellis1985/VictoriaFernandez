'use strict';

Professionals.controller('ProfessionalsSearchController', ['$scope', '$routeParams', '$http', '$rootScope', '$location','CommonService','departamentosList','categoriasList', function ($scope, $routeParams, $http, $rootScope, $location,CommonService,departamentosList,categoriasList) {
    
    //$scope.profesionalesList = [{ name:"Seleccione Categoria",id:-1},{ name:"Abogados",id:0},{ name:"Alambradores",id:1},{ name:"Albañiles",id:2},{ name:"Animadores",id:3},{ name:"Arquitectos",id:4},{ name:"Carpinteros",id:5},{ name:"Constructores",id:6},{ name:"Contadores",id:7},{ name:"Corredores de seguro",id:8},{ name:"Decoradores y Diseñadores de Interiores",id:9},{ name:"Desarrolladores Web",id:10},{ name:"Despachantes de aduana",id:11},{ name:"Diseñadores gráficos",id:12},{ name:"Economistas",id:13},{ name:"Economistas",id:14},{ name:"Electricistas",id:15},{ name:"Escribanos",id:16},{ name:"Estilistas/Esteticistas",id:17},{ name:"Fisioterapeutas",id:18},{ name:"Fonoaudiólogos",id:19},{ name:"Herreros",id:20},{ name:"Ingenieros",id:21},{ name:"Médicos",id:22},{ name:"Nutricionistas",id:23},{ name:"Odontólogos",id:24},{ name:"Pintores",id:25},{ name:"Podólogos",id:26},{ name:"Psicólogos",id:27},{ name:"Sanitarios",id:28},{ name:"Tapiceros",id:29},{ name:"Veterinarios",id:30},{ name:"Vidrieros",id:31}];
    $scope.categorias = categoriasList.data;
    $scope.categorias.unshift({categoriaNombre:"Seleccione Categoria",categoriaId:-1});
    $scope.selectedCategoria = $scope.categorias[0];
    $scope.selectCategoria = function(e,categoria)
    {
        e.preventDefault();
        $scope.selectedCategoria = categoria;
    };
    
    $scope.categoriasFilterClk = function(e)
    {
        e.preventDefault();
        e.stopPropagation();
    };
    //$scope.departamentosList = [{name:"Seleccione Departamento",id:-1},{name:"Montevideo",id:0},{name:"Artigas",id:1},{name:"Canelones",id:2},{name:"Cerro Largo",id:3},{name:"Colonia",id:4},{name:"Durazno",id:5},{name:"Flores",id:6},{name:"Florida",id:7},{name:"Lavalleja",id:8},{name:"Maldonado",id:9},{name:"Paysandú",id:10},{name:"Río Negro",id:11},{name:"Rivera",id:12},{name:"Rocha",id:13},{name:"Salto",id:14},{name:"San José",id:15},{name:"Soriano",id:16},{name:"Tacuarembó",id:17},{name:"Treinta y Tres",id:18}];
    $scope.departamentosList = departamentosList.data;
    $scope.departamentosList.unshift({nombreDepartamento:"Seleccione Departamento",idDepartamento:-1});
    $scope.depSelected = $scope.departamentosList[0];
    $scope.users = null;
    $scope.selectDepartamento = function(e,departamento)
    {
        e.preventDefault();
        $scope.depSelected = departamento;
        CommonService.getRequest('api/users'+'/'+$scope.selectedCategoria.categoriaId+'/'+$scope.depSelected.idDepartamento).then(function(data){
            $scope.users = [];
            $scope.users = data.data;
        });
    };
    
    
    
}]);
