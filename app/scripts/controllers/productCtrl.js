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

        $scope.me = 'all';
        $scope.activateTab = function(name){
            $scope.me = name;
        }

        $scope.isCateg = function(q){
            console.log($scope.me);
            if($scope.me == 'all'){
                return true;
            }else if($scope.me == q.category_label){
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
    });

};

Application.Controllers.controller('productCtrl', ['$scope', 'APIFactory', '$location', '$filter', '_', productCtrl]);
