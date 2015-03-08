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
    photo: 'sw-img-cache-1',
    data: 'sw-img-data-cache-1'
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
    console.log('install');

    event.waitUntil(
        //cach stuff
        caches.open(CURRENT_ASSETS.prefetch).then(function (cache) {
            console.log(cache);
            return cache.addAll([
                'index.html',
                'js/app.js',
                'js/serviceworker-cache-polyfill.js',
                'lib/ionic/css/ionic.css',
                'lib/ionic/js/ionic.bundle.js',
                'lib/ionic/js/ionic.min.js',
                'lib/ionic/js/ionic-angular.min.js',
                'lib/ionic/fonts/ionicons.ttf?v=1.5.2',
                'lib/angular-resource.js',
                'templates/persons/persons.html',
                'templates/persons/personsController.js',
                'templates/persons/personsService.js',
                'templates/persons/photoService.js',
                'templates/menu/menu.html',
                'css/style.css'
            ]);
        })
    );
});

//third step, ready to use let's go
self.addEventListener('activate', function (event) {
    // we are good to go!
    console.log('activate');
    //console.log(caches);
    //check for old caches and remove if updates are in place
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (!/^sw-/.test(cacheName)) {
                        return;
                    }
                    if (storedCaches.indexOf(cacheName) == -1) {
                        console.log('cache deleted', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', function (event) {
    //get URL from event
    var requestURL = new URL(event.request.url);

    //check if URL-hostname equals starwars API
    if (requestURL.hostname == 'swapi.co') {
        event.respondWith(swapiResponse(event.request));
    }
    else if (requestURL.hostname == 'api.flickr.com') {
        event.respondWith(flickrDataResponse(event.request))
    }
    else if (/\.staticflickr\.com$/.test(requestURL.hostname)) {
        event.respondWith(flickrImgResponse(event.request));
    }
    //no match? create a promise, check for request in cache, return response
    else {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request, {'mode': 'no-cors'});
            })
        );
    }
});

function swapiResponse(request) {
//    console.log('swapiResponse request:', request);

    //check if internet connection, return stored response
    //if (request.headers.get('statusCode') == null) {
    if (navigator.onLine == false) {
        //console.log('swapiResponse match:', caches.match(request));
        return caches.match(request);
    }

    else {
            return caches.open(CURRENT_PERSON.person).then(function (cache) {
                return cache.match(request).then(function (response) {
                    console.log('swapi fetch', request.clone());
                    var fetchPromise = fetch(request.clone()).then(function(networkResponse) {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                    return response || fetchPromise;
                });
        });
    }

}

function flickrDataResponse(request) {
    if (navigator.onLine == false) {
        return caches.match(request);
    }
    else {
        //return fetch(request.clone()).then(function (response) {
            return caches.open(CURRENT_PHOTO.data).then(function (cache) {
                return cache.match(request).then(function (response) {
                    console.log('flickr data fetch', request.clone());
                    var fetchPromise = fetch(request.clone(), {'mode': 'no-cors'}).then(function(networkResponse) {
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                    return response || fetchPromise;
                });

            });
    }
}

function flickrImgResponse(request) {
    return caches.open(CURRENT_PHOTO.photo).then(function (cache) {
        return cache.match(request).then(function (response) {
            console.log('flickr img fetch', request.clone());

            var fetchPromise = fetch(request.clone(), {'mode': 'no-cors'}).then(function (networkResponse) {
                cache.put(request, networkResponse.clone());
                return networkResponse;
            });
            return response || fetchPromise;
        });
    })
}

