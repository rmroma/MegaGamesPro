'use strict';

define(['app', 'services/reviewsService'], function (app) {

    var pieChartDirective = function (reviewsService) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/pieChart.html",
            scope: {
                game: "="
            },
            link: function (scope, element, attrs) {
                reviewsService.groupByScore(scope.game.gameName).then(function(res){
                    scope.reviews = {great:0, good:0, bad:0};

                    _.each(res, function(item){
                        if(item._id >= 80 && item._id <= 100)
                            scope.reviews.great += item.count;

                        if(item._id >= 60 && item._id < 80)
                            scope.reviews.good += item.count;

                        if(item._id >= 0 && item._id < 60)
                            scope.reviews.bad += item.count;
                    });

                    var pie = new d3pie("myPie", {
                        header: {
                            title: {
                                text: "Game reviews:"
                            }
                        },
                        data: {
                            content: [
                                { label: "Bad", value: +scope.reviews.bad, color: "#bf0000" },
                                { label: "Good", value: +scope.reviews.good, color: "#CC6633" },
                                { label: "Great", value: +scope.reviews.great, color: "#2B7558" },
                            ]
                        }, size: {
                            canvasHeight: 350,
                            canvasWidth: 350,
                            pieInnerRadius: 12,
                            pieOuterRadius: null
                        }
                    });
                });
            }
        }
    };

    app.directive('pieChartDirective', ['reviewsService', pieChartDirective]);
});