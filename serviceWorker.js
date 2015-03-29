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
        //Cache, falling back to network:
        //This gives you the "Cache only" behaviour for things in the cache
        // and the "Network only" behaviour for anything not-cached
        // (which includes all non-GET requests, as they cannot be cached).
        event.respondWith(
            caches.match(event.request).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});

function swapiResponse(request) {

    //check if internet connection -> return stored response
    if (navigator.onLine == false) {
        return caches.match(request);
    }
    else {
        //Stale-while-revalidate
        //if there's a cached version available, use it, but fetch an update for next time.
        return caches.open(CURRENT_PERSON.person).then(function (cache) {
            return cache.match(request).then(function (response) {
                var fetchPromise = fetch(request.clone()).then(function (networkResponse) {
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
        //Stale-while-revalidate
        //if there's a cached version available, use it, but fetch an update for next time.
        return caches.open(CURRENT_PHOTO.data).then(function (cache) {
            return cache.match(request).then(function (response) {
                var fetchPromise = fetch(request.clone()).then(function (networkResponse) {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                });
                return response || fetchPromise;
            });

        });
    }
}

function flickrImgResponse(request) {
    if (navigator.onLine == false) {
        return caches.match(request);
    }
    else {
        //Stale-while-revalidate
        //if there's a cached version available, use it, but fetch an update for next time.
        return caches.open(CURRENT_PHOTO.photo).then(function (cache) {
            return cache.match(request).then(function (response) {
                var fetchPromise = fetch(request.clone()).then(function (networkResponse) {
                    cache.put(request, networkResponse.clone());
                    return networkResponse;
                });
                return response || fetchPromise;
            });
        })
    }
}

