'use strict';

Professionals.controller('RegisterUserController', ['$scope', '$routeParams', '$rootScope', '$location', '$upload',
    'CommonService', 'departamentosList', 'categoriasList', 'barriosList',
    function ($scope, $routeParams, $rootScope, $location, $upload, CommonService, departamentosList, categoriasList, barriosList) {
        //FOR UPLOAD FILE (IMG)
        $scope.$watch('files', function () {
            //perform img validation 
            $scope.validateImg($scope.files);
        });

        $scope.validateImg = function (files) {
            if (files && files.length) {
                var file = files[0];
                var error;
                if (file.type.indexOf('image') === -1) {
                    error = 'Image extension not allowed, please choose a JPEG or PNG file.'
                }

                if (file.size > 2097152) {
                    error = 'File size cannot exceed 2 MB';
                }
                
                if(error === undefined)
                { 
                    //$rootScope.$broadcast('alert-event', { type: 'success', msg: 'FILE OK!' });
                }
                else
                {
                    $rootScope.$broadcast('alert-event', { type: 'danger', msg: error });
                }
            }
        };

        $scope.registro = {
            mostrarRegistro: false,
            empresa: false
        };
        
        $scope.goBackRegistration = function (e) {
            e.preventDefault();
            $scope.registro.mostrarRegistro = false;
            $scope.registro.empresa = false;
        };

        $scope.showProfessionalRegistration = function (e) {
            e.preventDefault();
            $scope.registro.mostrarRegistro = true;
            $scope.registro.empresa = false;
        };

        $scope.showEnterpriseRegistration = function (e) {
            e.preventDefault();
            $scope.registro.mostrarRegistro = true;
            $scope.registro.empresa = true;
        };
        
        $scope.barrios = barriosList.data;
        $scope.barrios.unshift({barrioNombre: "Seleccione Barrio", id: -1});
        $scope.selectedBarrio = $scope.barrios[0];
        $scope.categorias = categoriasList.data;
        $scope.categorias.unshift({categoriaNombre: "Seleccione Categoria", categoriaId: -1});
        $scope.selectedCategoria = $scope.categorias[0];
        $scope.departamentosList = departamentosList.data;
        $scope.departamentosList.unshift({nombreDepartamento: "Seleccione Departamento", idDepartamento: -1});
        $scope.depSelected = $scope.departamentosList[0];
        
        $scope.user = {};
        
        $scope.registrarUsuario = function ()
        {
            var data = {
                'nombre': $scope.user.nombre,
                'apellido': $scope.user.apellido,
                'username': $scope.user.username,
                'password': $scope.user.password,
                'email': $scope.user.email,
                'telefono': $scope.user.telefono,
                'celular': $scope.user.celular,
                'direccion': $scope.user.direccion,
                'telefonoEmp': $scope.user.telefonoEmp,
                'departamento': parseInt($scope.depSelected.idDepartamento),
                'categoria': parseInt($scope.selectedCategoria.categoriaId),
                'sitioWeb': $scope.user.sitioWeb,
                'imagen': $scope.user.imagen,
                'facebookUrl': $scope.user.facebookUrl,
                'twitterUrl': $scope.user.twitterUrl,
                'linkedinUrl': $scope.user.linkedinUrl,
                'descService': $scope.user.descService,
                'servicioOfrecido1': $scope.user.servicioOfrecido1,
                'servicioOfrecido2': $scope.user.servicioOfrecido2,
                'servicioOfrecido3': $scope.user.servicioOfrecido3
            };
            
            CommonService.postRequestWithFile('api/agregar_usuario', data, $scope.files[0]).then(function (result) {
                debugger;
                if(result.data.success)
                    $rootScope.$broadcast('alert-event', { type: 'success', msg: 'Has sido registrado con exito' });
                else
                    $rootScope.$broadcast('alert-event', { type: 'error', msg: result.data.msg });
                    
            });

        };
    }]);