(function() {
    'use strict';

    var detailSolutionCtrl = function($scope, APIFactory, $location, $stateParams, $filter) {
        console.log('detailSolutionCtrl');

        console.log('$stateParams:', $stateParams.selected_id);
        if ($stateParams.selected_id) {
            APIFactory.getDetailSolution($stateParams.selected_id, function(err, data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.details = data.response.result;
                    console.log('$scope.details:', $scope.details);
                    $scope.products = $scope.details.products;
                    console.log('$scope.helhehe:', $scope.products);
                    $scope.productDetails = _.map($scope.products, function(row){
                        return row.product_detail;
                    });
                    console.log('$scope.details:', $scope.productDetails);
                    $scope.services = $filter('filter')($scope.productDetails, { 'productType_id': 16 });
                    $scope.hardware = $filter('filter')($scope.productDetails, { 'productType_id': 17 });
                    $scope.software = $filter('filter')($scope.productDetails, { 'productType_id': 18 });

                    console.log('$scope.hardware', $scope.hardware);
                    console.log('$scope.software', $scope.software);
                    console.log('$scope.services', $scope.services);



                }   
            });
        }
    };

    Application.Controllers.controller('detailSolutionCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', detailSolutionCtrl]);

})();
