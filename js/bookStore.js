var bookStoreApp = angular.module('bookStore.app', ['ngRoute', 'bookStore.services']);

bookStoreApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/books/', {
            templateUrl : 'books.html',
            controller : 'booksController'
        }).when('/users/', {
            templateUrl : 'users.html',
            controller : 'usersController'
        }).otherwise({
            redirectTo : '/books/'
        })
}]);
