console.log('sw')
/*
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

*/

importScripts('/cache/idb.js');
importScripts('/cache/db-utils.js');

let STATIC_CACHE = 'static-cursito'
let DYNAMIC_CACHE = 'dynamic-cursito'
let STATIC_FILES = [
  '/',
  '/index.html',
  '/cache/app.js',
  '/cache/add.js',
  '/cache/promise.js',
  '/cache/fetch.js',
  '/cache/idb.js',
  '/cache/db-utils.js'
]

self.addEventListener('install', function (event) {
  // console.log('[SW] Installing  ...', event)
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) {
        // console.log('[SW] App Shell cache ')
        cache.addAll(STATIC_FILES)
      }).catch(function (error){ console.log('[SW] App shell cache wrong error!', error)})
  )
})

self.addEventListener('activate', function (event) {
  // console.log('[SW] Activate ....', event)
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            // console.log('[SW] clean older cache', key)
            return caches.delete(key)
          }
        }))
      })
  )
  return self.clients.claim()
})

function isInArray(string, array) {
  let cachePath
  if (string.indexOf(self.origin) === 0) {
    // console.log('matched ', string)
    cachePath = string.substring(self.origin.length)
  } else {
    cachePath = string
  }
  return array.indexOf(cachePath) > -1
}

self.addEventListener('fetch', function (event) {

  let url = 'http://localhost:3000/api/task'

  if (event.request.url.indexOf(url) > -1) {
    event.respondWith(
      fetch(event.request)
            .then(function (res) {
              let responseCloned = res.clone()

              clearAllData('items')
                .then(function () {
                  return responseCloned.json()
                })
                .then(function (data){
                  for (let key in data) {
                    writeData('items', data[key])
                  }
                })

              return res
            })
    )
  } else if (isInArray(event.request.url, STATIC_FILES)) {
    console.log("url req: ",event.request.url)
    event.respondWith(
      caches.match(event.request).catch(function (e){console.log('Error: ', e)})
    )
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response) {
            return response
          } else {
            return fetch(event.request)
              .then(function (res) {
                return caches.open(DYNAMIC_CACHE)
                  .then(function (cache) {
                    cache.put(event.request.url, res.clone())
                    return res
                  })
              })
              .catch(function (err) {
                return caches.open(STATIC_CACHE)
                  .then(function (cache) {
                    if (event.request.headers.get('accept').includes('text/html')) {
                      return cache.match('index.html')
                    }
                  })
              })
          }
        })
    )
  }

})

