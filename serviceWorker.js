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

var storedCaches = [
    CURRENT_ASSETS.prefetch,
    CURRENT_PHOTO.photo
];

//first step downloading
//no listener for that :D

//second step installing
self.oninstall = function (event) {
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
                'templates/home/photoModel.js',
                'templates/menu/menu.html',
                'templates/settings/settings.html',
                'css/style.css'
            ]);
        }),
        console.log(caches.keys)
    );

};


//third step, ready to use let's go
self.onactivate = function (event) {
    // we are good to go!
    console.log('activated');
    console.log(caches.keys);
    //check for old caches and remove if updates are in place
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (!/^sw-/.test(cacheName)) {
                        return;
                    }
                    if (expectedCaches.indexOf(cacheName) == -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
};


self.addEventListener('fetch', function (event) {
    console.log('fetched', event);
    alert('test');

    event.respondWith(
        caches.match(event.request.clone()).then(
            function(response) {
                console.log(response);
                return null;
            }));
});

//listen for communication messages
self.addEventListener('message', function(event) {
    console.log('message', event);
});


