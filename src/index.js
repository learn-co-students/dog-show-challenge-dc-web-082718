
document.addEventListener('DOMContentLoaded', () => {
  getAllDogs()
  submitForm()
})


function getAllDogs() {
  fetch('http://localhost:3000/dogs')
  .then(r => r.json())
  .then(dogs => {
    dogs.forEach(dog => render(dog))
  })
}

function render(dog) {
  let dogTable = document.getElementById('dog-table')
  let dogRow = document.createElement('tr')
  let dogName = document.createElement('td')
  let dogBreed = document.createElement('td')
  let dogSex = document.createElement('td')
  let editButton = document.createElement('button')
  dogName.innerText = `${dog.name}`
  dogBreed.innerText = `${dog.breed}`
  dogSex.innerText = `${dog.sex}`
  editButton.innerText = "Edit"
  editButton.id = `edit-${dog.id}`
  editButton.dataset.id = `${dog.id}`
  editButton.addEventListener('click',populateForm)
  dogRow.appendChild(dogName)
  dogRow.appendChild(dogBreed)
  dogRow.appendChild(dogSex)
  dogRow.appendChild(editButton)
  dogTable.appendChild(dogRow)
}

function submitForm() {
  let form = document.getElementById('dog-form')
  form.addEventListener('submit',function(event){
    event.preventDefault()
    console.log("clickedSubmit");
    updateDog()
  })
}

function updateDog() {
  let table = document.getElementById("dog-table")
  let id = event.currentTarget.dataset.id.split("-")[1]
  let url = `http://localhost:3000/dogs/${id}`
  let form = document.getElementById('dog-form')
  console.log(form.name.value);
  let name = form.name.value
  let breed = form.breed.value
  let sex = form.sex.value
  let body = {
      name: name,
      breed: breed,
      sex: sex
    }
  let options = {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch(url, options)
    .then(r => r.json())
    table.reset()
    getAllDogs()
  }


function populateForm(event) {
  console.log("youclickedEdit")
  let sex = this.previousElementSibling
  let breed = sex.previousElementSibling
  let name = breed.previousElementSibling
  let form = document.getElementById('dog-form')
  form.dataset.id = this.id
  form.breed.value = breed.innerText
  form.sex.value = sex.innerText
  form.name.value = name.innerText
}
//Grab the form element
//Populate the form with the values from the dog that you pressed edit on
//upon submition of the form send a patch ubdate to that specific object in the DB
//Make sure that new content renders
