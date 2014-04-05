var booksService = angular.module('bookStore.services', []);

booksService.factory('booksService', ['$http', function($http){

    var service = {};

    service.getBooks = function(success, failure) {
        return $http.get('https://bookrent.apispark.net/v1/books/?strategy=load').success(success, failure);
    };

    service.updateBook = function(book, success, failure) {
        $http.put('https://bookrent.apispark.net/v1/books/'+book.id, book).success(success, failure);
    }

    service.saveBook = function(book, success, failure) {
        $http.post('https://bookrent.apispark.net/v1/books/', book).success(success, failure);
    }

    return service;

}]);

booksService.factory('usersService', ['$http', function($http){

    var service = {};

    service.getUsers = function(success, failure) {
        return $http.get('https://bookrent.apispark.net/v1/users/').success(success, failure);
    }

    return service;
}]);