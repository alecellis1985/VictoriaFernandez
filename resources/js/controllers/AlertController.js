'use strict';

Professionals.controller('AlertController', ['$scope', '$routeParams', '$http', '$rootScope', '$location', '$timeout', function ($scope, $routeParams, $http, $rootScope, $location, $timeout) {
        //Alert OBJS { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' }
        $scope.alerts = [];

        $scope.$on('alert-event', function (event, args) {
            $scope.addAlert(args);
            $timeout(function () {
                //NEED TO ADD THIS BECAUSE angular 1.3 adds to the element an ng hide
                $('.alertsTop button').removeClass('ng-hide');
            }, 5);
        });

        $scope.addAlert = function (alertElem) {
            $scope.alerts.push(alertElem);
            var alertIndex = $scope.alerts.length - 1;
            $timeout(function () {
                //NEED TO ADD THIS BECAUSE angular 1.3 adds to the element an ng hide
                $scope.closeAlert(alertIndex);
            }, 3000);
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };


    }]);