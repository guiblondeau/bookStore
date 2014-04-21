/**
 * Created by Guillaume Blondeau on 20/04/14.
 */
bookStoreApp.controller('usersController',
    ['$scope', 'usersService', '$location', '$routeParams',
        function($scope, usersService, $location, $routeParams){

            /*
            Retrieve users
             */
            usersService.getUsers(function(data) {
                $scope.users =  data.list;
            }, function(data) {
                console.log("fail "+data);
            });

            /*
            Create user
             */
            $scope.save = function() {
                var toSave = {
                    name : $scope.userName
                };
                usersService.createUser(toSave, function(data){
                    $scope.users.push(data);
                    $scope.create = false;
                }, function(data){
                    console.log("error");
                });
            }

            /*
            Delete user
             */
            $scope.delete = function(user) {
                usersService.deleteUser(user, function(data) {
                    var index = $scope.users.indexOf(user);
                    if (index > -1) {
                        $scope.users.splice(index, 1);
                    }
                }, function(data) {
                    console.log("fail " + data)
                });
            }
        }
    ]
);