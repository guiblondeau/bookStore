bookStoreApp.controller('booksController',
    ['$scope', 'booksService', 'usersService', '$location', '$routeParams',
        function($scope, bookService, usersService, $location, $routeParams){

            var isBooked = $routeParams.isBooked;

            $scope.borrow = false;

            $scope.bookDetail = function(book) {
                $scope.book = book;
                $scope.users = usersService.getUsers(successGetUsers, failureGet);
                $scope.borrow = true;
            }

            var successGet = function(data) {
                console.log("good");
                console.log(data.list);
                $scope.books =  data.list;
            }

            var successGetBorrowed = function(data) {
                console.log("good");
                console.log(data.list);
                $scope.books =  data.list.filter(function(book){
                    console.log(book);
                    return (book.borrower != undefined) && (book.borrower != null)
                });
            }

            var successGetFree = function(data) {
                console.log("good");
                console.log(data.list);
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
                console.log("good");
                console.log(data.list);
                $scope.users =  data.list;
            }


            $scope.isBorrowed = function(book) {
                return (book.borrower != undefined) && (book.borrower != null);
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
