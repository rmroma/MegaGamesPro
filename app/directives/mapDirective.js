'use strict';

define(['app'], function (app) {

    var mapDirective = function () {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/googleMap.html",
            scope: {}
        }
    };

    app.directive('mapDirective', [mapDirective]);
});