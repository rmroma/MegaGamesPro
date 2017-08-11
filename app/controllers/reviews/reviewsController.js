'use strict';

define(['app', 'services/reviewsService', 'services/gamesService'], function (app) {

    var reviewsController = function ($scope, reviewsService, gamesService) {
        $scope.filters = {};
        $scope.filters.result = {};
        $scope.filters.type = "reviews";

        $scope.page = {pageNumber : 1, itemsPerPage: 5};

        gamesService.filteredIndex([], $scope.page).then(function(res){
            $scope.games = res;
            console.log($scope.games);
        });

    };

    app.register.controller('ReviewsController',
        ['$scope', 'reviewsService', 'gamesService', reviewsController]);
});