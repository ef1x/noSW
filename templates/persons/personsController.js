angular.module('swApp.controllers', [])
    .controller('personsCtrl', ['$rootScope', '$scope', 'Person', '$log',
        function ($rootScope, $scope, Person, $log) {

            //$scope.getPerson = function () {
            //
            //    Person.query(function (persons) {
            //            $scope.personsArray = persons;
            //            $rootScope.$broadcast('scroll.refreshComplete');
            //        });
            //};
            //
            //$scope.getPerson()
        }
    ])
;