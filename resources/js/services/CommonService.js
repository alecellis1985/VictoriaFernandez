Professionals.factory('CommonService', function ($http, $q) {
    var commonService = {};

    commonService.getRequest = function (requestUrl, params, canceller) {
        var deferred = $.Deferred(),
            cancelTimeout = canceller || $q.defer();

        $http.get(requestUrl + (params != undefined ? '?' + $.param(params) : ''), { timeout: cancelTimeout.promise }).success(function (data) {
            deferred.resolve(data);
        });
        return deferred.promise();
    };

    commonService.postRequest = function (requestUrl, params) {
        var deferred = $.Deferred();
        $http.post(requestUrl, JSON.stringify(params)).success(function (data) {
            deferred.resolve(data);
        });
        return deferred.promise();
    };

    commonService.postJsonRequest = function (requestUrl, params) {
        var deferred = $.Deferred();
        $http.post(requestUrl, params, { headers: { 'Content-Type': 'application/json;charset=utf-8' } }).success(function (data) {
            deferred.resolve(data);
        });
        return deferred.promise();
    };

    return commonService;
});


