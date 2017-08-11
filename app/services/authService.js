'use strict';

define(['app'], function (app) {

    var authService = function ($http, $q, $window, $location, $rootScope) {
        var serviceBase = '/api/',
            authFactory = {};

        // create user variable
        var user = null;

        authFactory.login = function (user) {
            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post(serviceBase + 'login', user)
                // handle success
                .success(function (data, status) {
                    if(status === 200 && data){
                        $window.sessionStorage.setItem('user-email', user.email);
                        $window.sessionStorage.setItem('admin', !!data.local.isAdmin);
                        $location.path("/");
                        $rootScope.session.user = user.email.toString();

                        $rootScope.isAdmin = data.local.isAdmin;
						
						$rootScope.isLoggedIn = true; 

                        user = true;
                        deferred.resolve();
                    } else {
                        $window.sessionStorage.removeItem('user-email');
                        $window.sessionStorage.removeItem('admin');
                        user = false;
                        $rootScope.isAdmin = false;
                        $rootScope.session.user = undefined;
						
						$rootScope.isLoggedIn = false;

                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    user = false;
					$rootScope.isLoggedIn = false;
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;
        };

        authFactory.isLoggedInAndNotAdmin = function () {
            if(!!$window.sessionStorage.getItem('user-email') && !isStartupAdmin()) {
                return true;
            } else {
                return false;
            }
        };

        authFactory.isLoggedIn = function () {
            if(!!$window.sessionStorage.getItem('user-email')) {
				$rootScope.isLoggedIn = true;
                return true;
            } else {
				$rootScope.isLoggedIn = false;
                return false;
            }
        };

        var isStartupAdmin = function () {
            if(!$window.sessionStorage.getItem('admin') || $window.sessionStorage.getItem('admin') === "false") {
                return false;
            } else {
                return true;
            }
        };

        authFactory.isAdmin = function (user, onstartup) {

            if (onstartup) {
                return isStartupAdmin();
            }

            else {
                // create a new instance of deferred
                var deferred = $q.defer();

                // send a post request to the server
                $http.post(serviceBase + 'admin', user)
                    // handle success
                    .success(function (data, status) {
                        if(status === 200 && data){
                            $rootScope.isAdmin = true;
                            deferred.resolve(true);
                        } else {
                            $rootScope.isAdmin = false;
                            deferred.reject(false);
                        }
                    })
                    // handle error
                    .error(function (data) {
                        $rootScope.isAdmin = false;
                        deferred.reject(false);
                    });

                // return promise object
                return deferred.promise;
            }
        };

        authFactory.logOut = function () {
            // create a new instance of deferred
            var deferred = $q.defer();

            // send a get request to the server
            $http.get(serviceBase + 'logout')
                // handle success
                .success(function (data) {
                    $window.sessionStorage.removeItem('user-email');
                    $window.sessionStorage.removeItem('admin');
                    $rootScope.session.user = undefined;
                    user = false;

					$rootScope.isLoggedIn = false;
                    $rootScope.isAdmin = false;
                    deferred.resolve();
                })
                // handle error
                .error(function (data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        };

        authFactory.getUserStatus = function () {
            return user;
        };

        authFactory.register = function (user) {
            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post(serviceBase + 'register', user)
                // handle success
                .success(function (data, status) {
                    if(status === 200 && data){
                        $window.sessionStorage.setItem('user-email', user.email);
                        $window.sessionStorage.setItem('admin', !!user.isAdmin);
                        $location.path("/");
                        $rootScope.session.user = user.email;

                        $rootScope.isAdmin = user.isAdmin;
						$rootScope.isLoggedIn = true;

                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                // handle error
                .error(function (data) {
                    deferred.reject();
                });

            // return promise object
            return deferred.promise;

        };

        return authFactory;
    };

    app.factory('authService', ['$http', '$q', '$window','$location', '$rootScope',  authService]);
});