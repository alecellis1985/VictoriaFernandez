'use strict';

Professionals.controller('ProfessionalsSearchController', ['$scope', '$routeParams', '$http', '$rootScope', '$location','CommonService','departamentosList','categoriasList','barriosList', function ($scope, $routeParams, $http, $rootScope, $location,CommonService,departamentosList,categoriasList,barriosList) {
    
    $scope.categorias = categoriasList.data;
    $scope.categorias.unshift({categoriaNombre:"Seleccione Categoria",categoriaId:-1});
    $scope.selectedCategoria = $scope.categorias[0];
    
    $scope.barrios = barriosList.data;
    $scope.barrios.unshift({barrioNombre: "Seleccione Barrio", id: -1});
    $scope.selectedBarrio = $scope.barrios[0];
        
    $scope.isCollapsed = true;
    
    $scope.selectedList = 2;
    
    $scope.setListType = function(num)
    {
        $scope.selectedList = num;
    }
    
    $scope.selectedUser = null;
    
    $scope.showUserInfo = function(user)
    {
        if(user !== $scope.selectedUser)
        {
            $scope.isCollapsed = false;
        }
        else
        {
            $scope.isCollapsed = !$scope.isCollapsed;
        }
        $scope.selectedUser = user;
    }
    $scope.sendMailToUser = function(event,user)
    {
        event.stopPropagation();
        alert('sendMailToUser');
    }
    
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
            var users = data.data;
            var length  = users.length;
            while(length--){
                $scope.markerPropCreation(users[length]);
            }
            
            $scope.users = users;
        });
    };
    
    $scope.markerPropCreation = function(obj)
    {
        if(obj.latitude === undefined || obj.longitude === undefined){
            obj.markers = [];
        }
        else
        {
            obj.markers = [{lat:obj.latitude,long:obj.longitude}];
        }
    }
    
}]);
