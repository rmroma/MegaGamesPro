'use strict';

define(['app'], function (app) {

    var homeService = function ($http, $q) {

        var serviceBase = 'http://www.giantbomb.com/api/games/',
            homeFactory = {};

        var result;

        homeFactory.getPage = function (pageIndex) {
            var url = "http://www.giantbomb.com/api/games/?api_key=e31a53182866e975585bd1891e5716df2864eebf&field_list=description,name&limit=1&sort=number_of_user_reviews:desc&platforms=94&filter=description:null&format=jsonp&offset=1&json_callback=JSON_CALLBACK";

            $http({
                method: 'JSONP',
                url: serviceBase,
                params: {
                    api_key: 'e31a53182866e975585bd1891e5716df2864eebf',
                    field_list: 'description,name',
                    limit: '1',
                    sort: 'number_of_user_reviews:desc',
                    platforms: '94',
                    filter: 'description:null',
                    format: 'jsonp',
                    json_callback: 'JSON_CALLBACK',
                    offset: pageIndex - 1
                },
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                //$('#fountainG').toggle();
                $.each(response.data.results, function (i, result) {
                    $('#games').html('<h2>Title</h2><h3>' + result.name + '</h3>' + result.description);
                });

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("Error in jsonp api call.");
            });
        };

        return homeFactory;
    };

    app.factory('homeService', ['$http', '$q', homeService]);
});