'use strict';

Professionals.controller('RegisterUserController', ['$scope', '$routeParams', '$rootScope', '$location', '$upload',
    'CommonService', 'departamentosList', 'categoriasList', 'barriosList', 'planes',
    function ($scope, $routeParams, $rootScope, $location, $upload, CommonService, departamentosList, categoriasList, barriosList, planes) {
        //FOR UPLOAD FILE (IMG)
        $scope.$watch('files', function () {
            //perform img validation 
            $scope.validateImg($scope.files);
        });
        $scope.planes = planes;
        $scope.isCollapsed = true;

        $scope.randomString = function (letters)
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < letters; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        };
        //cambiar por tipo: {basico:{},premium:{} }; para que en la bd quede bien
        $scope.profesionalesAvailablePlans = {
            0: {//Profesional
                Basico: {
                    Mensual: 500,
                    Semestral: 2550,
                    Anual: 4800
                },
                Premium: {
                    Mensual: 900,
                    Semestral: 4590,
                    Anual: 8640
                }
            },
            1: {//Empresarial
                Basico: {
                    Mensual: 800,
                    Semestral: 4080,
                    Anual: 4800
                },
                Premium: {
                    Mensual: 1200,
                    Semestral: 6120,
                    Anual: 11520
                }
            }
        };
        $scope.convertIntToPlanType = function (num) {
            return num === 0 ? 'Profesional' : 'Empresarial';
        };

        $scope.getPlan = function (tipo, categoria, duracionPlan) {
            return $scope.planes.data.filter(function (elem) {
                return elem.Tipo === tipo && elem.Categoria === categoria && elem.DuracionPlan === duracionPlan;
            });
        };

        $scope.getPlanCash = function (tipo, categoria, duracionPlan) {
            var plan = $scope.getPlan(tipo, categoria, duracionPlan);
            return plan.length > 0 ? plan.Precio : 0;
        };

        $scope.selectedPlan = {};

        $scope.showPlan = function (plan)
        {
            if ($scope.selectedPlan.tipo === plan)
            {
                $scope.isCollapsed = true;
                $scope.selectedPlan = {};
            }
            else
            {
                $scope.selectedPlan.tipo = plan;
                $scope.selectedPlan.nombre = plan === 0 ? 'Plan Profesionales' : 'Plan Empresas'
                $scope.isCollapsed = false;
            }
        }

        $scope.fillNewUserCamps = function ()
        {
            $scope.user.nombre = "Bin" + $scope.randomString(2);
            $scope.user.apellido = "Laden" + $scope.randomString(2);
            $scope.user.username = $scope.randomString(7);
            $scope.user.password = "asdasd";
            $scope.user.passwordConfirm = "asdasd";
            $scope.user.email = "alecellis1985@gmail.com";
            $scope.user.telefono = "26013794";
            $scope.user.celular = "098635923";
            $scope.user.direccion = "Maximo tajen 3565";
            $scope.user.telefonoEmp = "26013794";
//            $scope.depSelected.idDepartamento = 2;
//            $scope.selectedCategoria.categoriaId = 2;
//            $scope.user.descService = $scope.randomString(50);
//            $scope.user.servicioOfrecido1 = $scope.randomString(25);
//            $scope.user.servicioOfrecido2 = $scope.randomString(25);
//            $scope.user.servicioOfrecido3 = $scope.randomString(25);
//            $scope.user.servicioOfrecido4 = $scope.randomString(25);
//            $scope.user.servicioOfrecido5 = $scope.randomString(25);
//            $scope.user.servicioOfrecido6 = $scope.randomString(25);
        };

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

        /**************** PARA EL REGISTRO MIRAR ESTO **********************************/
        //Con $scope.selectedPlan.categoria tengo que valor de plan eligio
        //Con $scope.selectedPlan.tipo se si es 0 o 1 o sea profesional o empresa
        $scope.showRegistration = function (e, tipo, duracion, categoria) {
            e.preventDefault();
            $scope.userPlan = $scope.getPlan($scope.convertIntToPlanType(tipo), categoria, duracion);
            if ($scope.userPlan.length > 0)
            {
                $scope.IdPlan = $scope.userPlan[0].IdPlan;
            }
            $scope.registro.mostrarRegistro = true;
            $scope.registro.empresa = $scope.selectedPlan.tipo === 1;
        };

        $scope.barrios = barriosList.data;
        $scope.barrios.unshift({barrioNombre: "Seleccione Barrio", barrioId: -1});
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
            horaComienzo: initHour,
            horaFin: initHour,
            diasAtencion: {
                lunes: false,
                martes: false,
                miercoles: false,
                jueves: false,
                viernes: false,
                sabado: false,
                domingo: false
            },
            formaDePago: {
                contado: false,
                debito: false,
                credito: false,
                otras: false
            }
        };

        $scope.fillNewUserCamps();

        $scope.markers = [];

        $scope.checkTime = function () {
            if ($scope.user.horaFin <= $scope.user.horaComienzo) {
                $scope.user.horaFin = new Date($scope.user.horaComienzo.getTime() + 10 * 60000);
            }
        };

        function stringTime(dateTime) {
            var hours = dateTime.getHours();
            var minutes = dateTime.getMinutes();
            var seconds = 0;//dateTime.getSeconds();

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            return hours + ":" + minutes + ":" + seconds;

        }

//         $scope.dropDownCheck =  function(){
//              //Check category is set
////            $scope.categoriaError = parseInt($scope.selectedCategoria.categoriaId) < 0;
//            
//            //Check depto is set
////            $scope.departamentoError = parseInt($scope.depSelected.idDepartamento) < 0;
//            
//            //Check barrio is set if depto == Montevideo
//           // $scope.barrioError = $scope.depSelected.nombreDepartamento === 'Montevideo' && parseInt($scope.selectedBarrio.barrioId) < 0;
//            
//        };

        $scope.checkCategoria = function (elem) {
            return parseInt(elem.categoriaId) < 0;
        };

        $scope.checkDepto = function (elem) {
            return parseInt(elem.idDepartamento) < 0;
        };

        $scope.checkBarrio = function (elem) {
            return $scope.depSelected.nombreDepartamento === 'Montevideo' && parseInt(elem.barrioId) < 0;
        };

//        $scope.$watch("selectedCategoria", function(){
//            $scope.dropDownCheck();
//        });       

//       $scope.$watch("depSelected", function(){
//            $scope.dropDownCheck();
//        });   
//        
//        $scope.$watch("selectedBarrio", function(){
//            $scope.dropDownCheck();
//        });   

        var validForm = function () {

            var errors = false;

//            $scope.dropDownCheck();

            //Check errors
//            errors = $scope.categoriaError || $scope.departamentoError;

            return !errors;
        };

        $scope.registrarUsuario = function (isValid)
        {
                
            
            if (!isValid || !validForm()) {
                $rootScope.$broadcast('alert-event', {type: 'danger', msg: "Existen errores en el formulario!"});
                return;
            }

            //Need to map the marker position to latitude longitude to save in the db
            var markersArr = $scope.markers.map(function (obj) {
                return {
                    'latitude': obj.position.A.toString(),
                    'longitude': obj.position.F.toString(),
                };
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
                'barrio': $scope.selectedBarrio.barrioId === -1 ? null : parseInt($scope.selectedBarrio.barrioId),
                'sitioWeb': $scope.user.sitioWeb,
                'plan': parseInt($scope.IdPlan),
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
                'descServiceLong': $scope.user.descServiceLong,
                'formaDePago': $scope.user.formaDePago,
                'diasAtencion': $scope.user.diasAtencion,
                'horaComienzo': stringTime($scope.user.horaComienzo),
                'horaFin': stringTime($scope.user.horaFin),
                'markers': markersArr
            };
            debugger;
            var imgFile = null;
            if (!(typeof $scope.files === 'undefined') && !($scope.files === null))
                imgFile = $scope.files[0];
            CommonService.postRequestWithFile('api/agregar_usuario', data, imgFile).then(function (result) {
                if (result.data.success) {
                    $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Has sido registrado con exito'});
                    $location.path('/index.html');
                }
                else
                    $rootScope.$broadcast('alert-event', {type: 'danger', msg: result.data.msg});
            });
        };
    }]);