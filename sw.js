var CACHE_NAME = 'mycache';
var urlsToCache = [
    '/',
		'../index.html',
		'../images/dian.jpg',
		'../images/logo.png',
    '../manifest.json',
		'../project3/images/a.jpg',
		'../project3/images/b.jpg',
		'../project3/images/c.jpg',
		'../project3/images/d.jpg',
		'../project3/images/e.jpg',
        '../project1/index.html',
        '../project2/leaflet.css',
        '../project2/leaflet.js',
        '../project2/index.html',
        '../project3/index.html',
        '../project3/mystyle.css',
        '../project3/leaflet.css',
        '../project3/leaflet.js',
		'../project3/app.js',
		'../project3/lokasi.json',
        '../project4/index.html',
		'../project4/restaurant.html',
		'../project4/restaurant.html?id=1',
		'../project4/restaurant.html?id=2',
		'../project4/restaurant.html?id=3',
		'../project4/restaurant.html?id=4',
		'../project4/restaurant.html?id=5',
		'../project4/restaurant.html?id=6',
		'../project4/restaurant.html?id=7',
		'../project4/restaurant.html?id=8',
		'../project4/restaurant.html?id=9',
		'../project4/restaurant.html?id=10',
		'../project4/js/dbhelper.js',
		'../project4/js/main.js',
		'../project4/js/restaurant_info.js',
		'../project4/img/1.jpg',
		'../project4/img/2.jpg',
		'../project4/img/3.jpg',
		'../project4/img/4.jpg',
		'../project4/img/5.jpg',
		'../project4/img/6.jpg',
		'../project4/img/7.jpg',
		'../project4/img/8.jpg',
		'../project4/img/9.jpg',
		'../project4/img/10.jpg',
		'../project4/data/restaurants.json',
		'../project4/css/styles.css',
		'../project3/drawn-food-restaurant-icon-536491-5448571.svg',
		'../project5/images/a.jpg',
		'../project5/images/b.jpg',
		'../project5/images/c.jpg',
		'../project5/images/d.jpg',
		'../project5/images/e.jpg',
        '../project5/index.html',
        '../project5/mystyle.css',
		'../project5/peta.js',
		'../project5/peta.json',
		'../project5/drawn-food-restaurant-icon-536491-5448571.svg'	
];
console.log('Caching Files');

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('installing service-worker');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                var x = cache.addAll(urlsToCache);
                console.log('cache added');
                return x;
            })
    );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys(CACHE_NAME).then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return true;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    
                     fetchFromNetworkAndCache(event);
                     return fetch(event.request);
                }
            )
    );
});


function fetchFromNetworkAndCache(e) {
  if (e.request.cache === 'only-if-cached'&& e.request.mode !== 'same-origin') return;

  return fetch(e.request).then(res => {
    // foreign requests may be res.type === 'opaque' and missing a url
    if (!res.url) return res;
    // regardless, we don't want to cache other origin's assets
    if (new URL(res.url).origin !== location.origin) return res;

    return caches.open(CACHE_NAME).then(cache => {
      // TODO: figure out if the content is new and therefore the page needs a reload.
      cache.put(e.request, res.clone());
      return res;
    });
  }).catch(err => console.error(e.request.url, err));
}
