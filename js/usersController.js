/**
 * Created by Guillaume Blondeau on 20/04/14.
 */
bookStoreApp.controller('usersController',
    ['$scope', 'usersService', '$location', '$routeParams',
        function($scope, usersService, $location, $routeParams){

            usersService.getUsers(function(data) {
                $scope.users =  data.list;
            }, function(data) {
                console.log("fail "+data);
            });

            function initializeUserForm () {
                $scope.userToSave = {};
            };

            $scope.saveUser = function(userToSave) {
                usersService.createUser(userToSave, function(data){
                    $scope.users.push(data);
                    $scope.isAddingUser = false;
                }, function(data){
                    console.log("error");
                });
            };

            $scope.displayAddUserForm = function() {
                $scope.isAddingUser = true;
                initializeUserForm();
            };

            $scope.closeAddUserForm = function() {
                $scope.isAddingUser = false;
            };

            $scope.deleteUser = function(userToDelete) {
                usersService.deleteUser(userToDelete, function() {
                    _.remove($scope.users, function(user) {
                        return _.isEqual(user, userToDelete)
                    });
                }, function(data) {
                    console.log('fail ' + data)
                });
            };

        }
    ]
);