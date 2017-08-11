'use strict';

define(['app', 'services/gamesService', 'services/reviewsService'], function (app) {

    var catalogDetailsController = function ($scope, gamesService, reviewsService, $rootScope) {
        // Get game by id (which is name)
        $scope.game = $rootScope.params.game;
        $scope.tempGame = angular.copy($scope.game);

        reviewsService.averageScore($rootScope.params.game.gameName).then(function (res) {
            if (res) {
                $scope.game.score = Math.round(res);
            } else {
                $scope.game.score = "-";
            }
        });
    };

    app.register.controller('CatalogDetailsController', ['$scope', 'gamesService', 'reviewsService', '$rootScope', catalogDetailsController]);

});