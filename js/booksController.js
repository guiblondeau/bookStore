bookStoreApp.controller('booksController',
    ['$scope', 'booksService', 'usersService', '$location', '$routeParams',
        function($scope, bookService, usersService, $location, $routeParams){

            var books;

            function initializeUserView() {
                getBooks();

                usersService.getUsers(function(data) {
                    $scope.users =  data.list;
                }, function(data) {
                    console.log('fail ' + data);
                });

            }

            initializeUserView();

            function getBooks () {
                bookService.getBooks(function(data) {
                    books = data.list;
                    $scope.books = _.cloneDeep(books);
                }, function(data) {
                    console.log('fail ' +data);
                });
            }

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

            $scope.isBorrowed = function(book) {
                return !_.isEmpty(book.borrower);
            }

            $scope.isBorrowing = false;

            $scope.stopBorrowing = function () {
                $scope.isBorrowing = false;
            }

            $scope.borrowBook = function(book) {
                $scope.selectedBook = book;
                $scope.selectedBookCopy = _.cloneDeep(book);
                $scope.isBorrowing = true;
            }

            $scope.returnBook = function(book) {
                $scope.selectedBook = book;
                var bookToSave = _.omit(book, 'borrower');
                bookService.updateBook(bookToSave, function(updatedBook) {
                    $scope.selectedBook = updatedBook;
                    var initialBookIndex = _.findIndex($scope.books, { id: updatedBook.id });
                    $scope.books[initialBookIndex] = updatedBook;
                    books[initialBookIndex] = updatedBook;
                }, function (data) {
                    console.log('fail ' + data);
                });

            }

            $scope.updateBook = function(bookToSave) {

                bookService.updateBook(bookToSave, function(updatedBook) {
                    $scope.selectedBook = updatedBook;
                    var initialBookIndex = _.findIndex($scope.books, { id: updatedBook.id });
                    $scope.books[initialBookIndex] = updatedBook;
                    books[initialBookIndex] = updatedBook;
                }, function (data) {
                    console.log('fail ' + data);
                });

                $scope.isBorrowing = false;
            }

            $scope.stopCreatingBook = function () {
                $scope.isCreatingBook = false;
            };

            $scope.startCreatingBook = function () {
                $scope.isCreatingBook = true;
            };

            $scope.saveBook = function(bookNameToAdd) {
                var toSave = {
                    name : bookNameToAdd
                };

                bookService.saveBook(toSave, function(addedBook) {
                    $scope.isCreatingBook = false;
                    $scope.books.push(addedBook);
                    books.push(addedBook);
                }, function (data) {
                    console.log('fail '+data);
                });

                $scope.isBorrowing = false;
            };

            $scope.deleteBook = function(bookToDelete){
                bookService.deleteBook(bookToDelete, function(data) {
                    _.remove($scope.books, function(book) {
                        return _.isEqual(book, bookToDelete)
                    });
                }, function(data) {
                    console.log('fail ' + data)
                });
            };

        }]);