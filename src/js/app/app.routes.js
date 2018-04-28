var app = angular.module("phonepicker");

app.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
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