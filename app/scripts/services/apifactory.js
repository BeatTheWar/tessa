'use strict';

var APIFactory = function($http, _, API_URL, API_VERSION, Restangular) {
	var apifactory = {};
	apifactory.articleItems = [];

	apifactory.getArticles = function (callback){
        Restangular.all('articleinfo').customGET().then(function(results){
            callback(results);
        });
	},
	apifactory.getProductBundle = function(callback){
		Restangular.all('product-bundle').customGET().then(function(results){
			callback(results);
		});
	},
	apifactory.getAllArticles = function(callback) {
        callback(apifactory.articleItems);
    };

	return apifactory;
};


var underscore = function() {
    return window._;
};

Application.Services.factory('_', [underscore]);
Application.Services.factory('APIFactory', ['$http', '_', 'API_URL', 'API_VERSION', 'Restangular', APIFactory]); 