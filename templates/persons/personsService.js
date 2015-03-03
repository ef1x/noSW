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

                            
                            //var url = photoService.query({text: entry.name});
                            //entry.img = url;
                            persons[index] = new Person(entry);
                        });
                        return persons;
                    }

                }
            });

            return Person;
        }]);
