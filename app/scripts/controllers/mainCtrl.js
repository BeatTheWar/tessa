'use strict';

var MainCtrl = function($scope, APIFactory, $location) {
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

	$scope.goToSearch = function(){
		$location.path = '/search';
	}

};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory','$location', MainCtrl]);
