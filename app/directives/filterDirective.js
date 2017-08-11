'use strict';

define(['app', 'services/reviewsService', 'services/gamesService'], function (app) {

    var filterDirective = function (reviewsService, gamesService) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/filter.html",
            scope: {
                filters : "=",
                page: "="
            },
            link: function (scope, element, attrs) {
                scope.inputFilters = {};

                var services = {};
                services['catalog'] = gamesService;
                services['reviews'] = reviewsService;

                scope.filterCatalog = function () {
                    // Get data by filter
                    services[scope.filters.type].filteredIndex(scope.inputFilters, scope.page).then(function(res){
                        scope.filters.result = res;
                    });
                };

                scope.filterReviews = function () {
                    //scope.filters.result = [{id:'1', gameId:'Skyrim', title:'WOW', content:'Amazing game indeed', score:'100', reviewDate:'16/01/2016'}];
                    services[scope.filters.type].filteredIndex(scope.inputFilters, scope.page).then(function(res){
                        scope.filters.result = res;
                    });
                };


                switch(scope.filters.type) {
                    case 'catalog':
                        scope.filterCatalog();
                        break;
                    case 'reviews':
                        scope.filterReviews();
                        break;
                }
            }
        }
    };

    app.directive('filterDirective', ['reviewsService', 'gamesService', filterDirective]);
});