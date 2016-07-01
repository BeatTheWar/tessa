(function() {
    'use strict';

    var hardwareDetailsCtrl = function($scope, APIFactory, $location, $stateParams, $filter, _) {
    	console.log('hardwareDetailsCtrl');
    	if ($stateParams.selected_hardwareId) {
            APIFactory.getProductDetail($stateParams.selected_hardwareId, function(err, data) {
            	$scope.productDetails = data.response.result;
            	console.log('Details',$scope.productDetails);
            });
        };
    }

    angular.module('tessaApp')
        .controller('hardwareDetailsCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', '_', hardwareDetailsCtrl]);

})();
