/* if (window.console) {
    console.log('entro al app');
  } */

  if (!window.Promise) {
    window.Promise = Promise
  }
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('../sw.js')
      .then(function (registration) {
        console.log('SW registered and scope: ', registration.scope);
      })
      .catch(function(err) {
        console.log(err)
      });
  
  }