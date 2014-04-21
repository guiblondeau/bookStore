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

            bookService.getBooks(function(data) {
                books = data.list;
                $scope.books =  books;
            }, function(data) {
                console.log("fail "+data);
            });

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
                bookService.updateBook(toSave, function(data) {
                    $scope.borrow = false;
                    $location.path('#/books/');
                }, function (data) {
                    console.log("fail "+data);
                });
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
                bookService.saveBook(toSave, function(data) {
                    $scope.create = false;
                    $location.path('#/books/');
                }, function (data) {
                    console.log("fail "+data);
                });
                $scope.borrow = false;
            }

            /*
             Return a book
             */
            $scope.bookReturn = function(book) {
                $scope.book = book;
                var toSave = {
                    id : $scope.book.id,
                    name : $scope.book.name
                }
                bookService.saveBook(toSave, function(data) {
                    $location.path('#/books/');
                }, function(data) {
                    console.log("fail " + data)
                });
            }

            /*
            Delete a book
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