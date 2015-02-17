angular.module('swApp')
    .controller('homeCtrl', ['$scope', 'homeService', '$log',
        function ($scope, homeService, $log) {

            $scope.getPhoto = function () {
                homeService.getPhotos()
            };

            $scope.$on('photoModels were build', function(e,data){
                $log.log(data);
                $scope.photoArray = data;
            });

            $scope.getPhoto()
        }
    ])
;