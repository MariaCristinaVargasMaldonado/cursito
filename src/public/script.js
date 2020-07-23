if (window.console) {
    console.log('PWA cache example');
  }
  
  if ('serviceWorker' in navigator) {
    
    navigator.serviceWorker.register('sw.js')

    .then(function(registration) {
      console.log('ServiceWorker registered and scope: ', registration.scope)
    })
    .catch(function(err) {
      console.log('ServiceWorker register failed: ', err);
    })
  } 