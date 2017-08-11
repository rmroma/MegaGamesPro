'use strict';

define(['app'], function (app) {

    var reviewDetailsController = function ($scope, reviewsService, $routeParams, $rootScope) {
        // Get game by id
        console.log($rootScope.params.review);

        $scope.review = $rootScope.params.review;
        $scope.tempReview = angular.copy($scope.review);
    };

    app.register.controller('ReviewDetailsController', ['$scope', 'reviewsService', '$routeParams', '$rootScope', reviewDetailsController]);

});