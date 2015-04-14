'use strict';

Professionals.controller('RegisterUserController', ['$scope', '$routeParams', '$rootScope', '$location', '$upload',
    'CommonService', 'departamentosList', 'categoriasList', 'barriosList',
    function ($scope, $routeParams, $rootScope, $location, $upload, CommonService, departamentosList, categoriasList, barriosList) {
        //FOR UPLOAD FILE (IMG)
        $scope.$watch('files', function () {
            //perform img validation 
            $scope.validateImg($scope.files);
        });

        
        $scope.randomString = function(letters)
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for( var i=0; i < letters; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
        
        $scope.fillNewUserCamps = function()
        {
            $scope.user.nombre = "Bin"+$scope.randomString(2);
            $scope.user.apellido = "Laden"+$scope.randomString(2);
            $scope.user.username = $scope.randomString(7);
            $scope.user.password = "asdasd";
            $scope.user.email = "alecellis1985@gmail.com";
            $scope.user.telefono = "26013794";
            $scope.user.celular = "098635923";
            $scope.user.direccion = "Maximo tajen 3565";
            $scope.user.telefonoEmp = "26013794";
            $scope.depSelected.idDepartamento = 2;
            $scope.selectedCategoria.categoriaId = 2;
            $scope.user.descService = $scope.randomString(50);
            $scope.user.servicioOfrecido1 = $scope.randomString(25);
            $scope.user.servicioOfrecido2 = $scope.randomString(25);
            $scope.user.servicioOfrecido3 = $scope.randomString(25);
            $scope.user.servicioOfrecido4 = $scope.randomString(25);
            $scope.user.servicioOfrecido5 = $scope.randomString(25);
            $scope.user.servicioOfrecido6 = $scope.randomString(25);
        }
        
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

                if (error === undefined)
                {
                    //$rootScope.$broadcast('alert-event', { type: 'success', msg: 'FILE OK!' });
                }
                else
                {
                    $rootScope.$broadcast('alert-event', {type: 'danger', msg: error});
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
        
        var initHour = new Date();
        initHour.setHours(8);
        initHour.setMinutes(0);
        
        $scope.user = {
            horaComienzo : initHour,
            horaFin: initHour
        };
        
        $scope.fillNewUserCamps();
        
        $scope.markers = [];

        $scope.registrarUsuario = function ()
        {
            //Need to map the marker position to latitude longitude to save in the db
            var markersArr = $scope.markers.map(function(obj){
                        return {
                            'latitude':obj.position.k.toString(),
                            'longitude':obj.position.D.toString(),
                        }
                    });
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
                'servicioOfrecido3': $scope.user.servicioOfrecido3,
                'servicioOfrecido4': $scope.user.servicioOfrecido4,
                'servicioOfrecido5': $scope.user.servicioOfrecido5,
                'servicioOfrecido6': $scope.user.servicioOfrecido6,
                'markers':markersArr
            };
            var imgFile = null;
            if (!(typeof $scope.files === 'undefined') && !$scope.files === null)
                imgFile = $scope.files[0];

            CommonService.postRequestWithFile('api/agregar_usuario', data, imgFile).then(function (result) {
                if (result.data.success)
                    $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Has sido registrado con exito'});
                else
                    $rootScope.$broadcast('alert-event', {type: 'error', msg: result.data.msg});

            });
        };
    }]);