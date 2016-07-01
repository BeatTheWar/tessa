(function() {
    'use strict';

    var hardwareDetailsCtrl = function($scope, APIFactory, $location, $stateParams, $filter, _) {
    	console.log('hardwareDetailsCtrl');
    	if ($stateParams.selected_id) {
            APIFactory.getProductDetail($stateParams.selected_id, function(err, data) {
            	 if (data.statusCode == 200 && data.response.success) {
            			$scope.productDetails = data.response.result;
            	 }
		            	console.log('Details',$scope.productDetails);
            });
        };
    }

    angular.module('tessaApp')
        .controller('hardwareDetailsCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', '_', hardwareDetailsCtrl]);

})();
