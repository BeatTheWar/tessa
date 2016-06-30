'use strict';

var solutionTypes = 'EzeImpress';

var productCtrl = function($scope, APIFactory, $location, $filter, _) {
    $scope.solutionTypes = solutionTypes;

    $scope.apply = 'EzeImpress';

    APIFactory.getProductBundle(function(data) {
        $scope.products = data.response.result;
        console.log('Product Bundle:', $scope.products);
        // $scope.myMedia = $scope.articlesList.mediaFiles;
    });

    $scope.solutionTypes = function(status) {
        $scope.apply = status;
        if (status === 'EzeImpress') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeImpress' });
            } else if (status === 'EzeFind') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeFind' });
            } else if (status == 'EzeOrda') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeOrda' });
            } else if (status == 'EzeWifi') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeWifi' });
            } else if (status == 'EzeComms') {
                $scope.product = $filter('filter')($scope.products, { 'bundle_code': 'EzeComms' });
        }};

    APIFactory.getProduct(function(err, data) {
        $scope.products = data.response.result;
        $scope.hardware = _.filter($scope.products, function(item){
          return item.product_type === 'Hardware';
        });
        console.log('Hardware',$scope.hardware);

        $scope.prodCateg= [];

        for (var i=0; i< $scope.hardware.length; i++) { 
           for (var j=0; j < $scope.hardware[i].product_category.length; j++) { 
                $scope.prodCateg.push($scope.hardware[i].product_category[j]);
           }
        }

        $scope.categID = _.uniq(_.map($scope.prodCateg, 'category_id'));
        console.log('IDS', $scope.categID);

    });

        APIFactory.getCategory(function(err, data){
            $scope.allCategs = data.response.result;
            console.log('All Category', $scope.allCategs);

            $scope.allCategID = _.uniq(_.map($scope.allCategs, 'c_id'));
            console.log('All Category IDS', $scope.allCategID);
        });



};

Application.Controllers.controller('productCtrl', ['$scope', 'APIFactory', '$location', '$filter','_', productCtrl]);

