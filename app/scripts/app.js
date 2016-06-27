'use strict';

var Application = Application || {};

Application.Controllers = angular.module('tessaApp.controllers', []);
Application.Services = angular.module('tessaApp.services', []);

angular.module('tessaApp', [ 'tessaApp.controllers', 'tessaApp.services','ui.router', 'restangular'])
  
.run(['$location', function ($location) {
    // APIFactory.getArticles();
}])

.constant('API_URL', 'http://52.64.27.145:5001')
.constant('API_VERSION', '/api/1.0/')



.config(function ($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider, $provide,API_VERSION, API_URL) {
    // $httpProvider.interceptors.push('httpInterceptor');

    $stateProvider
    .state('experience', {
        url: '/experience',
        templateUrl: 'views/experience.html',
        controller: 'MainCtrl'
    })

    .state('builder', {
        url: '/builder',
        templateUrl: 'views/builder.html'
    })

    .state('priceBook', {
        url: '/priceBook',
        templateUrl: 'views/priceBook.html'
    })

    .state('productCatalogue', {
        url: '/productCatalogue',
        templateUrl: 'views/productCatalogue.html'
    })

    $urlRouterProvider.otherwise('/experience');

});
