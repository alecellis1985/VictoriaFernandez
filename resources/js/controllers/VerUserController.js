'use strict';

Professionals.controller('VerUserController', ['$scope', '$location', 'departamentosList', 'categoriasList', 'barriosList', '$modal',
    'planes', 'Helper', 'userData', 'imageUrl',
    function ($scope, $location, departamentosList, categoriasList, barriosList, $modal, planes, Helper, userData, imageUrl) {

        $scope.planes = planes;
        $scope.newUser = false;
        $scope.isCollapsed = false;
        $scope.editMode = false;

        $scope.registro = {
            mostrarRegistro: !false,
            empresa: userData.plan > 6
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
            imageUrl.set(userData.data.user.imagenUrl);
            $scope.imageUrl = imageUrl;


        };

        function sortById(propertyName) {
            return function (a, b) {
                var aId = parseInt(a[propertyName]);
                var bId = parseInt(b[propertyName]);
                return ((aId < bId) ? -1 : ((aId > bId) ? 1 : 0));
            };
        }
        ;

        $scope.fillEditUserCamps();

        $scope.editUserData = function (e) {
            e.preventDefault();
            $location.path('/editar-usuario');

        };

        $scope.editUserImg = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var modalInstance = $modal.open({
                templateUrl: 'resources/tpl/editImg.html',
                controller: 'EditImgController',
                size: 'lg'
                        //        resolve: {
                        //          items: function () {
                        //            return $scope.items;
                        //          }
                        //        }
            });
            modalInstance.result.then(function () {
                //$scope.selected = selectedItem;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });

        };


        $scope.editUserPwd = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var modalInstance = $modal.open({
                templateUrl: 'resources/tpl/editPwd.html',
                controller: 'EditPwdController',
                size: 'lg'
                        //        resolve: {
                        //          items: function () {
                        //            return $scope.items;
                        //          }
                        //        }
            });
            modalInstance.result.then(function () {
                //$scope.selected = selectedItem;
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });

        };
    }]);