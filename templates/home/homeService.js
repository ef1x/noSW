/**
 * Created by Felix Goeb on 10.02.15.
 * check www.efix0.de
 * All rights reserved
 */

angular.module('homeService', [])
    .service('homeService', ['$rootScope', '$http', '$log', 'personsModel',
        function ($rootScope, $http, $log, personsModel) {

            var service = {

                getPerson: function () {

                    $http
                        .get('https://swapi.co/api/people/?format=json')
                        .success(function (data) {
                            $log.log(data);
                            $rootScope.$broadcast('photoModels were build', data);
                            $rootScope.$broadcast('scroll.refreshComplete');
                        });
                }
            };

            return service;
        }
    ]);

