'use strict';

var Application = Application || {};

Application.Controllers = angular.module('tessaApp.controllers', []);
Application.Services = angular.module('tessaApp.services', []);

angular.module('tessaApp', [ 'tessaApp.controllers', 'tessaApp.services','ui.router', 'restangular', 'ngSanitize','ui.bootstrap'])
  
.run(['$location', 'APIFactory', function ($location, APIFactory) {
    // APIFactory.getArticles();
}])

// .constant('API_URL', 'http://52.64.27.145:5001')
.constant('API_URL', 'http://52.64.27.145:5001')

.constant('API_VERSION', '/api/1.0/')

.config(function($stateProvider, $httpProvider, RestangularProvider, $urlRouterProvider, API_URL, API_VERSION, $provide) {
    $httpProvider.interceptors.push('authInterceptor');

    $provide.value('baseURL', API_URL);
    RestangularProvider.setBaseUrl(API_URL + API_VERSION);

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
        templateUrl: 'views/productCatalogue.html',
        controller: 'productCtrl'
    })

    .state('search', {
        url: '/search',
        templateUrl: 'views/search.html'
    })

    .state('productDetailsSolution', {
        url: '/productCatalogue/productDetailsSolution',
        templateUrl: 'views/productDetailsSolution.html'
    })

    .state('productDetailsHardware', {
        url: '/productDetailsSolution',
        templateUrl: 'views/productDetailsHardware.html'
    });

    $urlRouterProvider.otherwise('/experience');

});
