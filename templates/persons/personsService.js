/**
 * Created by Felix Goeb on 10.02.15.
 * check www.efix0.de
 * All rights reserved
 */

angular.module('personServiceModule', [])
    .factory('Person', ['photoService', '$resource', '$log',
        function (photoService, $resource, $log) {

            var Person = $resource('https://swapi.co/api/people/?format=json', {}, {
                query: {
                    methode: 'GET',
                    isArray: true,
                    //params: {format: 'json'},
                    transformResponse: function (data) {
                        var persons = angular.fromJson(data).results;

                        persons.forEach(function (entry, index) {

                            
                            var url = photoService.query({text: entry.name});
                            entry.img = url;
                            persons[index] = new Person(entry);
                        });
                        return persons;
                    }

                }
            });

            //Person.prototype.imgUrl = function () {
            //    $log.debug('imgUrl');
            //        var params = {
            //            method: 'flickr.photos.search',
            //            extras: 'description',
            //            format: 'json',
            //            api_key: '73c30c1a85af9c8992751f7c46b4cb0c',
            //            text: this.name,
            //            content_type: '1',
            //            nojsoncallback: '1',
            //            per_page: 1
            //        };
            //
            //    //    var img =photoService.query(params);
            //    //return img
            //};

            //angular.extend(Person.prototype, {
            //
            //    imgUrl: function(){
            //        $log.debug('imgUrl');
            //    }
            //});

            return Person;
        }]);
//angular.module('personServiceModule', [])
//    .service('personStore', ['$rootScope', '$http', '$log', 'personModel',
//        function ($rootScope, $http, $log, personModel) {
//
//            var service = {
//
//                getPerson: function () {
//                    var personsArray = [];
//
//                    $http
//                        .get('https://swapi.co/api/people/?format=json')
//                        .success(function (data) {
//                            $log.log(data);
//
//                            data.results.forEach(function (entry) {
//                                personsArray.push(new personModel(entry));
//                            });
//
//                            $rootScope.$broadcast('scroll.refreshComplete');
//                        });
//                    return personsArray;
//                }
//            };
//
//            return service;
//        }
//    ]);

