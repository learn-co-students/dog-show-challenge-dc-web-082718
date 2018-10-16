document.addEventListener('DOMContentLoaded', () => {
  renderAllDogs()
})

//on load, render all dogs
//dogs each dog goes in a table row

function renderAllDogs(){
  fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => data.forEach(dog => renderDog(dog)))
}

function renderDog(dog){
  let table = document.querySelector('table')
  let tr = document.createElement('tr')
  let nameCell = document.createElement('td')
  let breedCell = document.createElement('td')
  let sexCell = document.createElement('td')
  let editBtnCell = document.createElement('td')
  // debugger
  nameCell.setAttribute("class", 'padding center')
  nameCell.innerText = `${dog.name}`
  breedCell.setAttribute("class", 'padding center')
  breedCell.innerText = `${dog.breed}`
  sexCell.setAttribute("class", 'padding center')
  sexCell.innerText = `${dog.sex}`
  editBtnCell.setAttribute("class", 'padding center')
  editBtnCell.innerHTML = `<button id="button-${dog.id}">Edit</button>`
  tr.appendChild(nameCell)
  tr.appendChild(breedCell)
  tr.appendChild(sexCell)
  tr.appendChild(editBtnCell)
  table.appendChild(tr)

  editListener(dog)
}

function editListener(dog){
  document.querySelector(`#button-${dog.id}`).addEventListener('click', function(){
    document.querySelector('#dog-form > input[type="name"]').value = dog.name
    document.querySelector('#dog-form > input[type="breed"]').value = dog.breed
    document.querySelector('#dog-form > input[type="sex"]').value = dog.sex

    patchDogListener(dog)
    console.log("inside the edit listener")
    console.log(dog)
  })
}

// FOR TESTING LISTENERS
function logIt(dog){
  console.log(dog)
}

function patchDogListener(dog){
  document.querySelector('#dog-form').addEventListener("submit", function(){
    // e.preventDefault()
    let name = document.querySelector('#dog-form > input[type="name"]').value
    let breed = document.querySelector('#dog-form > input[type="breed"]').value
    let sex = document.querySelector('#dog-form > input[type="sex"]').value
    let data = {name: name, breed: breed, sex: sex}

    fetch(`http://localhost:3000/dogs/${dog.id}`,{
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(data)
    })
  })
  console.log("inside the patch dog function")
  console.log(dog)

  // renderAllDogs()
  // not necessary because submit form refreshes by default
}
