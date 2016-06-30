'use strict';

var duplicates = function(){
    return function (arr, field) {
        return _.uniq(arr, function(a) { return a[field]; });
	};
}

Application.Filters.filter('duplicates', duplicates);
