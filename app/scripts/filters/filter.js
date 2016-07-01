(function() {
    'use strict';

    var duplicates = function(_) {
        return function(arr, field) {
            if (!_.isUndefined(arr)) {
                _.uniqBy(arr, function(a) {
                    if (!_.isUndefined(a)) {
                        if (!_.isUndefined(a[field])) {
                            return a[field];
                        }
                    }
                });
            }
        };
    }
    angular.module('tessaApp')
        .filter('duplicates', ['_', duplicates]);

})();
