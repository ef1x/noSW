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
        //console.log('swapi response', event.respondWith(swapiResponse(event.request)));
        event.respondWith(swapiResponse(event.request));
    }
    //// check if URL contains parts of image URL
    //else if (/\.staticflickr\.com$/.test(requestURL.hostname)) {
    //    console.log('flikr', requestURL.hostname);
    //
    //    event.respondWith(flickrImageResponse(event.request));
    //}

    //no match? create a promise, check for request in cache, return match
    //else {
    //    //caches match return promise, looks for matches in caches
    //    caches.match(event.request)
    //        .then(function (response) {
    //            //if matching response, return cache
    //            if (response) {
    //                return response;
    //            }
    //            //otherwise do fetch request to network if possible
    //            return fetch(event.request);
    //        })
    //}

    else {
        event.respondWith(
            caches.match(event.request, {
                ignoreVary: true
            })
        );
    }
});

function swapiResponse(request) {
    console.log('swapi requestheader', request.headers.get('statusCode'));

    console.log('swapi request', request);
    console.log('online?', navigator.onLine);

    //check if .... return stored response
    //if (request.headers.get('statusCode') == null) {
    if (navigator.onLine == false) {
        console.log('match', caches.match(request));
        return caches.match(request);
    }

    else {
        return fetch(request.clone()).then(function(response) {
            return caches.open(CURRENT_PERSON.person).then(function(cache) {

                cache.put(request, response.clone())
                    .then(function() {
                    console.log("Yey cache");
                })
                    .catch(function() {
                    console.log("Nay cache");
                });
                return response;
            });
        });
    }
}




//listen for communication messages
self.addEventListener('message', function (event) {
    console.log('message', event);
});


