'use strict';

Professionals.controller('RegisterUserController', ['$scope', '$routeParams', '$rootScope', '$location', '$upload',
    'CommonService', 'departamentosList', 'categoriasList',
    function ($scope, $routeParams, $rootScope, $location, $upload, CommonService, departamentosList, categoriasList) {
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
                    $rootScope.$broadcast('alert-event', { type: 'success', msg: 'FILE OK!' });
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

        $scope.showProfessionalRegistration = function (e) {
            e.preventDefault();
            $scope.registro.mostrarRegistro = true;
            $scope.registro.empresa = false;
        };

        $scope.showEnterpriseRegistration = function (e) {
            e.preventDefault();
            $scope.registro.mostrarRegistro = false;
            $scope.registro.empresa = true;
        };

        $scope.categorias = categoriasList.data;
        $scope.categorias.unshift({categoriaNombre: "Seleccione Categoria", id: -1});
        $scope.selectedCategoria = $scope.categorias[0];
        $scope.selectCategoria = function (e, categoria)
        {
            e.preventDefault();
            $scope.selectedCategoria = categoria;
        };

        $scope.departamentosList = departamentosList.data;
        $scope.departamentosList.unshift({nombreDepartamento: "Seleccione Departamento", id: -1});
        $scope.depSelected = $scope.departamentosList[0];
        $scope.selectDepartamento = function (e, departamento)
        {
            e.preventDefault();
            $scope.depSelected = departamento;
        };
        $scope.registrarUsuario = function ()
        {
            var data = {
                'nombre': $scope.nombre,
                'apellido': $scope.apellido,
                'username': $scope.username,
                'password': $scope.password,
                'email': $scope.email,
                'telefono': $scope.telefono,
                'celular': $scope.celular,
                'direccion': $scope.direccion,
                'telefonoEmp': $scope.telefonoEmp,
                'departamento': parseInt($scope.depSelected.idDepartamento),
                'categoria': parseInt($scope.selectedCategoria.categoriaId),
                'sitioWeb': $scope.sitioWeb,
                'imagen': $scope.imagen,
                'facebookUrl': $scope.facebookUrl,
                'twitterUrl': $scope.twitterUrl,
                'linkedinUrl': $scope.linkedinUrl,
                'descService': $scope.descService,
                'servicioOfrecido1': $scope.servicioOfrecido1,
                'servicioOfrecido2': $scope.servicioOfrecido2,
                'servicioOfrecido3': $scope.servicioOfrecido3
            };
            
            CommonService.postRequestWithFile('api/agregar_usuario', data, $scope.files[0]).then(function (result) {
                $rootScope.$broadcast('alert-event', { type: 'success', msg: 'Has sido registrado con exito' });
            });

        };
    }]);