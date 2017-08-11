'use strict';

define(['app', 'services/csrfService', 'services/authService'], function (app) {

    var registerController = function ($scope, csrfService, authService) {
        $scope.registerAction = function(user) {
            authService.register(user).then(function(){
                console.log('Good');
            }).catch(function(){
                console.log('bad');
            });
        };

        $scope.tokenValue = csrfService;
    };

    app.register.controller('RegisterController', ['$scope','csrfService', 'authService', registerController]);
});