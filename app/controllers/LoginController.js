'use strict';

define(['app', 'services/csrfService', 'services/authService'], function (app) {

    var loginController = function ($scope, csrfService, authService) {
        $scope.loginAction = function(user) {
            authService.login(user).then(function(){
                $scope.showLoginError = false;
            }).catch(function(){
                $scope.showLoginError = true;
            });
        };

        $scope.tokenValue = csrfService;
    };

    app.register.controller('LoginController', ['$scope', 'csrfService', 'authService', loginController]);
});