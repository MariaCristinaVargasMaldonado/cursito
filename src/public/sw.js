console.log('sw')

const cacheName = 'cursito'

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      if (response) {
        return response;
      }

      let fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        (fetchResponse) => {
          if(!fetchResponse || fetchResponse.status !== 200) {
            return fetchResponse;
          }

          let responseToCache = fetchResponse.clone();

          caches.open(cacheName)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          })

          return fetchResponse;
        }
      )
    })
  )
})
