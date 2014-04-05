bookStoreApp.controller('booksController',
    ['$scope', 'booksService', 'usersService', '$location', '$routeParams',
        function($scope, bookService, usersService, $location, $routeParams){

            var isBooked = $routeParams.isBooked;

            var successGet = function(data) {
                $scope.books =  data.list;
            }

            var successGetBorrowed = function(data) {
                $scope.books =  data.list.filter(function(book){
                    console.log(book);
                    return (book.borrower != undefined) && (book.borrower != null)
                });
            }

            var successGetFree = function(data) {
                $scope.books =  data.list.filter(function(book){
                    console.log(book);
                    return (book.borrower == undefined) || (book.borrower == null)
                });
            }

            var failureGet = function(data) {
                console.log("error")
            }

            if (isBooked != undefined) {
                if (isBooked == "true") {
                    bookService.getBooks(successGetBorrowed, failureGet);
                } else if (isBooked == "false") {
                    bookService.getBooks(successGetFree, failureGet);
                } else {
                    bookService.getBooks(successGet, failureGet);
                }
            } else {
                bookService.getBooks(successGet, failureGet);
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
                    name : $scope.book.name
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
