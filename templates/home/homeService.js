/**
 * Created by Felix Goeb on 10.02.15.
 * check www.efix0.de
 * All rights reserved
 */

angular.module('homeService', [])
    .service('homeService', ['$rootScope', '$http', '$log', 'photoModel',
        function ($rootScope, $http, $log, photoModel) {

            var params =
                    'method=flickr.photos.search&' +
                    'extras=description&' +
                    'format=json&' +
                    'api_key=73c30c1a85af9c8992751f7c46b4cb0c&' +
                    'text=tree forest&' +
                    'license=4,5,6,7&' +
                    'content_type=1&' +
                    'nojsoncallback=1&' +
                    'per_page=10'
                ;

            var service = {

                getPhotos: function () {

                    var photoArray = [];
                    $http
                        .get('https://api.flickr.com/services/rest/?' + params)
                        .success(function (data) {
                            $log.log(data);
                            data.photos.photo.forEach(function (entry) {
                                photoArray.push(new photoModel(
                                    entry.owner,
                                    entry.id,
                                    entry.title,
                                    entry.description,
                                    entry.farm,
                                    entry.server,
                                    entry.secret))
                            });

                            $rootScope.$broadcast('photoModels were build', photoArray);
                            $rootScope.$broadcast('scroll.refreshComplete');
                        });
                }

            };
            return service;
        }
    ]);

