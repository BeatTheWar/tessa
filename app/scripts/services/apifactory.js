'use strict';

var APIFactory = function($http, _, API_URL) {
	var apifactory = {};

	apifactory.articlesItem = [];

	apifactory.getArticles = function (callback){
		$http.get(API_URL + '/articleinfo').success(function(data) {
            apifactory.articlesItem = data;
            console.log(apifactory.articlesItem);
        });
	};

	apifactory.getAllArticles = function(callback) {
        callback(apifactory.articlesItem);
    };

	return apifactory;
};




var underscore = function() {
    return window._;
};

Application.Services.factory('_', [underscore]);
Application.Services.factory('APIFactory', ['$http', '_', APIFactory]); 