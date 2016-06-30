(function() {
    'use strict';

    var detailSolutionCtrl = function($scope, APIFactory, $location, $stateParams, $filter, _) {
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
        if ($stateParams.selected_id) {
            APIFactory.getDetailSolution($stateParams.selected_id, function(err, data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.details = data.response.result;

                    console.log('details', $scope.details);

                    $scope.products = $scope.details.products;
                    $scope.productDetails = _.map($scope.products, function(row) {
                        return row.product_detail;
                    });

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
                    $scope.sams = [];
                    console.log('$scope.hardware_category:', $scope.hardware_category);
                    _.each($scope.hardware_category, function(row) {
                        _.find($scope.allproduct, function(o) {
                            if (row.product_id == o.p_id) {
                                $scope.sams.push(o);
                            }
                        });
                    });
                    var sam = _.map($scope.hardware_category, function(row) {
                        return row.category_id;
                    });
                    console.log('sam:', sam);
                    _.each(sam, function(row) {
                        _.find($scope.allcategory, function(o) {
                            if (row == o.c_id) {
                                $scope.hardwarecategories.push(o);
                            }
                        })
                    });
                    _.each($scope.hardwarecategories, function(row) {
                        _.find($scope.hardware_category, function(o) {
                            if (row.c_id == o.category_id) {
                                row.product_id = o.product_id;
                            }
                        });
                    });

                    _.each($scope.hardwarecategories, function(row) {
                        _.find($scope.allproduct, function(o) {
                            if (row.product_id == o.p_id) {
                                row.products = o;
                            }
                        });
                    });

                    $scope.price = [];
                    $scope.price = _.map($scope.hardwarecategories, function(value){
                        return value.products.sell_price;
                    })        

                    var sum = $scope.price.reduce(add, 0);
                    function add(a, b) {
                        return a + b;
                    }

                    $scope.upfront = _.reduce($scope.price);
                    console.log('pricing', $scope.price);
                    console.log('upfront', sum);


                    // $scope.totalUpfront = _.map($scope.hardwarecategories, function(row){
                    //      _.map(row.products, function(d){
                    //         console.log('price', d.sell_price);
                    //     });
                    // })    
                    // $scope.totalUpfront = $scope.hardwarecategories.products.sell_price;
                    console.log('$scope.hardwarecategories:', $scope.hardwarecategories);
                }
            });
        }
    };

    Application.Controllers.controller('detailSolutionCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', '_', detailSolutionCtrl]);

})();
