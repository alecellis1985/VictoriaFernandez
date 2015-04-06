Professionals.directive('imageUpload', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.imageUpload = function (modelValue, viewValue) {
                if (typeof modelValue === 'undefined')
                    return false;

                if (typeof modelValue[0] === 'undefined')
                    return false;

                if (ctrl.$isEmpty(modelValue[0].name))
                    return false;

                var splitImgName = viewValue[0].name.split(".");
                var imgExtension = splitImgName[splitImgName.length - 1].toUpperCase();

                if (imgExtension === "JPEG" || imgExtension === "JPG" || imgExtension === "PNG") {
                    return true;
                }
                // it is invalid
                return false;
            };
        }
    };
});

Professionals.directive('username', function ($q, $timeout, $http) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$asyncValidators.username = function (modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                    return $q.when();
                }

                var def = $q.defer();

//                $http({
//                    method: 'POST',
//                    url: 'api/check-username',
//                    data: {'userName': modelValue}
//                })
                $http.post('api/check-username', {'userName': modelValue}, {headers: {'Content-Type': 'application/json;charset=utf-8'}})
                        .success(function (data, status, headers, cfg) {
                            if (data.success && data.data.isUnique)
                                // c.$setValidity('unique', data.isUnique);
                                def.resolve();
                            else
                                //c.$setValidity('unique', false);
                                def.reject();
                        }).error(function (data, status, headers, cfg) {
                    //c.$setValidity('unique', false);
                    def.reject();
                });


                return def.promise;
            };
        }
    };
});


//TODO: Refactor with CommonService
//Professionals.directive('username', ['$http', function($http) {
//  return {
//    require: 'ngModel',
//    link: function(scope, ele, attrs, c) {
//      scope.$watch(attrs.ngModel, function() {
//        $http({
//          method: 'POST',
//          url: 'api/check-username',
//          data: {'userName': attrs.ensureUnique}
//        }).success(function(data, status, headers, cfg) {
//            if(data.success)
//                c.$setValidity('unique', data.isUnique);
//            else
//                c.$setValidity('unique', false);
//        }).error(function(data, status, headers, cfg) {
//          c.$setValidity('unique', false);
//        });
//      });
//    }
//  };
//}]);