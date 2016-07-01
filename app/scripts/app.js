(function() {
    'use strict';


    angular.module('tessaApp', [
            'ui.router',
            'restangular',
            'ngSanitize',
            'ui.bootstrap',
            'ui.select',
            'ngTouch'
        ])
        .constant('API_URL', 'http://52.64.27.145:5001')
        .constant('API_VERSION', '/api/1.0/')
        .config(['$stateProvider', '$httpProvider', 'RestangularProvider', '$urlRouterProvider', 'API_URL', 'API_VERSION', '$provide',
            function($stateProvider, $httpProvider, RestangularProvider, $urlRouterProvider, API_URL, API_VERSION, $provide) {
                $httpProvider.interceptors.push('authInterceptor');

                $provide.value('baseURL', API_URL);
                RestangularProvider.setBaseUrl(API_URL + API_VERSION);

                $stateProvider
                    .state('experience', {
                        url: '/experience',
                        templateUrl: 'views/experience.html'
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
                    url: '/productCatalogue/productDetailsHardware/:selected_id',
                    templateUrl: 'views/productDetailsHardware.html',
                    controller: 'hardwareDetailsCtrl'
                });

                $urlRouterProvider.otherwise('/experience');


            }
        ])
        .run(['$location', 'APIFactory', '$rootScope', function($location, APIFactory, $rootScope) {
            $rootScope._ = window._;
        }])
        .factory('_', ['$window', function($window) {
            return $window._;
        }]);
})();
