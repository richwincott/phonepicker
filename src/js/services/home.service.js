app.service("homeService", ["$http", "$q", function ($http, $q) {
    this.fetch = (url) => {
        const deferred = $q.defer();
        $http.get(url).then((response) => {
            deferred.resolve(response);
        })
        return deferred.promise;
    };
}]);