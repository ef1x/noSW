/**
 * Created by Felix Goeb on 10.02.15.
 * check www.efix0.de
 * All rights reserved
 */

angular.module('photoService', [])
    .service('photoService', ['$rootScope', '$http', '$log',
        function ($rootScope, $http, $log) {

            var service = {

                getPhotos: function (person) {

                    var params =
                            'method=flickr.photos.search&' +
                            'extras=description&' +
                            'format=json&' +
                            'api_key=73c30c1a85af9c8992751f7c46b4cb0c&' +
                            'text='+ person +'&' +
                            'content_type=1&' +
                            'nojsoncallback=1&' +
                            'per_page=1'
                        ;

                    $http
                        .get('https://api.flickr.com/services/rest/?' + params)
                        .success(function (data) {
                            $log.log(data);

                            var photoData = data.photos.photo[0];
                            var imgUrl = 'https://farm' + photoData.farm +
                                '.staticflickr.com/' + photoData.server +
                                '/' + photoData.id + '_' + photoData.secret +
                                '_c.jpg';

                            $log.log(imgUrl);

                            return imgUrl;
                        });
                }


            };
            return service;
        }
    ]);

