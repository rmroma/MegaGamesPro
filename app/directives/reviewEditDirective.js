'use strict';

define(['app', 'services/reviewsService', 'services/gamesService', 'services/authService'], function (app) {

    var reviewEditDirective = function (reviewsService, gamesService, authService, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/reviewCreate.html",
            scope: {
                review: '=',
                realreview: '='
            },
            link: function (scope) {
                scope.edit = 'Edit';
                scope.page = {pageNumber : 1, itemsPerPage: 5};

                gamesService.filteredIndex([], scope.page).then(function(res){
                    scope.games = res;
                    console.log(scope.games);
                });

                scope.createReview = function (review) {
                    reviewsService.updateReview(review);
                    scope.realreview = review;
                }

                scope.isLoggedIn = authService.isLoggedIn();
            }
        }
    };

    app.directive('reviewEditDirective', ['reviewsService', 'gamesService', 'authService', '$rootScope', reviewEditDirective]);
});