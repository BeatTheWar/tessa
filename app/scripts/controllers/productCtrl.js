(function() {
    'use strict';

    var productCtrl = function($scope, APIFactory, $location, $filter) {
        console.log('productCtrl');

        $scope.apply = '';

        APIFactory.getProductBundle(function(data) {

            $scope.products = data.response.result;
            // $scope.myMedia = $scope.articlesList.mediaFiles;
            

        });

        $scope.solutionTypes = function(status) {
            $scope.product = [];
            $scope.apply = status;
            if (status === 'EzeImpress') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeImpress' });
            } else if (status === 'EzeFind') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeFind' });
            } else if (status == 'EzeOrda') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeOrda' });
            } else if (status == 'EzeWifi') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeWifi' });
            }
            else if (status == 'EzeComms') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeComms' });
            }
            
        };


    };

    Application.Controllers.controller('productCtrl', ['$scope', 'APIFactory', '$location', '$filter', productCtrl]);

})();
