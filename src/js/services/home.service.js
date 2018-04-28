var app = angular.module("phonepicker");

app.service("homeService", ["$http", "$q", function ($http, $q) {
    this.fetch = function (url) {
        var deferred = $q.defer();
        $http.get(url).then(function (response) {
            deferred.resolve(response);
        })
        return deferred.promise;
    };
}]);