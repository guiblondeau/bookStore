bookStoreApp.controller('booksController',
    ['$scope', 'booksService', '$location', '$routeParams',
        function($scope, bookService, $location, $routeParams){

        var isBooked = $routeParams.isBooked;

        if (isBooked != undefined) {
            if (isBooked == "true") {
                $scope.books = bookService.getBooks().filter(function(book){
                    return (book.borrower != undefined) && (book.borrower != null)
                });
            } else if (isBooked == "false") {
                $scope.books = bookService.getBooks().filter(function(book){
                    return (book.borrower == undefined) || (book.borrower == null)
                });
            } else {
                $scope.books = bookService.getBooks();
            }
        } else {
            $scope.books = bookService.getBooks();
        }
}]);

bookStoreApp.controller('usersController',
    ['$scope', 'usersService', '$location', '$routeParams',
        function($scope, usersService, $location, $routeParams){

            $scope.users = usersService.getUsers();

}]);
