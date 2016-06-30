'use strict';

var duplicates = function(){
    return function (arr, field) {
        return _.uniqBy(arr, function(a) { return a[field]; });
	};
}

Application.Filters.filter('duplicates', duplicates);
