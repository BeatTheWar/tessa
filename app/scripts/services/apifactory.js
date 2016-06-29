'use strict';

var APIFactory = function($http, _, API_URL, API_VERSION, Restangular) {
    var apifactory = {};
    apifactory.articleItems = [];

    apifactory.getArticles = function(callback) {
        Restangular.all('articleinfo').customGET().then(function(results) {
            callback(results);
        });
    };

    apifactory.getProductBundle = function(callback) {
        Restangular.all('product-bundle').customGET().then(function(results) {
            callback(results);
        });
    };

    apifactory.getDetailSolution = function(id, callback) {
        Restangular.all('product-bundle/' + id).customGET().then(function(results) {
            callback(null, results);
        }, function(err) {
            callback(err, null);
        });
    };

    apifactory.getAllTags = function(callback) {
        Restangular.all('tags').customGET().then(function(results) {
                callback(null, results);
            },
            function(err) {
               callback(err, null);
            });
    };

    return apifactory;
};


var underscore = function() {
    return window._;
};

Application.Services.factory('_', [underscore]);
Application.Services.factory('APIFactory', ['$http', '_', 'API_URL', 'API_VERSION', 'Restangular', APIFactory]);
