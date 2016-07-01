(function() {
    'use strict';
var MainCtrl = function($scope, APIFactory, $location, _) {
    APIFactory.getArticles(function(data) {
        $scope.tags = [];
        $scope.items = [];
        $scope.articlesList = data.response.result;
        $scope.selectedTag = [];
        for (var i = 0; i < $scope.articlesList.length; i++) {
            for (var d = 0; d < $scope.articlesList[d].tags.length; d++) {
                if($scope.articlesList[i].tags[d]){
                    $scope.tags.push($scope.articlesList[i].tags[d]);
                }
            }
        };
        console.log('$scope.tags:', $scope.tags);
    });

    $scope.select = function(selected, index) {
        $scope.selected = [];
        $scope.selected = selected;
        $scope.selectedindex = index;
        console.log('selected:', $scope.selected);
        // console.log('selected id:', $scope.selected.article_id);
    }

    $scope.tagselected = [];
    $scope.toggleSelectedTag = function(tag){
        if($scope.tagselected.indexOf(tag) == -1){
            $scope.tagselected.push(tag);
        } 
        else {
            $scope.tagselected = _.pull($scope.tagselected, tag);
        }
    };
    $scope.isTagSelected = function(tag){
        return $scope.tagselected.indexOf(tag) !== -1;
    };
    $scope.isOnSelectedTag = function(){
        return function(item){
            if($scope.tagselected.length == 0){
                return true;
            }

            var flag = false;
            var tagselectedIDs = _.map($scope.tagselected, 'tags_id');
            console.log(item.title);
            _.forEach(item.tags, function(tag){
                if(tagselectedIDs.indexOf(tag.tags_id) !== -1){
                    flag = true;
                }
            });
            return flag;
        };
    };

    APIFactory.getProductBundle(function(data) {
        $scope.lists = data.response.result;
    });

    $scope.articlesListFiltered = {};
    $scope.previousArticle = function(){
        if($scope.selectedindex == 0){
            $scope.selectedindex = $scope.articlesListFiltered.length - 1;
        } else {
            --$scope.selectedindex;
        }
        $scope.selected = $scope.articlesListFiltered[$scope.selectedindex];
    };
    $scope.nextArticle = function(){
        if($scope.selectedindex == $scope.articlesListFiltered.length - 1){
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
        .controller('MainCtrl', ['$scope', 'APIFactory', '$location','_', MainCtrl]);
})();
