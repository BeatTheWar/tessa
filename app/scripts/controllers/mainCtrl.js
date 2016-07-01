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

    $scope.select = function(selected) {
        $scope.selected = [];
        $scope.selected = selected;
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
                console.log(tagselectedIDs, tag.tags_id, tagselectedIDs.indexOf(tag.tags_id));
                if(tagselectedIDs.indexOf(tag.tags_id) !== -1){
                    flag = true;
                }
            });

            console.log("------------------------------" + flag);
            return flag;
        };
    };
    // $scope.tagsSelected = function(tag) {
    //     console.log('tag :', tag);
    //     if (tag.selected) {
    //         _.each(tag.selected,function(row){
    //             $scope.selectedTag.push(tag.selected);
    //         });
    //         console.log('$scope.selectedTag:', $scope.selectedTag);
    //         if (_.isUndefined(result)) {
    //             tag.tags_id = tag.tags_id;
    //             $scope.selectedTag.push(tags_id);
    //         }
    //         console.log('$scope.selectedTag:', $scope.selectedTag);
    //     }
    //     // else {
    //     //     $scope.selectedTag = _.filter($scope.selectedTag, function(selectedStore) {
    //     //         return selectedStore.tags_id !== tag.tags_id;
    //     //     });
    //     //     console.log('$scope.selectedTag:', $scope.selectedTag);
    //     // }
    // };
    APIFactory.getProductBundle(function(data) {
        $scope.lists = data.response.result;
    });

    // APIFactory.getAllTags(function(err, data) {
    //     $scope.tags = data.response.result;
    //     console.log('tags', $scope.tags);
    // });
};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory', '$location','_', MainCtrl]);
