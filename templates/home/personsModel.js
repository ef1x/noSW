/**
 * Created by Felix Goeb on 10.02.15.
 * check www.efix0.de
 * All rights reserved
 */


angular.module('personsModel', [])
    .factory('personsModel', ['$rootScope', '$log', 'photoService',
        function ($rootScope, $log, photoService) {

            /**
             * Constructor, with class name
             */
            function person(birth_year, created, edited, eye_color,
                            films, gender, hair_color, height, homeworld, mass,
                            name, skin_color, species, starships, url, vehicles){

                this.birth_year = birth_year;
                    this.created = created;
                    this.edited = edited;
                    this.eye_color = eye_color;
                    this.films = films;
                    this.gender = gender;
                    this.hair_color = hair_color;
                    this.height = height;
                    this.homeworld = homeworld;
                    this.mass = mass;
                    this.name = name;
                    this.skin_color = skin_color;
                    this.species = species;
                    this.starships = starships;
                    this.url = url;
                    this.vehicles = vehicles;
                    this.img = photoService.getPhotos(name);
                //$log.log(photoService.getPhotos(name));

            }

            return person;
        }
    ]);