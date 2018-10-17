document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
})

//render ist of already registered dogs in the table

function fetchDogs() {
  fetch('http://localhost:3000/dogs/')
  .then(response => response.json())
  .then(data => {data.forEach(dog => render(dog))
  })
}

function render(dog) {
  let tableBody = document.querySelector("#table-body")

  let tableRow =  document.createElement("tr")
  tableRow.id = "dogs"
  tableBody.appendChild(tableRow)

  let tableCellName = document.createElement("td")
  tableCellName.innerText = dog.name
  tableRow.appendChild(tableCellName)

  let tableCellBreed = document.createElement("td")
  tableCellBreed.innerText = dog.breed
  tableRow.appendChild(tableCellBreed)

  let tableCellSex = document.createElement("td")
  tableCellSex.innerText = dog.sex
  tableRow.appendChild(tableCellSex)

  let tableCellEdit = document.createElement("td")
  tableRow.appendChild(tableCellEdit)

  let editBtn = document.createElement("button")
  editBtn.innerText = "Edit"
  editBtn.id = `${dog.id}`
  editBtn.addEventListener('click', selectDog)
  tableCellEdit.appendChild(editBtn)

}

//Clicking on the edit button next to a dog should populate the top form with that dog's current information.


function selectDog(event) {

  let allDogs = document.querySelectorAll("#dogs")
  let clickedDog = Array.from(allDogs).filter(function(dog) {
    return dog.querySelector("button").id === event.currentTarget.id
  })
  let dogForm = document.querySelector("#dog-form")
  let formName = dogForm.name
  let formBreed = dogForm.breed
  let formSex = dogForm.sex

  formName.value = clickedDog[0].childNodes[0].innerText
  formName.id = clickedDog[0].querySelector("button").id
  formBreed.value = clickedDog[0].childNodes[1].innerText
  formSex.value = clickedDog[0].childNodes[2].innerText

  dogForm.addEventListener('submit', editDog)
}

//On submit of the form, a PATCH request to edit the dog


function editDog(event)  {
  event.preventDefault()
    let id = event.currentTarget.name.id
    let name = event.currentTarget.name.value
    let breed = event.currentTarget.breed.value
    let sex = event.currentTarget.sex.value
    let data = {
      name: name,
      breed: breed,
      sex: sex,
    }
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(data)
   })
   .then(res => res.json())
   .then(json => {rerenderDogs(json)
   })
}

function rerenderDogs(json) {
    let allDogs = document.querySelectorAll("#dogs")
    let clickedDog = Array.from(allDogs).filter(function(dog) {
      return parseInt(dog.querySelector("button").id) === json.id
    })
    clickedDog[0].childNodes[0].innerText = json.name
    clickedDog[0].childNodes[1].innerText = json.breed
    clickedDog[0].childNodes[2].innerText = json.sex
}
