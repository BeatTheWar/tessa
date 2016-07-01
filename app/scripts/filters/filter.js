(function() {
    'use strict';

    var duplicates = function(_) {
        return function (arr, field) {
            return _.uniqBy(arr, function(a) { return a[field]; });
        };
    }
    angular.module('tessaApp')
        .filter('duplicates', ['_', duplicates]);

})();
