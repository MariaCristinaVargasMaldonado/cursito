

//let addButton = document.getElementById("add")
/*
let pictures = document.getElementById("tasks")

function updateUI(data) {
  clearPictures()
  for (let i = 0; i < data.length; i++) {
    console.log(data[i], "\n") 
    createImage(data[i])
  }
}


function clearPictures() {
  while(pictures.hasChildNodes()) {
    pictures.removeChild(pictures.lastChild)
  }
}

function createImage(data){
  let imageBlock = document.createElement('div')
  imageBlock.className = 'w3-row w3-margin w3-mobile'
  let imageItem = document.createElement('div')
  imageItem.className = 'w3-third'
  let img = document.createElement('img')
  img.src = data.imageurl

  let textItem = document.createElement('div')
  textItem.className = 'w3-twothird w3-container w3-mobile'
  let title = document.createElement('h2')
  title.textContent = data.title
  let text = document.createElement('p')
  text.innerHTML = 'source: ' + data.text

  imageBlock.appendChild(imageItem)
  imageBlock.appendChild(textItem)
  imageItem.appendChild(img)
  textItem.appendChild(title)
  textItem.appendChild(text)

  pictures.appendChild(imageBlock)
}
*/

let url = 'http://localhost:3000/api/task'
let networkDataReceived = false

fetch(url)
  .then(function(res) {
    //  console.log('lleog aqui')
    return res.json()
  })
  .catch(err => console.error(err))
  .then(function(data) {
    networkDataReceived = true
    console.log('From web', data)
    let dataArray = [];
    for (let key in data) {
      dataArray.push(data[key])
    }    
  })
  .catch(err => console.error(err))


if ('indexedDB' in window) {
    readAllData('items')
    .then(function(data) {
      if (!networkDataReceived) {
        console.log('From idb', data)
        //updateUI(data)
      }
    })
}
