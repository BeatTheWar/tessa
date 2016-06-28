'use strict';

var MainCtrl = function($scope, APIFactory, $location) {
    APIFactory.getArticles(function(data) {
        $scope.articlesList = data.response.result;
        // $scope.myMedia = $scope.articlesList.mediaFiles;
     console.log('Aricle List:',$scope.articlesList);
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
    APIFactory.getProductBundle(function(data) {
        $scope.lists = data.response.result;
        console.log('$scope.lists:', $scope.lists);
    });
   

};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory', '$location', MainCtrl]);
