'use strict';

var MainCtrl = function($scope, APIFactory, $location) {

    APIFactory.getArticles(function(data) {
        // $scope.articlesList = [];
        $scope.articlesList = data.response.result;
        console.log('$scope.articlesList:', $scope.articlesList);
    });

    $scope.select = function(selected) {
        $scope.selected = [];
        $scope.selected = selected;
        console.log('selected:', $scope.selected);
        console.log('selected id:', $scope.selected.article_id);
    }

    $scope.goToSearch = function() {
        $location.path = '/search';
    }

    // APIFactory.getProductBundle(function(data) {
    //     $scope.lists = data.response.result;
    //     console.log('$scope.lists:', $scope.lists);
    // });

    APIFactory.getAllTags(function(err,data){
        $scope.tags = data.response.result;
        console.log('tags', $scope.tags);
    });

};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory', '$location', MainCtrl]);
