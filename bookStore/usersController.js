/**
 * Created by Guillaume Blondeau on 20/04/14.
 */
bookStoreApp.controller('usersController',
    ['$scope', 'usersService', '$location', '$routeParams',
        function($scope, usersService, $location, $routeParams){

            var successGet = function(data) {
                $scope.users =  data.list;
            }

            var failureGet = function(data) {
                console.log("error");
            }

            usersService.getUsers(successGet, failureGet);

            /*
            Create user
             */

            $scope.save = function() {
                var toSave = {
                    name : $scope.userName
                };
                usersService.createUser(toSave, function(data){
                    $scope.users.push(data);
                }, function(data){
                    console.log("error");
                });
            }
        }
    ]
);