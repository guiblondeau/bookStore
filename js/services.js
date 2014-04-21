var booksService = angular.module('bookStore.services', []);

booksService.factory('booksService', ['$http', function($http){

    var service = {};

    service.getBooks = function(success, failure) {
        return $http.get('../books/?strategy=load').success(success, failure);
    };

    service.updateBook = function(book, success, failure) {
        $http.put('../books/'+book.id, book).success(success, failure);
    }

    service.saveBook = function(book, success, failure) {
        $http.post('../books/', book).success(success, failure);
    }

    return service;

}]);

booksService.factory('usersService', ['$http', function($http){

    var service = {};

    service.getUsers = function(success, failure) {
        return $http.get('../users/').success(success, failure);
    }

    service.createUser = function(user, success, failure) {
        return $http.post('../users/', user).success(success, failure);
    }

    return service;
}]);