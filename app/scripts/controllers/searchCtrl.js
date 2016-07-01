(function() {

    'use strict';


    var searchCtrl = function($scope, APIFactory, $location, $stateParams, $filter, _) {
    	console.log('searchCtrl: ',$stateParams);

    	
    }

    angular.module('tessaApp')
        .controller('searchCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', '_', searchCtrl]);


})();

