'use strict';

define(['app', 'services/gamesService', 'services/reviewsService', 'services/authService'], function (app) {

    var reviewCreateDirective = function (gamesService, reviewsService, authService, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/reviewCreate.html",
            scope: {
                game: '=',
                filters: '='
            },

            link: function (scope, element, attrs) {
                scope.page = {pageNumber : 1, itemsPerPage: 5};

                scope.getGames = function(){
                    gamesService.filteredIndex([], scope.page).then(function(res){
                        scope.games = res;
                        console.log(scope.games);

                        if (scope.game != undefined) {
                            scope.games = scope.games.filter(function (game) {
                                return game.gameName == scope.game.gameName;
                            });

                            scope.selectDisabled = true;
                        }
                        scope.review = {};
                        scope.review.gameName = scope.games[0].gameName;
                    });
                };

                scope.getGames();

                scope.createReview = function (review) {
                    reviewsService.insertReview(review);
                    if (scope.filters != undefined) {
                        reviewsService.filteredIndexNoParams([]).then(function (res) {
                            scope.filters.result = res;
                        });
                    }

                }

                scope.isLoggedIn = authService.isLoggedIn();
            }
        }
    };

    app.directive('reviewCreateDirective', ['gamesService', 'reviewsService', 'authService', '$rootScope', reviewCreateDirective]);
});