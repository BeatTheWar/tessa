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
        $scope.softwares = [];
        APIFactory.getProduct(function(err, data) {
            $scope.allproduct = data.response.result;
        });
        APIFactory.getCategory(function(err, data) {
            $scope.allcategory = data.response.result;
        });
        if ($stateParams.selected_id) {
            APIFactory.getDetailSolution($stateParams.selected_id, function(err, data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.details = data.response.result;
                    $scope.products = $scope.details.products;
                    $scope.productDetails = _.map($scope.products, function(row) {
                        return row.product_detail;
                    });
                    $scope.services = $filter('filter')($scope.productDetails, { 'productType_id': 20 });
                    $scope.hardware = $filter('filter')($scope.productDetails, { 'productType_id': 17 });
                    $scope.software = $filter('filter')($scope.productDetails, { 'productType_id': 18 });

                    console.log('software', $scope.software)

                    $scope.softwarePrice = _.map($scope.software, function(value) {
                        return value.sell_price
                    })

                    $scope.swPrice = _.sum($scope.softwarePrice);
                    console.log('softwarePrice', $scope.swPrice);


                    $scope.price = [];
                    $scope.sams = [];
                    _.map($scope.software, function(row) {
                        if (row.product_category[0] != undefined) {
                            $scope.softwares.push(row.product_category[0]);
                        }
                    });
                    _.each($scope.software, function(row) {
                        _.find($scope.softwares, function(o) {
                            if (row.p_id == o.product_id) {
                                row.category_label = o.category_label;
                            }
                        });
                    });

                    console.log('$scope.software:', $scope.software);
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

                    console.log('$scope.deployment', $scope.deployment);
                    console.log('$scope.support', $scope.support);

                    $scope.hardwarePrice = _.map($scope.hardware, function(value) {
                        return value.sell_price;
                    })

                    $scope.hwPrice = _.sum($scope.hardwarePrice);
                    console.log('HardwarePrice', $scope.hwPrice);

                    $scope.deploymentPrice = _.map($scope.deployment, function(value) {
                        return value.sell_price;
                    })

                    $scope.dPrice = _.sum($scope.deploymentPrice);
                    console.log('deploymentPrice', $scope.dPrice);

                    $scope.supportPrice = _.map($scope.support, function(value) {
                        return value.sell_price;
                    })

                    $scope.spPrice = _.sum($scope.supportPrice);
                    console.log('supportPrice', $scope.spPrice);


                    // console.log('swPrice', $scope.softwarePrice);
                    // console.log('hpPrice', $scope.hardwarePrice);
                    // console.log('dpPrice', $scope.deploymentPrice);
                    // console.log('supportPrice', $scope.supportPrice);

                }
            });
        }


    };

    angular.module('tessaApp')
        .controller('detailSolutionCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', '$filter', '_', detailSolutionCtrl]);

})();
