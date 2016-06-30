(function() {
    'use strict';

    var detailSolutionCtrl = function($scope, APIFactory, $location, $stateParams, $filter, _) {
        console.log('detailSolutionCtrl');
        $scope.allproduct = [];
        $scope.hardware_category = [];
        $scope.service_category = [];
        $scope.hardwarecategories = [];
        $scope.servicecategories = [];
        $scope.service = [];
        $scope.hardwares = [];
        APIFactory.getProduct(function(err, data) {
            $scope.allproduct = data.response.result;
            console.log('$scope.allproduct:', $scope.allproduct);
            // $scope.allproduct = _.map(data.response.result, function(row) {
            //     return row.p_id;
            // });
            // console.log('$scope.allproduct:', data.response.result);
            // console.log('$scope.allproduct:', $scope.allproduct);

            // _.each($scope.allproduct, function(row) {
            //     var category = _.find(data.response.result, function(el) {
            //         if (row = el.p_id) {
            //             console.log('category: ', el.product_category);
            //             return el.product_category;
            //         }
            //     });
            // });
        });
        APIFactory.getCategory(function(err, data) {
            $scope.allcategory = data.response.result;
            console.log('$scope.allcategory:', $scope.allcategory);
        });
        if ($stateParams.selected_id) {
            APIFactory.getDetailSolution($stateParams.selected_id, function(err, data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.details = data.response.result;

                    console.log('details', $scope.details);

                    $scope.products = $scope.details.products;
                    console.log('$scope.products:', $scope.products);
                    $scope.productDetails = _.map($scope.products, function(row) {
                        return row.product_detail;
                    });
                    $scope.services = $filter('filter')($scope.productDetails, { 'productType_id': 20 });
                    $scope.hardware = $filter('filter')($scope.productDetails, { 'productType_id': 17 });
                    $scope.software = $filter('filter')($scope.productDetails, { 'productType_id': 18 });
                    $scope.price = [];
                    $scope.sams = [];
                    _.map($scope.hardware, function(row) {
                        if (row.product_category[0] != undefined) {
                            $scope.hardwares.push(row.product_category[0]);
                        }
                    });
                    console.log('$scope.hardwares:', $scope.hardwares);
                    _.each($scope.hardware, function(row) {
                        _.find($scope.hardwares, function(o) {
                            if (row.p_id == o.product_id) {
                                row.category_label = o.category_label;
                            }
                        });
                    });
                    console.log('$scope.hardware:', $scope.hardware);
                    // $scope.price = _.map($scope.hardwarecategories, function(value) {
                    //     return value.products.sell_price;
                    // })
                    // var sum = $scope.price.reduce(add, 0);

                    // function add(a, b) {
                    //     return a + b;
                    // }
                    // $scope.upfront = _.reduce($scope.price);
                    _.map($scope.services, function(row) {
                        if (row.product_category[0] !== undefined)
                            $scope.service.push(row.product_category[0]);
                    });
                    _.each($scope.services, function(row) {
                        _.find($scope.service, function(o) {
                            if (row.p_id == o.product_id) {
                                row.category_id = o.category_id;
                            }
                        });
                    });

                    $scope.deployment = $filter('filter')($scope.services, { 'category_id': 87 });
                    $scope.support = $filter('filter')($scope.services, { 'category_id': 90 });
                }
            });
        }
    };

    Application.Controllers.controller('detailSolutionCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', '_', detailSolutionCtrl]);

})();
