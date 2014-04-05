bookStoreApp.controller('booksController',
    ['$scope', 'booksService', '$location', '$routeParams',
        function($scope, bookService, $location, $routeParams){

        var isBooked = $routeParams.isBooked;

        var successGet = function(data) {
            console.log("good");
            console.log(data.list);
            console.log(data[0]);
            console.log(data);
            return data.list;
        }

        var failureGet = function(data) {
            console.log("error")
        }

        if (isBooked != undefined) {
            if (isBooked == "true") {
                $scope.books = bookService.getBooks(successGet, failureGet).filter(function(book){
                    console.log(book);
                    return (book.borrower != undefined) && (book.borrower != null)
                });
            } else if (isBooked == "false") {
                $scope.books = bookService.getBooks(successGet, failureGet).filter(function(book){
                    console.log(book);
                    return (book.borrower == undefined) || (book.borrower == null)
                });
            } else {
                $scope.books = bookService.getBooks(successGet, failureGet);
            }
        } else {
            $scope.books = bookService.getBooks(successGet, failureGet);
        }
}]);

bookStoreApp.controller('usersController',
    ['$scope', 'usersService', '$location', '$routeParams',
        function($scope, usersService, $location, $routeParams){

            $scope.users = usersService.getUsers();

}]);
