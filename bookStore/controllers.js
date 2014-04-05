bookStoreApp.controller('booksController',
    ['$scope', 'booksService', '$location', '$routeParams',
        function($scope, bookService, $location, $routeParams){

            var isBooked = $routeParams.isBooked;

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

            var successGetUnborrowed = function(data) {
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
                    bookService.getBooks(successGetUnborrowed, failureGet);
                } else {
                    bookService.getBooks(successGet, failureGet);
                }
            } else {
                bookService.getBooks(successGet, failureGet);
            }
}]);

bookStoreApp.controller('usersController',
    ['$scope', 'usersService', '$location', '$routeParams',
        function($scope, usersService, $location, $routeParams){

            var successGet = function(data) {
                console.log("good");
                console.log(data.list);
                $scope.books =  data.list;
            }

            var failureGet = function(data) {
                console.log("error")
            }

            $scope.users = usersService.getUsers(successGet, failureGet);

}]);
