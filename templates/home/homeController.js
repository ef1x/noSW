angular.module('swApp')
    .controller('homeCtrl', ['$scope', 'homeService', '$log', 'personsModel',
        function ($scope, homeService, $log, personsModel) {

            $scope.getPerson = function () {
                homeService.getPerson()
            };

            $scope.$on('photoModels were build', function(e,data){
                $scope.personsArray = [];

                $log.log('photoModels', data);
                //$scope.persons = data;
                data.results.forEach(function (entry){
                    $scope.personsArray.push( new personsModel(entry));
                })
            });

            $scope.getPerson()
        }
    ])
;