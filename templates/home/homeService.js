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

                    var personArray = [];
                    $http
                        .get('https://swapi.co/api/people')
                        .success(function (data) {
                            $log.log(data);
                            data.results.forEach(function (entry) {

                                personArray.push(new personsModel(
                                    entry.birth_year,
                                    entry.created,
                                    entry.edited,
                                    entry.eye_color,
                                    entry.films,
                                    entry.gender,
                                    entry.hair_color,
                                    entry.height,
                                    entry.homeworld,
                                    entry.mass,
                                    entry.name,
                                    entry.skin_color,
                                    entry.species,
                                    entry.starships,
                                    entry.url,
                                    entry.vehicles
                                ))
                            });

                            $rootScope.$broadcast('photoModels were build', personArray);
                            $rootScope.$broadcast('scroll.refreshComplete');
                        });
                }

            };

            return service;
        }
    ]);

