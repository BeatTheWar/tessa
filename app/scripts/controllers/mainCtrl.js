'use strict';

var MainCtrl = function($scope, APIFactory) {
	$scope.message="Success Stor adfasdfdy";

	APIFactory.getArticles(function(data){
		$scope.articlesList = data.response.result;
		// $scope.myMedia = $scope.articlesList.mediaFiles;
		console.log($scope.articlesList);

	  	$scope.select = function(selected) {
	      $scope.selected = selected;
	      console.log($scope.selected, 'selected');
	  	}
	}); 



};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory', MainCtrl]);
