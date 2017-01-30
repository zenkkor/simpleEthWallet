var app = angular.module("simpleEthWallet", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'apps/dashboard/views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when("/events", {
            templateUrl: 'apps/events/views/events.html',
            controller: 'EventsCtrl'
        })
        .when("/funds", {
            templateUrl: 'apps/funds/views/funds.html',
            controller: 'FundsCtrl'
        })
        .otherwise('/');
});
