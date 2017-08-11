'use strict';

define(['app', 'services/reviewsService'], function (app) {

    var reviewRemoveDirective = function (reviewsService, $location) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/reviews/reviewDelete.html",
            scope: {
                review: '='
            },
            link: function (scope) {

                scope.deleteReview = function (review) {
                    reviewsService.deleteReview(review);
                    $location.path("/reviews/");
                }
            }
        }
    };

    app.directive('reviewRemoveDirective', ['reviewsService', '$location',reviewRemoveDirective]);
});