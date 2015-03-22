/**
 * Created by guillaume on 20/04/14.
 */
bookStoreApp.controller('booksController',
    ['$scope', 'booksService', 'usersService', '$location', '$routeParams',
        function($scope, bookService, usersService, $location, $routeParams){

            /*
             Get books
             */
            var books;

            function getBooks () {
                bookService.getBooks(function(data) {
                    books = data.list;
                    $scope.books =  books;
                }, function(data) {
                    console.log("fail "+data);
                });
            }

            getBooks();

            $scope.getBorrowedBooks = function() {
                $scope.books =  books.filter(function(book){
                    return !_.isEmpty(book.borrower);
                });
            }

            $scope.getFreeBooks = function() {
                $scope.books =  books.filter(function(book){
                    return !_.isEmpty(book.borrower);
                });
            }

            $scope.getAllBooks = function() {
                $scope.books = books;
            }

            /*
             Get users
             */
            usersService.getUsers(function(data) {
                console.log(data);
                $scope.users =  data.list;
            }, function(data) {
                console.log("fail "+data);
            });


            /*
             Borrow functions
             */
            $scope.isBorrowed = function(book) {
                return !_.isEmpty(book.borrower);
            }

            $scope.isBorrowing = false;

            $scope.stopBorrowing = function () {
                $scope.isBorrowing = false;
            }

            $scope.bookBorrow = function(book) {
                $scope.selectedBook = book;
                $scope.isBorrowing = true;
            }

            $scope.bookReturn = function(book) {
                $scope.selectedBook = book;
                $scope.update();
            }

            /*
             Update a Book
             */
            $scope.update = function() {
                var toSave = {
                    id : $scope.selectedBook.id,
                    name : $scope.selectedBook.name,
                    borrower : _.omit($scope.user, 'id')
                };
                bookService.updateBook(toSave, function(updatedBook) {
                    $scope.selectedBook = updatedBook;
                    $scope.isBorrowing = false;
                }, function (data) {
                    console.log("fail "+data);
                });
                $scope.isBorrowing = false;
            }

            /*
             Save a Book
             */

            $scope.stopCreatingBook = function () {
                $scope.create = false;
            };

            $scope.saveBook = function(bookNameToAdd) {
                var toSave = {
                    name : bookNameToAdd
                };
                bookService.saveBook(toSave, function(addedBook) {
                    $scope.create = false;
                    getBooks();
                }, function (data) {
                    console.log("fail "+data);
                });
                $scope.isBorrowing = false;
            };

            /*
            Delete a selectedBook
             */
            $scope.delete = function(book){
                bookService.deleteBook(book, function(data) {
                    var index = $scope.books.indexOf(book);
                    if (index > -1) {
                        $scope.books.splice(index, 1);
                    }
                }, function(data) {
                    console.log("fail " + data)
                });
            }

        }]);