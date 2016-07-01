(function () {
    'use strict';

    var APIFactory = function ($http, _, API_URL, API_VERSION, Restangular) {
        var apifactory = {};
        apifactory.articleItems = [];

        apifactory.getArticles = function (callback) {
            Restangular.all('articleinfo').customGET().then(function (results) {
                callback(results);
            });
        };

        apifactory.getProductBundle = function (callback) {
            Restangular.all('product-bundle').customGET().then(function (results) {
                callback(results);
            });
        };

        apifactory.getAllTags = function(callback) {
            Restangular.all('tags').customGET().then(function(results) {
                callback(results);
            });
        };

        apifactory.getDetailSolution = function(id, callback) {
            Restangular.all('product-bundle/' + id).customGET().then(function(results) {
                callback(null, results);
            },
            function(err) {
                    callback(err, null);

            });
        };

        apifactory.getProductDetail = function (id, callback) {
            Restangular.all('product/' + id).customGET().then(function (results) {
                    callback(null, results);
                },
                function (err) {
                    callback(err, null);
                });
        };



        apifactory.getProduct = function(callback) {
            Restangular.all('product').customGET().then(function(results) {

                    callback(null, results);
                },
                function (err) {
                    callback(err, null);
                });
        };

        apifactory.getHardware = function (id, callback) {
            Restangular.all('product').customGET().then(function (results) {
                callback(_.filter(results), {productType_id: id});
            });
        };

        apifactory.getCategory = function (callback) {
            Restangular.all('categories').customGET().then(function (results) {
                    callback(null, results);
                },
                function (err) {
                    callback(err, null);
                });
        };
        apifactory.getProductType = function(callback) {
            Restangular.all('producttype').customGET().then(function(results) {
                    callback(null, results);
                },
                function(err) {
                    callback(err, null);
                });
        }

        return apifactory;
    };




    angular.module('tessaApp')
        .factory('APIFactory', ['$http', '_', 'API_URL', 'API_VERSION', 'Restangular', APIFactory]);
})();
