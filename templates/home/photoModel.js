/**
 * Created by Felix Goeb on 10.02.15.
 * check www.efix0.de
 * All rights reserved
 */


angular.module('photoModel', [])
    .factory('photoModel', ['$rootScope', '$log',
        function ($rootScope, $log) {

            /**
             * Constructor, with class name
             */
            function photo(owner, id, title, description, farm, server, secret) {
                // Public properties, assigned to the instance ('this')
                this.owner = owner;
                this.id = id;
                this.title = title;
                this.description = description._content;
                this.imgUrl = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_c.jpg'
            }

            return photo;
        }
    ]);