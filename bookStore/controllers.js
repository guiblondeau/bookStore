bookStoreApp.controller('booksController',
    ['$scope', 'booksService', 'usersService', '$location', '$routeParams',
        function($scope, bookService, usersService, $location, $routeParams){

            var books;

            var successGet = function(data) {
                books = data.list;
                $scope.books =  books;
            }

            var failureGet = function(data) {
                console.log("error")
            }

            bookService.getBooks(successGet, failureGet);

            $scope.getBorrowed = function() {
                $scope.books =  books.filter(function(book){
                    return (book.borrower != undefined) && (book.borrower != null)
                });
            }

            $scope.getFree = function() {
                $scope.books =  books.filter(function(book){
                    return (book.borrower == undefined) || (book.borrower == null)
                });
            }

            $scope.getAll = function() {
                $scope.books = books;
            }

            var successGetUsers = function(data) {
                console.log(data);
                $scope.users =  data.list;
            }

            usersService.getUsers(successGetUsers, failureGet);

            $scope.isBorrowed = function(book) {
                return (book.borrower != undefined) && (book.borrower != null);
            }

            $scope.borrow = false;

            $scope.bookBorrow = function(book) {
                $scope.book = book;
                $scope.borrow = true;
            }

            /*
            Update a book
             */
            $scope.update = function() {
                var toSave = {
                    id : $scope.book.id,
                    name : $scope.book.name,
                    borrower : $scope.user
                }
                console.log(toSave);
                var success = function(data) {
                    $scope.borrow = false;
                    $location.path('#/books/');
                }
                var failure = function (data) {
                    console.log("fail");
                }
                bookService.updateBook(toSave, success, failure);
                $scope.borrow = false;
            }

            /*
             Save a book
             */
            $scope.save = function() {
                var toSave = {
                    name : $scope.bookName
                }
                console.log(toSave);
                var success = function(data) {
                    $scope.create = false;
                    $location.path('#/books/');
                }
                var failure = function (data) {
                    console.log("fail");
                }
                bookService.saveBook(toSave, success, failure);
                $scope.borrow = false;
            }

            /*
            Used to return a book
             */
            $scope.bookReturn = function(book) {
                $scope.book = book;
                var toSave = {
                    id : $scope.book.id,
                    name : $scope.book.name
                }
                console.log(toSave);
                var success = function(data) {
                }
                var failure = function (data) {
                    console.log("fail");
                }
                bookService.saveBook(toSave, success, failure);
            }
}]);

bookStoreApp.controller('usersController',
    ['$scope', 'usersService', '$location', '$routeParams',
        function($scope, usersService, $location, $routeParams){

            var successGet = function(data) {
                console.log("good");
                console.log(data.list);
                $scope.users =  data.list;
            }

            var failureGet = function(data) {
                console.log("error")
            }

            $scope.users = usersService.getUsers(successGet, failureGet);

}]);
