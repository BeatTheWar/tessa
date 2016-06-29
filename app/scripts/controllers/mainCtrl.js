'use strict';

var MainCtrl = function($scope, APIFactory, $location) {
    APIFactory.getArticles(function(data) {
        $scope.articlesList = [];
        $scope.tagsss = [];
        $scope.articlesList = data.response.result;
        console.log('artcles', $scope.articlesList);
        // $scope.myMedia = $scope.articlesList.mediaFiles;
        $scope.tagsss = _.map($scope.articlesList, function(row) {
            return row.tags[0];
        });
        // console.log('$scope.tagsss:', $scope.tagsss);
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

    APIFactory.getAllTags(function(err, data) {
        $scope.tags = data.response.result;
    });

};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory', '$location', MainCtrl]);
