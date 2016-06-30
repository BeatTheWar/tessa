(function() {
    'use strict';

    var detailSolutionCtrl = function($scope, APIFactory, $location, $stateParams, $filter) {
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
        });
        APIFactory.getCategory(function(err, data) {
            $scope.allcategory = data.response.result;
            console.log('$scope.allcategory:', $scope.allcategory);
        });
        if ($stateParams.selected_id) {
            APIFactory.getDetailSolution($stateParams.selected_id, function(err, data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.details = data.response.result;
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
                    // _.each($scope.hardwares, function(row) {
                    //     _.find($scope.allproduct, function(o) {
                    //         if (row == o.p_id) {
                    //             if (o.product_category.length > 0) {
                    //                 $scope.hardware_category.push(o.product_category[0]);
                    //             }
                    //         }
                    //     });
                    // });
                    // var sam = _.map($scope.hardware_category, function(row) {
                    //     return row.category_id;
                    // });
                    // _.each(sam, function(row) {
                    //     _.find($scope.allcategory, function(o) {
                    //         if (row == o.c_id) {
                    //             $scope.hardwarecategories.push(o);
                    //         }
                    //     })
                    // });
                    // _.each($scope.hardwarecategories, function(row) {
                    //     _.find($scope.hardware_category, function(o) {
                    //         if (row.c_id == o.category_id) {
                    //             row.product_id = o.product_id;
                    //         }
                    //     });
                    // });
                    // _.each($scope.hardwarecategories, function(row) {
                    //     _.find($scope.allproduct, function(o) {
                    //         if (row.product_id == o.p_id) {
                    //             row.products = o;
                    //         }
                    //     });
                    // });
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

    Application.Controllers.controller('detailSolutionCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', detailSolutionCtrl]);

})();
