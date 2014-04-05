bookStoreApp.controller('booksController',
    ['$scope', 'booksService', '$location', '$routeParams',
        function($scope, bookService, $location, $routeParams){

        var isBooked = $routeParams.isBooked;

        var successGet = function(data) {
            console.log("good");
            console.log(data.list);
            $scope.books =  data.list;
        }

        var failureGet = function(data) {
            console.log("error")
        }

        console.log(bookService.getBooks(successGet, failureGet));

        if (isBooked != undefined) {
            if (isBooked == "true") {
                bookService.getBooks(successGet, failureGet);
                $scope.books = $scope.books.filter(function(book){
                    console.log(book);
                    return (book.borrower != undefined) && (book.borrower != null)
                });
            } else if (isBooked == "false") {
                bookService.getBooks(successGet, failureGet);
                $scope.books = $scope.books.filter(function(book){
                    console.log(book);
                    return (book.borrower == undefined) || (book.borrower == null)
                });
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

            $scope.users = usersService.getUsers();

}]);
