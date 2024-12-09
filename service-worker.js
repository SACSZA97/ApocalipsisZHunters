// service-worker.js

// Cache name
const CACHE_NAME = 'apocalipsis-z-hunters-cache-v1';

// Files to cache
const assets = [
  '/',
  './index.html',
  './css/style.css',
  './css/bootstrap.min.css',
  './css/responsive.css',
  './css/jquery.mCustomScrollbar.min.css',
  './images/fevicon.png',
  './images/loading.gif',
  './images/mgtb.png',
  './js/jquery.min.js',
  './js/popper.min.js',
  './js/bootstrap.bundle.min.js',
  './js/jquery-3.0.0.min.js',
  './js/plugin.js',
  './js/jquery.mCustomScrollbar.concat.min.js',
  './js/custom.js',
  './app.js'
];


self.addEventListener('install', e => {
  e.waitUntil(
      caches.open(cacheName)
      .then(cache =>{
          return cache.addAll(assets)
              .then(() => self.skipWaiting());
      })
      .catch(err => console.log('fallo registro de cache', err))
  );
});

//Evento de activacion se ejecuta despues de que el sw se instala y toma el control de la aplicacion
self.addEventListener('activate', e => {
  const cacheWhitelist = [cacheName];
  e.waitUntil(
      cache.keys()
      .then(cacheNames =>{
          return Promise.all(
              cacheNames.map(cName => {
                  if(!cacheWhitelist.includes(cName)){
                      return caches.delete(cName);
                  }
              })
          );
      })
      .then(() => self.clients.claim())
  );
});


//Evento fetch intercepta las solicitudes de red y decide como responder
self.addEventListener('fetch', e => {
  e.respondWith(
      caches.match(e.request)
      .then(res =>{
          if(res){
              return res;
          }
          return fetch(e.request);
      })
  );
});
