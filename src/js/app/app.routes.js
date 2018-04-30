app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", ($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise("/");
    $locationProvider.hashPrefix("");
      $stateProvider
          .state("home", {
            url: "/",
            controller: "homeController",
            controllerAs: "vm",
            templateUrl: "partials/home.html"
        })
}]);