/**
 * Created by Felix Goeb on 10.02.15.
 * check www.efix0.de
 * All rights reserved
 */


angular.module('personModelModule', [])
    .factory('personModel', ['$rootScope', '$log', 'photoService',
        function ($rootScope, $log, photoService) {


            /**
             * Constructor, with class name
             */
            //function person(birth_year, created, edited, eye_color,
            //                films, gender, hair_color, height, homeworld, mass,
            //                name, skin_color, species, starships, url, vehicles)
            function person(entry){

                this.birth_year = entry.birth_year;
                    this.created = entry.created;
                    this.edited = entry.edited;
                    this.eye_color = entry.eye_color;
                    this.films = entry.films;
                    this.gender = entry.gender;
                    this.hair_color = entry.hair_color;
                    this.height = entry.height;
                    this.homeworld = entry.homeworld;
                    this.mass = entry.mass;
                    this.name = entry.name;
                    this.skin_color = entry.skin_color;
                    this.species = entry.species;
                    this.starships = entry.starships;
                    this.url = entry.url;
                    this.vehicles = entry.vehicles;
                    //this.img = photoService.getPhotos(entry.name);
                //$log.log(photoService.getPhotos(name));

            }

            //function addImage()

            return person;
        }
    ]);