'use strict';

define(['app', 'services/customersService', 'services/reviewsService'], function (app) {

    var reviewsTableDirective = function (customersService, gamesService) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/reviewsTable.html",
            scope: {
                filters : "="
            },
            link: function (scope, element, attrs) {
                console.log('result table loaded');
            }
        }
    };

    app.directive('reviewsTableDirective', ['customersService', 'reviewsService', reviewsTableDirective]);
});