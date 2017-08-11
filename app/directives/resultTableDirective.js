'use strict';

define(['app', 'services/customersService', 'services/gamesService'], function (app) {

    var resultTableDirective = function (customersService, gamesService, $location, $rootScope) {
        return {
            restrict: 'E',
            templateUrl: "/app/views/templates/resultTable.html",
            scope: {
                filters : "=",
                page: "="
            },
            controller: function ($scope) {
                $scope.result = {};
                $scope.result.tuples = [];

                $scope.go = function ( path, item) {
                    $location.path( path );

                    switch($scope.filters.type) {
                        case 'catalog':
                            $rootScope.params = {game : item}
                            break;
                        case 'reviews':
                            $rootScope.params = {review : item}
                            break;
                    }


                };

                switch($scope.filters.type) {
                    case 'catalog':
                        $scope.result.tuples = [
                            {header:'#', value: 'id'}, {header:'name', value: 'gameName'}, {header:'description', value: 'gameDesc'},
                            {header:'genre', value: 'genre'},{header:'cost', value: 'cost'}, {header:'score', value: 'score'}];
                        break;
                    case 'reviews':
                        $scope.result.tuples = [
                            {header:'#', value: 'id'}, {header:'Game', value:'gameName'} , {header:'Title', value: 'title'}, {header:'Score', value: 'score'},
                            {header:'Date', value: 'date'}];
                        break;
                }

                $scope.maxSize = 5;
            }
        }
    };

    app.directive('resultTableDirective', ['customersService', 'gamesService', '$location', '$rootScope', resultTableDirective]);
});