angular.module('swApp')
    .controller('homeCtrl', ['$scope', 'homeService', '$log',
        function ($scope, homeService, $log) {

            $scope.getPerson = function () {
                homeService.getPerson()
            };

            $scope.$on('photoModels were build', function(e,data){
                $log.log('photoModels', data);
                $scope.persons = data;
            });

            $scope.getPerson()
        }
    ])
;