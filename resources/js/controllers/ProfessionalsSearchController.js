'use strict';

Professionals.controller('ProfessionalsSearchController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', 'CommonService', 'departamentosList', 'categoriasList', 'barriosList','premiumUsers',function ($scope, $routeParams, $http, $rootScope, $location, CommonService, departamentosList, categoriasList, barriosList,premiumUsers) {
        $scope.categorias = categoriasList.data;
        $scope.categorias.unshift({categoriaNombre: "Seleccione Categoria", categoriaId: -1});
        $scope.selectedCategoria = $scope.categorias[0];
        $scope.barrios = $.grep(barriosList.data,function(elem){return elem.barrioId < 82;});;
        $scope.barrios.unshift({barrioNombre: "Seleccione Barrio", id: -1});
        $scope.selectedBarrio = $scope.barrios[0];
        $scope.usersViewList = [];
        $scope.isCollapsed = true;
        $scope.selectedUser = null;
        $scope.premiumUsers = premiumUsers.data;
        $scope.premiumUsers.map(function(elem){
            if(elem.direccion !== null || elem.direccion !== undefined){
                elem.direccion = $.parseJSON(elem.direccion);
            }
            if(elem.telefonoEmp !== null || elem.telefonoEmp !== undefined){
                elem.telefonoEmp = $.parseJSON(elem.telefonoEmp);
            }
        });
        
        $scope.shuffle = function(array) {
            var tmp, current, top = array.length;

            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }

            return array;
        }
        $scope.shuffle($scope.premiumUsers);
        
        $scope.showUserInfo = function (user)
        {   
            if (user !== $scope.selectedUser)
            {
                $scope.isCollapsed = false;
            }
            else
            {
                $scope.isCollapsed = !$scope.isCollapsed;
            }
            $scope.selectedUser = user;
        }

        //$scope.departamentosList = [{name:"Seleccione Departamento",id:-1},{name:"Montevideo",id:0},{name:"Artigas",id:1},{name:"Canelones",id:2},{name:"Cerro Largo",id:3},{name:"Colonia",id:4},{name:"Durazno",id:5},{name:"Flores",id:6},{name:"Florida",id:7},{name:"Lavalleja",id:8},{name:"Maldonado",id:9},{name:"Paysandú",id:10},{name:"Río Negro",id:11},{name:"Rivera",id:12},{name:"Rocha",id:13},{name:"Salto",id:14},{name:"San José",id:15},{name:"Soriano",id:16},{name:"Tacuarembó",id:17},{name:"Treinta y Tres",id:18}];
        $scope.departamentosList = departamentosList.data;
        $scope.departamentosList.unshift({nombreDepartamento: "Seleccione Departamento", idDepartamento: -1});
        $scope.depSelected = $scope.departamentosList[0];
        $scope.users = null;
        $scope.selectDepartamento = function (e, departamento)
        {
            e.preventDefault();
            $scope.depSelected = departamento;
            if($scope.selectedCategoria.categoriaId === -1)
                return;       
            if(departamento.idDepartamento === -1 && ($scope.buscoProf === undefined || $scope.buscoProf.trim() === ''))
                return;
            getUsers();
        };
        
        $scope.selectCategoria = function (e, categoria)
        {
            e.preventDefault();
            $scope.selectedCategoria = categoria;
            if($scope.depSelected.idDepartamento === -1 || $scope.selectedCategoria.categoriaId === -1)
                return;
            getUsers();
        };
        
        function getUsers(){
            $scope.isCollapsed = true;
            var url = 'api/users' + '/' + $scope.selectedCategoria.categoriaId +
                    '/' + $scope.depSelected.idDepartamento + (($scope.buscoProf !== undefined && $scope.buscoProf !== '') ?('/' + $scope.buscoProf):'');
            CommonService.getRequest(url).then(function (data) {
                if(!data.success){
                    $scope.users = [];
                    $scope.totalItems = 0;
                    $scope.currentPage = 1;
                    return;
                }
                $scope.users = [];
                var users = data.data;
                var length = users.length;
                $scope.totalItems = length;
                $scope.currentPage = 1;
                $scope.users = users;
                $scope.users.map(function(elem){
                    if(elem.markers !== null || elem.markers !== undefined){
                        elem.markers = $.parseJSON(elem.markers);
                    }
                    if(elem.direccion !== null || elem.direccion !== undefined){
                        elem.direccion = $.parseJSON(elem.direccion);
                    }
                    if(elem.telefonoEmp !== null || elem.telefonoEmp !== undefined){
                        elem.telefonoEmp = $.parseJSON(elem.telefonoEmp);
                    }
                });
                $scope.pageChanged();
            });
        }
        
        $scope.pageChanged = function(){
            var startIndex = ($scope.currentPage - 1)*6;
            var endIndex = startIndex + 6;
            $scope.usersViewList = $scope.users.slice(startIndex,endIndex);
        }

        $scope.myInterval = 4000;
        var slides = $scope.slides = [];
        $scope.addSlide = function (url, mainText, subText, categoria) {
            slides.push({
                image: url,
                text: mainText,
                subText: subText,
                categoria: categoria
            });
        };
        
        $scope.addSlide('./resources/img/handshake.jpg', "¿Buscas un profesional?", "Encuentra al profesional que estás buscando", "Arquitectos")
        $scope.addSlide('./resources/img/profesionalesSearch.jpg', "¿Buscas un escribano?", "Encuentra al profesional que estás buscando", "Escribanos");
        $scope.addSlide('./resources/img/contador.jpg', "¿Buscas un contador?", "Encuentra al profesional que estás buscando", "Contadores");
        

        $scope.setDropdownsAndExecuteQuery = function (nombreCategoria) {
            $scope.selectedCategoria = $scope.categorias.filter(function (elem) {
                return elem.categoriaNombre === nombreCategoria;
            })[0];
            $scope.depSelected = $scope.departamentosList.filter(function (elem) {
                return elem.nombreDepartamento === "Montevideo";
            })[0];
            getUsers();
        }
        
        $scope.totalItems = 0;
        $scope.currentPage = 1;
        $scope.maxSize = 6;
        
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };
        
        $scope.$watch('buscoProf', function (newval, oldval) {
            if (newval !== undefined && newval !== oldval && newval.length > 0) {
                getUsers();
            }
        });

    }]);
