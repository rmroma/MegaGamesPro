'use strict';

define(['app', 'services/gamesService'], function (app) {

    var gameEditDirective = function (gamesService, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/gameCreate.html",
            scope: {
                game: '=',
                realgame: '='
            },
            link: function (scope) {
                scope.edit = 'Edit';

                scope.createGame = function (game) {
                    gamesService.updateGame(game);
                    scope.realgame = game;
                }
            }
        }
    };

    app.directive('gameEditDirective', ['gamesService', '$rootScope',gameEditDirective]);
});