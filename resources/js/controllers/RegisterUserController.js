'use strict';

Professionals.controller('RegisterUserController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', 'CommonService', 'departamentosList', 'categoriasList', function ($scope, $routeParams, $http, $rootScope, $location, CommonService, departamentosList, categoriasList) {
    
    $scope.registro = {
        mostrarRegistro:false,
        empresa:false
    };
    
    $scope.categorias = categoriasList.data;
    $scope.categorias.unshift({categoriaNombre:"Seleccione Categoria",id:-1});
    $scope.selectedCategoria = $scope.categorias[0];
    $scope.selectCategoria = function(e,categoria)
    {
        e.preventDefault();
        $scope.selectedCategoria = categoria;
    };
    
    $scope.departamentosList = departamentosList.data;
    $scope.departamentosList.unshift({nombreDepartamento:"Seleccione Departamento",id:-1});
    $scope.depSelected = $scope.departamentosList[0];
    $scope.selectDepartamento = function(e,departamento)
    {
        e.preventDefault();
        $scope.depSelected = departamento;
    };
    $scope.registrarUsuario = function()
    {
      var data = {
                'nombre':$scope.nombre,
                'apellido':$scope.apellido,                
                'username':$scope.username,
                'password':$scope.password,
                'email':$scope.email,
                'telefono':$scope.telefono,
                'celular':$scope.celular,
                'direccion':$scope.direccion,
                'telefonoEmp':$scope.telefonoEmp,
                'departamento':parseInt($scope.depSelected.idDepartamento),
                'categoria':parseInt($scope.selectedCategoria.categoriaId),
                'sitioWeb':$scope.sitioWeb,
                'imagen':$scope.imagen,
                'enlace1':$scope.enlace1,
                'enlace2':$scope.enlace2,
                'descService':$scope.descService,
                'servicioOfrecido1':$scope.servicioOfrecido1,
                'servicioOfrecido2':$scope.servicioOfrecido2,
                'servicioOfrecido3':$scope.servicioOfrecido3
        };
        CommonService.postJsonRequest('api/agregar_usuario',data).then(function(data){
            alert(data.datos);
        });
        
    };
}]);