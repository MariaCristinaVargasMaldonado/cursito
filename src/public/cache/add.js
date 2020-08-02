
const indexedDB = window.indexedDB
const form = document.getElementById('form')
const tasks = document.getElementById('tasks')

if(indexedDB && form){
  let db 
  const request = indexedDB.open('listaTareas', 1)
  request.onsuccess = () => {
    db = request.result
    console.log('OPEN', db)
    //addbdData()
    //readData()
  }
  request.onupgradeneeded = () => {
    db = request.result
    console.log('Create', db)
    const objectStore = db.createObjectStore('Tareas', {
      autoIncrement: true
      //keyPath: 
    })
  }

  request.onerror = (error) => {
    console.log('Error', error)
  }

  const addData = (data) => {
    const transaction = db.transaction(['Tareas'], 'readwrite')
    const objectStore = transaction.objectStore('Tareas')
    const request = objectStore.add(data)
    readData()
  }
  //recoge de la bd
  
  const url = 'http://localhost:3000/api/task'
    fetch(url)
        .then(function(res) {
          //  console.log('lleog aqui')
          return res.json()
        })
        .catch(err => console.error(err))
        .then(function(data) {
          networkDataReceived = true
          //console.log('From web', data)
          let dataArray = [];
          for (let key in data) {
            dataArray.push(data[key])
            addbdData(data[key])
            //console.log('From web', data[2])
          }    
        })
        .catch(err => console.error(err))

  const addbdData = (data) => {
    const transaction = db.transaction(['Tareas'], 'readwrite')
    const objectStore = transaction.objectStore('Tareas')
    const request = objectStore.add(data)
    readData()
  }

  const readData = () => {
    const transaction = db.transaction(['Tareas'], 'readonly')
    const objectStore = transaction.objectStore('Tareas')
    const request = objectStore.openCursor()
    const fragment = document.createDocumentFragment()
    //addbdData()

    request.onsuccess = (e) => {
      const cursor = e.target.result
      //console.log(e.target)
      if(cursor){
        //console.log(cursor.value)
        /*
        const _id = document.createElement('P')
        _id.textContent = cursor.value._id
        fragment.appendChild(_id)*/

        const title = document.createElement('P')
        title.textContent = cursor.value.title
        fragment.appendChild(title)

        const description = document.createElement('P')
        description.textContent = cursor.value.description
        fragment.appendChild(description)
        cursor.continue()
      } else {
        tasks.textContent = ''
        tasks.appendChild(fragment)
        //console.log('No hay mas datos')
      }
    }
  }

  form.addEventListener('submit', (e) => {
     e.preventDefault()
     const data = {
      _id: '',
      title: e.target.title.value,
      description: e.target.description.value
     }
     console.log('adasdd:',data)
     addData(data)
  })
}