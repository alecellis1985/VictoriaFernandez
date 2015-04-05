'use strict';

Professionals.controller('LoginController', ['$scope', '$routeParams', '$http', '$rootScope', '$location','$modalInstance', function ($scope, $routeParams, $http, $rootScope, $location,$modalInstance) {
    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

}]);