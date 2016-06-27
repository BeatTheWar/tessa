'use strict';

var MainCtrl = function($scope, APIFactory) {
	$scope.message="Success Stor adfasdfdy";

	APIFactory.getAllArticles(function(data){
		$scope.articlesList = data;
		console.log($scope.articlesList);
	}); 

};

Application.Controllers.controller('MainCtrl', ['$scope', 'APIFactory', MainCtrl]);
