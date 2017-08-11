'use strict';

define(['services/routeResolver'], function () {

    var app = angular.module('customersApp',
        ['ngRoute', 'ngAnimate', 'routeResolverServices', 'wc.Directives','ng-fusioncharts', 'wc.Animations', 'ui.bootstrap']);

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', '$locationProvider',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, $locationProvider) {

            //Change default views and controllers directory using the following:
            //routeResolverProvider.routeConfig.setBaseDirectories('/app/views', '/app/controllers');

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $routeProvider
            //route.resolve() now accepts the convention to use (name of controller & view) as well as the
            //path where the controller or view lives in the controllers or views folder if it's in a sub folder.
            //For example, the controllers for customers live in controllers/customers and the views are in views/customers.
            //The controllers for orders live in controllers/orders and the views are in views/orders
            //The second parameter allows for putting related controllers/views into subfolders to better organize large projects
                .when('/', route.resolve('Home'))
                .when('/catalog', route.resolve('Catalog', 'catalog/'))
                .when('/catalog/:id', route.resolve('CatalogDetails', 'catalog/'))
                .when('/reviews', route.resolve('Reviews', 'reviews/'))
                .when('/reviews/:id', route.resolve('ReviewDetails', 'reviews/'))
                .when('/genres', route.resolve('Genres', 'genres/'))
                .when('/orders', route.resolve('Orders', 'orders/'))
                .when('/cart', route.resolve('OrderCart', 'orders/'))
                .when('/myOrders', route.resolve('Orders', 'orders/'))
                .when('/about', route.resolve('About'))
                .when('/contact', route.resolve('Contact'))
                .when('/login', route.resolve('Login'))
                .when('/register', route.resolve('Register'))
                .otherwise({redirectTo: '/'});

            // use the HTML5 History API
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }]);

    app.run(function ($window, $rootScope, authService) { //use run rather than config
        $rootScope.session = {};
        $rootScope.session.user = $window.sessionStorage.getItem('user-email');
        $rootScope.logOut = authService.logOut;
        $rootScope.isAdmin = authService.isAdmin({'email': $window.sessionStorage.getItem('user-email') || ""}, true);
    });


    return app;

});





