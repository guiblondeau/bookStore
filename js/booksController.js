bookStoreApp.controller('booksController',
    ['$scope', 'booksService', 'usersService', '$location', '$routeParams',
        function($scope, bookService, usersService, $location, $routeParams){

            var books;

            function getBooks () {
                bookService.getBooks(function(data) {
                    books = data.list;
                    $scope.books = _.cloneDeep(books);
                }, function(data) {
                    console.log('fail ' +data);
                });
            }

            getBooks();

            $scope.getBorrowedBooks = function() {
                $scope.books =  _.cloneDeep(books.filter(function(book){
                    return !_.isEmpty(book.borrower);
                }));
            }

            $scope.getFreeBooks = function() {
                $scope.books =  _.cloneDeep(books.filter(function(book){
                    return !_.isEmpty(book.borrower);
                }));
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
                console.log('fail ' + data);
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

            $scope.borrowBook = function(book) {
                $scope.selectedBook = book;
                $scope.isBorrowing = true;
            }

            $scope.returnBook = function(book) {
                $scope.selectedBook = book;
                var toSave = {
                    id : $scope.selectedBook.id,
                    name : $scope.selectedBook.name,
                    borrower : null
                };
                bookService.updateBook(toSave, function(updatedBook) {
                    $scope.selectedBook = updatedBook;
                    var initialBookIndex = _.findIndex($scope.books, { id: updatedBook.id });
                    $scope.books[initialBookIndex] = updatedBook;
                }, function (data) {
                    console.log("fail "+data);
                });

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
                    $scope.books.push(addedBook);
                    books.push(addedBook);
                }, function (data) {
                    console.log("fail "+data);
                });
                $scope.isBorrowing = false;
            };

            /*
            Delete a selectedBook
             */
            $scope.deleteBook = function(book){
                bookService.deleteBook(book, function(data) {
                    var index = $scope.books.indexOf(book);
                    if (index > -1) {
                        $scope.books.splice(index, 1);
                    }
                }, function(data) {
                    console.log("fail " + data)
                });
            };

        }]);