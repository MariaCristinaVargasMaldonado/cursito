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

  const permissions = document.getElementById('permissions')
  permissions.addEventListener('click',()=>{
    if(Notification.permission !== 'granted'){
      getPermissions()
    }else{
     /*  notify() */
    }
  })

  const getPermissions = () =>{
    Notification.requestPermission()
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
