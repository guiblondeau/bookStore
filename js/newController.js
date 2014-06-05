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

            /*
             Get books
             */
            $http.get('../books/?strategy=load').success(function(data){
                $scope.books =  data.list;
            }, function(data){
                $scope.books =  data.list;
            });

            $http.get('../books/?strategy=load').success(function(data){
                $scope.users =  data.list;
            }, function(data){
                $scope.users =  data.list;
            });

        }]);