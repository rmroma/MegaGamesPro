'use strict';

define (['app'], function (app){

    var reviewsService = function ($http, $q) {
        var serviceBase = '/api/dataservice/',
            review = null,
            reviewsFactory = {};

        reviewsFactory.getReviews = function (pageIndex, pageSize) {
            return $http.get(serviceBase + 'reviews').then(function (response){
                var reviews = response.data;

                return {
                    totalRecords: parseInt(response.headers('X-InlineCount')),
                    results: reviews
                };
            });
        };

        reviewsFactory.filteredIndex = function (review, page) {
            return $http.get(serviceBase + 'reviewByFilters/', {
                params: {
                    gameName: review.gameName,
                    score: review.score,
                    title: review.title,
                    pageNumber: page.pageNumber,
                    itemsPerPage: page.itemsPerPage
                }
            }).then(function (results) {
                review.id = results.data.id;
                return results.data;
            });
        };

        reviewsFactory.filteredIndexNoParams = function (review) {
            return $http.get(serviceBase + 'reviewByFilters/', {}).
            then(function (results) {
                review.id = results.data.id;
                return results.data;
            });
        };

        reviewsFactory.insertReview = function (review) {
            var d = new Date();

            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDay();

            review.date = day + '/' + month + '/' + year;
            return $http.post(serviceBase + 'PostGameReview', review).then(function (results){
                review.id = results.data.id;
                return results.data;
            });
        };

        reviewsFactory.updateReview = function (review) {
            return $http.put(serviceBase + 'PutGameReview/' + review.id, review).then(function (status){
                return status.data;
            });
        };

        reviewsFactory.groupByScore = function (gameName) {
            return $http.get(serviceBase + 'groupByScore/' + gameName).then(function (status){
                return status.data;
            });
        };

        reviewsFactory.averageScore = function (gameName) {
            return $http.get(serviceBase + 'averageScore/' + gameName).then(function (status){
                return status.data;
            });
        };

        reviewsFactory.deleteReview = function (review) {
            return $http.get(serviceBase + 'deleteReview/' + review.id, review).then(function (status){
                return status.data;
            });
        };

        reviewsFactory.getReview = function (id) {
            return $http.get(serviceBase + 'Review/' + id).then(function (results){
                return results.data;
            });
        };

        return reviewsFactory;

    };

    app.factory('reviewsService', ['$http', '$q', reviewsService]);

});
