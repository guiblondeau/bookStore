var booksService = angular.module('bookStore.services', []);

booksService.factory('booksService', function(){

    var service = {};

    service.getBooks = function() {
        return books;
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

});

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