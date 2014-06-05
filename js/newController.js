/**
 * Created by guillaume on 05/06/14.
 */
/**
 * Created by guillaume on 20/04/14.
 */
var testApp = angular.module('testApp', []);
testApp.controller('newController',
    ['$scope', '$http',
        function($scope, $http){
            $scope.test = "test"
            /*
             Get books
             */
            $http.get('../books/?strategy=load').success(function(data){
                console.log("coucou1");
                $scope.books =  data.list;
            }, function(data){
                console.log("coucou2");
                $scope.books =  data.list;
            });

            $http.get('../books/?strategy=load').success(function(data){
                console.log("coucou3");
                $scope.users =  data.list;
            }, function(data){
                console.log("coucou4");
                $scope.users =  data.list;
            });

        }]);