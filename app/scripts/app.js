'use strict';

var Application = Application || {};

Application.Controllers = angular.module('tessaApp.controllers', ['tessaApp.filters']);
Application.Services = angular.module('tessaApp.services', []);
Application.Filters = angular.module('tessaApp.filters', []);


angular.module('tessaApp', [ 'tessaApp.controllers', 'tessaApp.services','ui.router', 'restangular', 'ngSanitize','ui.bootstrap','ui.select', 'checklist-model'])

.run(['$location', 'APIFactory','$rootScope', function ($location, APIFactory, $rootScope) {
    // APIFactory.getArticles();
    $rootScope._ = window._;
}])

.constant('_', _)
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
        templateUrl: 'views/search.html',
        controller: 'searchCtrl'
    })

    .state('productDetailsSolution', {
        url: '/productCatalogue/productDetailsSolution/:selected_id',
        templateUrl: 'views/productDetailsSolution.html',
        controller: 'detailSolutionCtrl'
    })

    .state('productDetailsHardware', {
        url: '/productCatalogue/productDetailsHardware',
        templateUrl: 'views/productDetailsHardware.html'
    });

    $urlRouterProvider.otherwise('/experience');


    });
