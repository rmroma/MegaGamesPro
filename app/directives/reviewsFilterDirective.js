'use strict';

define(['app', 'services/customersService', 'services/reviewsService'], function (app) {

    var reviewsFilterDirective = function (customersService, reviewsService) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/reviewsFilter.html",
            scope: {
                filters : "="
            },
            link: function (scope, element, attrs) {

                scope.filterCatalog = function (itemToFilter) {
                    reviewsService.filteredIndex(itemToFilter);
                }
            }
        }
    };

    app.directive('reviewsFilterDirective', ['customersService', 'reviewsService', reviewsFilterDirective]);
});