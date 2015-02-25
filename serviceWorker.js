/**
 * Created by Felix Goeb on 18.01.15.
 * check www.efix0.de
 * All rights reserved
 */

importScripts('js/serviceworker-cache-polyfill.js');


var CURRENT_ASSETS = {
    prefetch: 'sw-prefetch-cache-1'
};
var CURRENT_PHOTO = {
    photo: 'sw-img-cache-1'
};

var CURRENT_PERSON = {
    person: 'sw-person-cache-1'
};

var storedCaches = [
    CURRENT_ASSETS.prefetch,
    CURRENT_PHOTO.photo,
    CURRENT_PERSON.person
];

//first step downloading
//no listener for that :D

//second step installing
self.addEventListener('install', function (event) {
    console.log('installed');

    event.waitUntil(
        //cach stuff
        caches.open(CURRENT_ASSETS.prefetch).then(function (cache) {
            return cache.addAll([
                'index.html',
                'js/app.js',
                'js/serviceworker-cache-polyfill.js',
                'lib/ionic/css/ionic.min.css',
                'lib/ionic/js/ionic.bundle.min.js',
                'lib/ionic/js/ionic.min.js',
                'lib/ionic/js/ionic-angular.min.js',
                'templates/home/home.html',
                'templates/home/homeController.js',
                'templates/home/homeService.js',
                'templates/menu/menu.html',
                'templates/settings/settings.html',
                'css/style.css'
            ]);
        })
    );
});


//third step, ready to use let's go
self.addEventListener('activate', function (event) {
    // we are good to go!
    console.log('activated');
    console.log(caches);
    //check for old caches and remove if updates are in place
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (!/^sw-/.test(cacheName)) {
                        return;
                    }
                    if (storedCaches.indexOf(cacheName) == -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', function (event) {
    console.log(event);
    //get URL from event
    var requestURL = new URL(event.request.url);
    console.log(requestURL);

    //check if URL-hostname equals starwars API
    if (requestURL.hostname == 'swapi.co') {
        console.log('swapi', requestURL.hostname);
        event.respondWith(swapiResponse(event.request));
    }
    //// check if URL contains parts of image URL
    //else if (/\.staticflickr\.com$/.test(requestURL.hostname)) {
    //    console.log('flikr', requestURL.hostname);
    //
    //    event.respondWith(flickrImageResponse(event.request));
    //}

    //no match? create a promise, check for request in cache, return match
    else {
        //caches match return promise, looks for matches in caches
        caches.match(event.request)
            .then(function (response) {
                //if matching response, return cache
                if (response) {
                    return response;
                }
                //otherwise do fetch request to network if possible
                return fetch(event.request);
            })
    }
});

function swapiResponse(request) {
    console.log('swapiResponse', request);
    if (request.headers.get('Accept') == 'x-cache/only') {
        return caches.match(request);
    }

    //else {
    //    return fetch(request.clone()).then(function(response) {
    //        return caches.open(CURRENT_PERSON.person).then(function(cache) {
    //            // clean up the image cache
    //            Promise.all([
    //                response.clone().json(),
    //                caches.open(CURRENT_PHOTO.photo)
    //            ]).then(function(results) {
    //                var data = results[0];
    //                var imgCache = results[1];
    //
    //                var imgURLs = data.photos.photo.map(function(photo) {
    //                    return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_c.jpg';
    //                });
    //
    //                // if an item in the cache *isn't* in imgURLs, delete it
    //                imgCache.keys().then(function(requests) {
    //                    requests.forEach(function(request) {
    //                        if (imgURLs.indexOf(request.url) == -1) {
    //                            imgCache.delete(request);
    //                        }
    //                    });
    //                });
    //            });
    //
    //            cache.put(request, response.clone()).then(function() {
    //                console.log("Yey cache");
    //            }, function() {
    //                console.log("Nay cache");
    //            });
    //            return response;
    //        });
    //    });
    //}
}

//function flickrImageResponse(request) {
//    console.log('flickrRespons', request);
//    return caches.match(request).then(function(response) {
//        if (response) {
//            return response;
//        }
//
//        return fetch(request.clone()).then(function(response) {
//            caches.open(CURRENT_PHOTO.photo).then(function(cache) {
//                cache.put(request, response).then(function() {
//                    console.log('yey img cache');
//                }, function() {
//                    console.log('nay img cache');
//                });
//            });
//
//            return response.clone();
//        });
//    });
//}


//listen for communication messages
self.addEventListener('message', function (event) {
    console.log('message', event);
});


