'use strict';

var MainCtrl = function($scope, APIFactory) {
	$scope.message="Success Stor adfasdfdy";

	APIFactory.getArticles(function(data){
		$scope.articlesList = data.response.result;
		$scope.myMedia = $scope.articlesList.mediaFiles;
		console.log($scope.articlesList);
	}); 

};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory', MainCtrl]);
