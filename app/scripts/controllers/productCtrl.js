'use strict';

var solutionTypes = 'EzeImpress';

var productCtrl = function($scope, APIFactory, $location, $filter, _) {
    $scope.solutionTypes = solutionTypes;

    $scope.apply = '';
    $scope.bundles = [];
    APIFactory.getProductBundle(function(data) {
        $scope.products = data.response.result;
        var result = _.map($scope.products, function(row) {
            if (row.product_bundle_category[0] != undefined) {
                $scope.bundles.push(row.product_bundle_category[0]);
            };
        });
        console.log('Products:', $scope.products);

        $scope.bundle = _.uniqBy($scope.bundles, function(row) {
            return row.category_label;
        });
        console.log('$scope.bundle:', $scope.bundle);
        _.each($scope.products, function(row) {
            _.find($scope.bundles, function(row1) {
                if (row.pb_id == row1.bundle_id) {
                    row.category_label = row1.category_label;
                }
            });
        });
        console.log('$scope.products:', $scope.products);

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
        }
    };
        $scope.me = 'all';

        $scope.hello = function(name){
            // if (name === 'Eze Impress') {
            //         $scope.product = $filter('filter')($scope.products, { 'category_label' : name });
            // }
            console.log('name', name);
            $scope.me = name;
        }

        $scope.isCateg = function(q){
            console.log($scope.me);
            if($scope.me == 'all'){
                return true;
            }else if( $scope.me == q.category_label){
                return true;
            }else {
                return false;
            }
        }



    APIFactory.getProduct(function(err, data) {
        $scope.allproducts = data.response.result;
        $scope.hardware = _.filter($scope.allproducts, function(item) {
            return item.product_type === 'Hardware';
        });
        console.log('Hardware', $scope.hardware);

        $scope.hardwareCopy = angular.copy($scope.hardware);

        $scope.prodCateg = [];

        for (var i = 0; i < $scope.hardware.length; i++) {
            for (var j = 0; j < $scope.hardware[i].product_category.length; j++) {
                $scope.prodCateg.push($scope.hardware[i].product_category[j]);
            }
        }

        console.log('qwerty', $scope.prodCateg);

        _.each($scope.hardware, function(e) {
            _.find($scope.prodCateg, function(i) {
                if (e.p_id == i.product_id) {
                    e.category_id = i.category_id;
                }
            });
        });

        $scope.Screens = $filter('filter')($scope.hardware, { 'category_id': 80 });
        $scope.MediaPlayer = $filter('filter')($scope.hardware, { 'category_id': 83 });
        // $scope.Wifi = $filter('filter')($scope.products, { 'category_label': 'Eze Wifi' });
        // $scope.Impress = $filter('filter')($scope.products, { 'category_label': 'Eze Impress' });

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

Application.Controllers.controller('productCtrl', ['$scope', 'APIFactory', '$location', '$filter', '_', productCtrl]);
