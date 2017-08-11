require.config({
    baseUrl: '/app',
    urlArgs: 'v=1.0'
});

require(
    [
        'animations/listAnimations',
        'app',
        'directives/wcUnique',
        'directives/wcOverlay',
        'directives/filterDirective',
        'directives/resultTableDirective',
        'directives/gameCreateDirective',
        'directives/gameEditDirective',
        'directives/reviewCreateDirective',
        'directives/reviewEditDirective',
        'directives/reviewRemoveDirective',
        'directives/reviewsTableDirective',
        'directives/reviewsFilterDirective',
        'directives/webServiceDirective',
        'directives/pieChartDirective',
        'directives/mapDirective',
        'services/routeResolver',
        'services/modalService',
        'services/csrfService',
        'services/authService',
        'services/reviewsService',
        'services/homeService',
        'controllers/orders/orderChildController'
    ],
    function () {
        angular.bootstrap(document, ['customersApp']);
    });
