'use strict';

define(['app'], function (app) {

    var catalogController = function ($scope) {
        $scope.filters = {};
        $scope.filters.result = {};
        $scope.filters.type = "catalog";

        $scope.page = {pageNumber : 1, itemsPerPage: 5};
    };

    app.register.controller('CatalogController', ['$scope', catalogController]);

});