'use strict';

var MainCtrl = function($scope, APIFactory, $location) {
    APIFactory.getArticles(function(data) {
        $scope.tags = [];
        $scope.articlesList = data.response.result;

        for (var i = 0; i < $scope.articlesList.length; i++) {
            for (var d = 0; d < $scope.articlesList[d].tags.length; d++) {
                $scope.tags.push($scope.articlesList[i].tags[d]);
            }
        };
        $scope.myTags = _.uniqBy($scope.tags, function(row){
            return row.tags;
        });

    });

    $scope.select = function(selected) {
        $scope.selected = [];
        $scope.selected = selected;
        // console.log('selected:', $scope.selected);
        // console.log('selected id:', $scope.selected.article_id);
    }

    $scope.goToSearch = function() {
        $location.path = '/search';
    }

    APIFactory.getProductBundle(function(data) {
        $scope.lists = data.response.result;
    });

    // APIFactory.getAllTags(function(err, data) {
    //     $scope.tags = data.response.result;
    //     console.log('tags', $scope.tags);
    // });

};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory', '$location', MainCtrl]);
