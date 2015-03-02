/**
 * Created by Felix Goeb on 10.02.15.
 * check www.efix0.de
 * All rights reserved
 */

angular.module('photoServiceModule', [])
    .service('photoService', ['$rootScope', '$http', '$log', '$resource','$sce',
        function ($rootScope, $http, $log, $resource, $sce) {

            var params = {
                method: 'flickr.photos.search',
                extras: 'description',
                format: 'json',
                api_key: '73c30c1a85af9c8992751f7c46b4cb0c',
                content_type: '1',
                nojsoncallback: '1',
                per_page: 1
            };

           return $resource('https://api.flickr.com/services/rest/',{}, {
                query: {
                    isArray: false,
                    params: params,
                    transformResponse: function (data){
                        var photos = angular.fromJson(data).photos.photo[0];

                        var urlString = 'https://farm'+ photos.farm +
                            '.staticflickr.com/' + photos.server +
                        '/'+ photos.id +'_'+photos.secret +'.jpg';

                        return { url : urlString};
// hier ist natuerlich das problem
//                        return urlstring;
// wenn du hier einen string zurueck gibts,
// denk die resource, dass sie ein json object als response bekommt
// resultat: 'tre' => ['t','r','e']
// quasi denkt die ressource es kommen 3 elemente zurueck obwohl du nur 1 ausgeben willst

                    }
                }

            });
            //var service = {
            //
            //    getPhotos: function (person) {
            //
            //        var params =
            //                'method=flickr.photos.search&' +
            //                'extras=description&' +
            //                'format=json&' +
            //                'api_key=73c30c1a85af9c8992751f7c46b4cb0c&' +
            //                'text='+ person +'&' +
            //                'content_type=1&' +
            //                'nojsoncallback=1&' +
            //                'per_page=1'
            //            ;
            //
            //        $http
            //            .get('https://api.flickr.com/services/rest/?' + params)
            //            .success(function (data) {
            //                $log.log(data);
            //
            //                var photoData = data.photos.photo[0];
            //                var imgUrl = 'https://farm' + photoData.farm +
            //                    '.staticflickr.com/' + photoData.server +
            //                    '/' + photoData.id + '_' + photoData.secret +
            //                    '_c.jpg';
            //
            //                $log.log(imgUrl);
            //
            //                return imgUrl;
            //            });
            //    }
            //
            //
            //};
            //return service;
        }
    ]);

