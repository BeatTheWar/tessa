(function() {
    'use strict';
    angular.module('tessaApp')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location', '$injector'];

    function authInterceptor($rootScope, $q, $location, $injector) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                config.headers.accesskey = 'jeJMH2vWAQocOrat0bu1yqLJg1X0xdYZ';
                return config;
            },
            response: function(response) {
                return response;
            },
            responseError: function(response) {
                if (response.status === 401) {
                    $rootScope.$broadcast('unauthorized');
                    $location.path('/login');
                }
                return response
            }
        };
    }

})();
