(function() {
    'use strict';

    var detailSolutionCtrl = function($scope, APIFactory, $location, $stateParams, $filter) {
        console.log('detailSolutionCtrl');
        $scope.allproduct = [];
        $scope.hardware_category = [];
        $scope.hardwarecategories = [];
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

        console.log('$stateParams:', $stateParams.selected_id);
        if ($stateParams.selected_id) {
            APIFactory.getDetailSolution($stateParams.selected_id, function(err, data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.details = data.response.result;
                    $scope.products = $scope.details.products;
                    console.log('$scope.products:', $scope.products);
                    $scope.productDetails = _.map($scope.products, function(row) {
                        return row.product_detail;
                    });
                    console.log('$scope.details:', $scope.details);
                    console.log('$scope.productDetails:', $scope.productDetails);
                    $scope.services = $filter('filter')($scope.productDetails, { 'productType_id': 16 });
                    $scope.hardware = $filter('filter')($scope.productDetails, { 'productType_id': 17 });
                    $scope.software = $filter('filter')($scope.productDetails, { 'productType_id': 18 });
                    console.log('$scope.hardware:', $scope.hardware);
                    
                    $scope.hardwares = _.map(_.uniqBy($scope.hardware, 'p_id'), function(row) {
                        return row.p_id;
                    });
                    console.log('$scope.hardwares :', $scope.hardwares);
                    _.each($scope.hardwares, function(row) {
                        _.find($scope.allproduct, function(o) {
                            if (row == o.p_id) {
                                if (o.product_category.length > 0) {
                                    $scope.hardware_category.push(o.product_category[0]);
                                }
                            }
                        });
                    });
                    console.log('$scope.hardware_category:', $scope.hardware_category);
                    var sam = _.map($scope.hardware_category, function(row) {
                        return row.category_id;
                    });
                    _.each(sam, function(row) {
                        _.find($scope.allcategory, function(o) {
                            if (row == o.c_id) {
                                $scope.hardwarecategories.push(o);
                            }
                        })
                    });
                    console.log('$scope.hardwarecategories:', $scope.hardwarecategories);
                }
            });
        }
    };

    Application.Controllers.controller('detailSolutionCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', detailSolutionCtrl]);

})();
