var booksService = angular.module('bookStore.services', []);

booksService.factory('booksService', ['$http', function($http){

    var service = {};

    service.getBooks = function() {
        return $http.get('https://bookrent.apispark.net/v1/books/').success(success, failure);
    };

    var books = [
        {
            name : "Effective Java",
            borrower : {
                id : 1,
                name : 'Guillaume Blondeau'
            }
        },
        {
            name : "Restlet in Action"
        }];
    return service;

}]);

booksService.factory('usersService', function(){

    var service = {};

    service.getUsers = function() {
        return users;
    }

    var users = [
        {
            "id" : 1,
            "name" : "Guillaume Blondeau"
        },
        {
            "id" : 2,
            "name" : "Cyprien Quilici"
        }
    ];

    return service;
});