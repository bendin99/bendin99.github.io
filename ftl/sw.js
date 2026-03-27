self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('fdp-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/app.js'
      ]);
    })
  );
});
