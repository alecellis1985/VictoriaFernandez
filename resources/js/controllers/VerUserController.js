'use strict';

Professionals.controller('VerUserController', ['$scope', '$routeParams', '$rootScope', '$location', '$upload',
    'CommonService', 'departamentosList', 'categoriasList', 'barriosList', 'planes', 'Helper', 'userData',
    function ($scope, $routeParams, $rootScope, $location, $upload, CommonService, departamentosList, categoriasList,
            barriosList, planes, Helper, userData) {
        //FOR UPLOAD FILE (IMG)
        $scope.$watch('files', function () {
            //perform img validation 
            $scope.validateImg($scope.files);
        });
        $scope.planes = planes;
        $scope.newUser = false;
        $scope.isCollapsed = false;
        $scope.editMode = false;

        //cambiar por tipo: {basico:{},premium:{} }; para que en la bd quede bien
        $scope.profesionalesAvailablePlans = {
            0: {//Profesional
                Basico: {
                    Mensual: 500,
                    Semestral: 2400,
                    Anual: 3600
                },
                Premium: {
                    Mensual: 900,
                    Semestral: 4320,
                    Anual: 6480
                }
            },
            1: {//Empresarial
                Basico: {
                    Mensual: 800,
                    Semestral: 3840,
                    Anual: 5760
                },
                Premium: {
                    Mensual: 1200,
                    Semestral: 5760,
                    Anual: 8640
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



        $scope.validateImg = function (files) {
            if (files && files.length) {
                var file = files[0];
                var error;
                if (file.type.indexOf('image') === -1) {
                    error = 'Image extension not allowed, please choose a JPEG or PNG file.';
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
            mostrarRegistro: !false,
            empresa: userData.plan > 6
        };

        $scope.goBackRegistration = function (e) {
            e.preventDefault();
            if (false) {
                $scope.registro.mostrarRegistro = false;
                $scope.registro.empresa = false;
            } else {
                $location.path('/index.html');
            }
        };

        /**************** PARA EL REGISTRO MIRAR ESTO **********************************/
        //Con $scope.selectedPlan.categoria tengo que valor de plan eligio
        //Con $scope.selectedPlan.tipo se si es 0 o 1 o sea profesional o empresa
        $scope.showRegistration = function (e, tipo, duracion, categoria) {
            window.scrollTo(0, 0);
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

        $scope.dropdownsValid = true;
        $scope.dropDownCheck = function () {
            $scope.dropdownsValid = Helper.isUndefinedOrNull($scope.selectedCategoria.categoriaId) ||
                    Helper.isUndefinedOrNull($scope.depSelected.idDepartamento) ||
                    parseInt($scope.selectedCategoria.categoriaId) < 0 ||
                    parseInt($scope.depSelected.idDepartamento) < 0 ||
                    ($scope.depSelected.nombreDepartamento === 'Montevideo' && Helper.isUndefinedOrNull($scope.selectedCategoria.categoriaId)
                            && parseInt($scope.selectedBarrio.barrioId) < 0);
        };

        $scope.fillNewUserCamps = function ()
        {
            $scope.user.nombre = "Bin" + Helper.randomString(2);
            $scope.user.apellido = "Laden" + Helper.randomString(2);
            $scope.user.username = Helper.randomString(7);
            $scope.user.password = "asdasd";
            $scope.user.passwordConfirm = "asdasd";
            $scope.user.email = "alecellis1985@gmail.com";
            $scope.user.telefono = "26013794";
            $scope.user.celular = "098635923";
            $scope.user.direccion = "Maximo tajen 3565";
            $scope.user.telefonoEmp = "26013794";
        };

        

        $scope.fillEditUserCamps = function () {
            $scope.user = userData.data.user;
            $scope.user.passwordConfirm = userData.data.user.password;
            $scope.currentUsername = userData.data.user.username;
            var categoriaId = parseInt(userData.data.user.categoria);
            $scope.selectedCategoria = $scope.categorias.sort(sortById("categoriaId"))[categoriaId];
            $scope.user.selectedCategoriaText = $scope.selectedCategoria.categoriaNombre;

            var departamentoId = parseInt(userData.data.user.departamento);
            $scope.depSelected = $scope.departamentosList.sort(sortById("idDepartamento"))[departamentoId];
            $scope.user.selectedDepartamentoText = $scope.depSelected.nombreDepartamento;

            if ($scope.depSelected.nombreDepartamento.toLowerCase() === "montevideo") {
                var barrioId = parseInt(userData.data.user.barrio);
                $scope.selectedBarrio = $scope.barrios.sort(sortById("barrioId"))[barrioId];
                $scope.user.selectedBarrioText = $scope.selectedBarrio.barrioNombre;
            }

            var diasAtencion = {};
            diasAtencion.lunes = parseInt(userData.data.diasAtencion.lunes) === 1;
            diasAtencion.martes = parseInt(userData.data.diasAtencion.martes) === 1;
            diasAtencion.miercoles = parseInt(userData.data.diasAtencion.miercoles) === 1;
            diasAtencion.jueves = parseInt(userData.data.diasAtencion.jueves) === 1;
            diasAtencion.viernes = parseInt(userData.data.diasAtencion.viernes) === 1;
            diasAtencion.sabado = parseInt(userData.data.diasAtencion.sabado) === 1;
            diasAtencion.domingo = parseInt(userData.data.diasAtencion.domingo) === 1;

            var formasDePago = {};
            formasDePago.contado = parseInt(userData.data.formasDePago.contado) === 1;
            formasDePago.debito = parseInt(userData.data.formasDePago.debito) === 1;
            formasDePago.credito = parseInt(userData.data.formasDePago.credito) === 1;
            formasDePago.otras = parseInt(userData.data.formasDePago.otras) === 1;

            $scope.user.diasAtencion = diasAtencion;
            $scope.user.formaDePago = formasDePago;

            $scope.user.formasDePagoText = Helper.getFormasDePagoText(formasDePago);
            $scope.user.diasAtencionText = Helper.getDiasAtencionText(diasAtencion);

            $scope.user.horaComienzo = Helper.timeFromString(userData.data.diasAtencion.horaComienzo);
            $scope.user.horaFin = Helper.timeFromString(userData.data.diasAtencion.horaFin);
            $scope.user.horarioAtencionText = Helper.getHorarioAtencionText(userData.data.diasAtencion.horaComienzo, userData.data.diasAtencion.horaFin);

            $scope.IdPlan = $scope.user.plan;

            $scope.dropDownCheck();

        };

        function sortById(propertyName) {
            return function (a, b) {
                var aId = parseInt(a[propertyName]);
                var bId = parseInt(b[propertyName]);
                return ((aId < bId) ? -1 : ((aId > bId) ? 1 : 0));
            };
        }

        if (false) {
            $scope.fillNewUserCamps();
        } else {
            $scope.fillEditUserCamps();
        }

        $scope.markers = [];
        $scope.checkTime = function () {
            if ($scope.user.horaFin <= $scope.user.horaComienzo) {
                $scope.user.horaFin = new Date($scope.user.horaComienzo.getTime() + 10 * 60000);
            }
        };



        $scope.checkCategoria = function (elem) {
            return parseInt(elem.categoriaId) < 0;
        };

        $scope.checkDepto = function (elem) {
            return parseInt(elem.idDepartamento) < 0;
        };

        $scope.checkBarrio = function (elem) {
            return $scope.depSelected.nombreDepartamento === 'Montevideo' && parseInt(elem.barrioId) < 0;
        };

        $scope.registrarUsuario = function (isValid)
        {
            if (!isValid || $scope.dropdownsValid) {
                $rootScope.$broadcast('alert-event', {type: 'danger', msg: "Verifique que todos los campos esten correctamente completados!"});
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
                'horaComienzo': Helper.stringTime($scope.user.horaComienzo),
                'horaFin': Helper.stringTime($scope.user.horaFin),
                'markers': markersArr
            };
            var imgFile = null;
            if (!(typeof $scope.files === 'undefined') && !($scope.files === null))
                imgFile = $scope.files[0];
            if (false)
                CommonService.postRequestWithFile('api/agregar_usuario', data, imgFile).then(function (result) {
                    if (result.data.success) {
                        $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Has sido registrado con exito'});
                        $location.path('/index.html');
                    }
                    else
                        $rootScope.$broadcast('alert-event', {type: 'danger', msg: result.data.msg});
                });
            else
                CommonService.postRequestWithFile('api/editar_usuario', data, imgFile).then(function (result) {
                    if (result.data.success) {
                        $rootScope.$broadcast('alert-event', {type: 'success', msg: 'Datos actualizados!'});
                        $location.path('/index.html');
                    }
                    else
                        $rootScope.$broadcast('alert-event', {type: 'danger', msg: result.data.msg});
                });

        };
    }]);