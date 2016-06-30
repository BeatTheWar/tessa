'use strict';

var solutionTypes = 'EzeImpress';

var productCtrl = function($scope, APIFactory, $location, $filter, _) {
    $scope.solutionTypes = solutionTypes;

    $scope.apply = '';

    APIFactory.getProductBundle(function(data) {
        $scope.products = data.response.result;
        console.log('Product Bundle:', $scope.products);
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
        $scope.allproducts = data.response.result;
        $scope.hardware = _.filter($scope.allproducts, function(item){
          return item.product_type === 'Hardware';
        });
        console.log('Hardware',$scope.hardware);
        
        $scope.hardwareCopy = angular.copy($scope.hardware);

        $scope.prodCateg= [];

        for (var i=0; i< $scope.hardware.length; i++) { 
           for (var j=0; j < $scope.hardware[i].product_category.length; j++) { 
                $scope.prodCateg.push($scope.hardware[i].product_category[j]);
           }
        }

        // console.log('prodCateg',$scope.prodCateg);

        _.each($scope.hardware, function(e){
            _.find($scope.prodCateg, function(i){
                if(e.p_id == i.product_id){
                    e.category_id = i.category_id;
                }
            });
        });

        $scope.Screens = $filter('filter')($scope.hardware, { 'category_id': 80 });
        $scope.MediaPlayer = $filter('filter')($scope.hardware, { 'category_id': 83 });

        // $scope.hardwareType = function(status) {
        //     $scope.apply = status;
        //     $scope.hardwares = [];
        //     if (status === 'Screens') { 
        //             $scope.hardwares = $filter('filter')($scope.hardwareCopy, { 'category_id': 80 });
        //         } else if (status === 'MediaPlayer') {
        //             $scope.hardwares = $filter('filter')($scope.hardwareCopy, { 'category_id': 83 });
        //             console.log('MP');
        //             console.log($scope.hardwares, 'ha');
        //         } else {
        //             $scope.hardwares = $scope.hardwares; 
        //         }
        // };

    });

};

Application.Controllers.controller('productCtrl', ['$scope', 'APIFactory', '$location', '$filter','_', productCtrl]);

