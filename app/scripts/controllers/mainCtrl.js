(function() {
    'use strict';
    var MainCtrl = function($scope, APIFactory, $location, _, $state) {
        console.log('MainCtrl: ');


        async.waterfall([
            function(callback) {
                APIFactory.getArticles(function(data) {
                    $scope.articlesList = [];
                    $scope.tags = [];
                    $scope.items = [];
                    $scope.lists = [];

                    $scope.articlesList = data.response.result;
                    _.each(data.response.result, function(row) {
                        row.type = 'Experience';
                    });
                    _.each(data.response.result, function(row) {
                        row.name = row.title;
                    });
                    callback(null, data.response.result);
                    $scope.selectedTag = [];
                    for (var i = 0; i < $scope.articlesList.length; i++) {
                        for (var d = 0; d < $scope.articlesList[d].tags.length; d++) {
                            if ($scope.articlesList[i].tags[d]) {
                                $scope.tags.push($scope.articlesList[i].tags[d]);
                            }
                        }
                    };
                });

            },
            function(articles, callback) {
                APIFactory.getProductBundle(function(data) {
                    $scope.lists = data.response.result;
                    _.each(data.response.result, function(row) {
                        row.type = 'Solutions';
                    });
                    _.each(data.response.result, function(row) {
                        row.name = row.bundle_name;
                    });
                    callback(null, data.response.result, articles);
                    // _.each($scope.lists, function(row) {
                    //     row.articlesList = $scope.articlesList;
                    // });

                });
            },
            function(bundle, articles, callback) {
                $scope.products = [];

                console.log('bundle:', bundle);
                console.log('articles:', articles);
                APIFactory.getProduct(function(err, data) {
                    $scope.products = data.response.result;
                    _.each(data.response.result, function(row) {
                        row.type = 'Hardware';
                    });
                    _.each(data.response.result, function(row) {
                        row.name = row.item_name;
                    });
                    callback(null, data.response.result, bundle, articles)
                });
            },
            function(products, bundle, articles, callback) {
                console.log('products:', products);
                console.log('bundle:', bundle);
                console.log('articles:', articles);
                $scope.allSearch = [];
                _.each(products, function(row) {
                    $scope.allSearch.push(row);
                });
                _.each(bundle, function(row) {
                    $scope.allSearch.push(row);
                });
                _.each(articles, function(row) {
                    $scope.allSearch.push(row);
                });
                console.log('$scope.allSearch:', $scope.allSearch);
            }
        ]);
        $scope.select = function(selected, index) {
            $scope.selected = [];
            $scope.selected = selected;
            $scope.selectedindex = index;
            console.log('selected:', $scope.selected);
            // console.log('selected id:', $scope.selected.article_id);
        }

        $scope.tagselected = [];
        $scope.toggleSelectedTag = function(tag) {
            if ($scope.tagselected.indexOf(tag) == -1) {
                $scope.tagselected.push(tag);
            } else {
                $scope.tagselected = _.pull($scope.tagselected, tag);
            }
        };

        $scope.isTagSelected = function(tag) {
            return $scope.tagselected.indexOf(tag) !== -1;
        };
        $scope.isOnSelectedTag = function() {
            return function(item) {
                if ($scope.tagselected.length == 0) {
                    return true;
                }

                var flag = false;
                var tagselectedIDs = _.map($scope.tagselected, 'tags_id');
                console.log(item.title);
                _.forEach(item.tags, function(tag) {
                    if (tagselectedIDs.indexOf(tag.tags_id) !== -1) {
                        flag = true;
                    }
                });
                return flag;
            };
        };

        $scope.someGroupFn = function(item) {
            _.each($scope.productType, function(row) {
                if (item.product_type == row.name) {

                    return row.name;
                }
            });
        };

        $scope.seachValue = function(value) {
            if (value.type == 'Solutions') {
                $state.go('productDetailsSolution', {selected_id: value.pb_id }, { reload: true });
            } else if (value.type == 'Hardware') {
                $state.go('productDetailsHardware', {selected_id: value.p_id }, { reload: true });
            } else if (value.type == 'Experience') {
                $state.go('search', { value: value.p_id }, { reload: true });
            }

        };

        $scope.articlesListFiltered = {};
        $scope.previousArticle = function() {
            if ($scope.selectedindex == 0) {
                $scope.selectedindex = $scope.articlesListFiltered.length - 1;
            } else {
                --$scope.selectedindex;
            }
            $scope.selected = $scope.articlesListFiltered[$scope.selectedindex];
        };
        $scope.nextArticle = function() {
            if ($scope.selectedindex == $scope.articlesListFiltered.length - 1) {
                $scope.selectedindex = 0;
            } else {
                ++$scope.selectedindex;
            }
            $scope.selected = $scope.articlesListFiltered[$scope.selectedindex];
        };

        // APIFactory.getAllTags(function(err, data) {
        //     $scope.tags = data.response.result;
        //     console.log('tags', $scope.tags);
        // });
    };

    angular.module('tessaApp')
        .controller('MainCtrl', ['$scope', 'APIFactory', '$location', '_', '$state', MainCtrl]);
})();
