'use strict';

var Application = Application || {};

Application.Controllers = angular.module('tessaApp.controllers', []);
Application.Services = angular.module('tessaApp.services', []);

angular.module('tessaApp', [ 'tessaApp.controllers', 'tessaApp.services','ui.router', 'restangular'])
  
.run(['$location', function ($location) {
    // APIFactory.getArticles();
}])

.constant('API_URL', 'http://52.64.27.145:5001/api/1.0')
.constant('baseURL', 'http://52.64.27.145:5001/')

.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/experience');
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
});


  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl',
  //       controllerAs: 'main'
  //     })
  //     .when('/about', {
  //       templateUrl: 'views/about.html',
  //       controller: 'AboutCtrl',
  //       controllerAs: 'about'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
