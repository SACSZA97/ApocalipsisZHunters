// service-worker.js v.2

// Nombre del caché
const CACHE_NAME = 'apocalipsis-z-hunters-cache-v1';

// Archivos que queremos cachear
const urlsToCache = [
  './index.html',
  './css/style.css',
  './css/bootstrap.min.css',
  './css/responsive.css',
  './css/jquery.mCustomScrollbar.min.css',
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

// Evento de instalación
self.addEventListener('install', event => {
  console.log('Service Worker instalado');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Archivos cacheados');
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento de activación
self.addEventListener('activate', event => {
  console.log('Service Worker activado');
  
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Eliminando caché antiguo: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de fetch (intercepta las solicitudes)
self.addEventListener('fetch', event => {
  console.log('Interceptando fetch para:', event.request.url);
  
  event.respondWith(
    caches.match(event.request).then(response => {
      // Devuelve el archivo desde el caché si existe
      return response || fetch(event.request).then(fetchResponse => {
        // Cachea dinámicamente los nuevos recursos
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        });
      }).catch(() => {
        // Fallback para solicitudes fallidas (opcional)
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
