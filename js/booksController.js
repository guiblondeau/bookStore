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

            $scope.getBorrowedBooks = function() {
                $scope.books =  books.filter(function(book){
                    return !_isEmpty(book.borrower);
                });
            }

            $scope.getFreeBooks = function() {
                $scope.books =  books.filter(function(book){
                    return !_isEmpty(book.borrower);
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
                return (book.borrower != undefined) && (book.borrower != null);
            }

            $scope.isBorrowing = false;

            $scope.bookBorrow = function(book) {
                $scope.book = book;
                $scope.isBorrowing = true;
            }

            $scope.bookReturn = function(book) {
                $scope.book = book;
                $scope.update();
            }

            /*
             Update a book
             */
            $scope.update = function() {
                var toSave = {
                    id : $scope.book.id,
                    name : $scope.book.name,
                    borrower : _.omit($scope.user, 'id')
                };
                bookService.updateBook(toSave, function(updatedBook) {
                    $scope.book = updatedBook;
                    $scope.isBorrowing = false;
                }, function (data) {
                    console.log("fail "+data);
                });
                $scope.isBorrowing = false;
            }

            /*
             Save a book
             */
            $scope.saveBook = function(bookNameToAdd) {
                var toSave = {
                    name : bookNameToAdd
                };
                bookService.saveBook(toSave, function(addedBook) {
                    $scope.create = false;
                    $location.path('#/books/');
                    books.push(addedBook);
                    $scope.books.push(addedBook);
                }, function (data) {
                    console.log("fail "+data);
                });
                $scope.isBorrowing = false;
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