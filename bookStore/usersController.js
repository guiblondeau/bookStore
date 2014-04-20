/**
 * Created by Guillaume Blondeau on 20/04/14.
 */
bookStoreApp.controller('usersController',
    ['$scope', 'usersService', '$location', '$routeParams',
        function($scope, usersService, $location, $routeParams){

            var successGet = function(data) {
                console.log("good");
                console.log(data.list);
                $scope.users =  data.list;
            }

            var failureGet = function(data) {
                console.log("error");
            }

            usersService.getUsers(successGet, failureGet);

            /*
            Create user
             */

            var save = function() {
                var toSave = {
                    name : $scope.userName
                };
                usersService.createUser(toSave, function(data){
                    console.log(data);
                }, function(data){
                    console.log(data);
                });
            }
        }
    ]
);