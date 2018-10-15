const dogs = []

document.addEventListener('DOMContentLoaded', () => {
  loadDogs();
})

function loadDogs() {
  let url = "http://localhost:3000/dogs/"
  fetch(url)
  .then(response => response.json())
  .then(function(dogsResp){
    dogsResp.forEach(function(dog){
      renderDog(dog)
      dogs.push(dog)

    })
  })
}

function renderDog(dog){
  let table = document.querySelector("table")
  let row = document.createElement("tr")
  row.id = `dog-${dog.id}`
  table.appendChild(row)
  row.innerHTML= `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-name = "${dog.name}" data-breed = "${dog.breed}" data-sex = "${dog.sex}"data-id = "${dog.id}">Edit</button></td>`
  row.querySelector("button").addEventListener("click", populateForm)

}

function populateForm(e){
  let form = document.querySelector("#dog-form")
  form.removeEventListener("submit", updateDog)
  form.name.value = e.target.dataset.name
  form.breed.value = e.target.dataset.breed
  form.sex.value = e.target.dataset.sex
  form.dataset.dog_id = e.target.dataset.id
  form.addEventListener("submit", updateDog)
}

function updateDog(e){
  e.preventDefault()
  let id = e.target.dataset.dog_id
  let name = e.target.name.value
  let breed = e.target.breed.value
  let sex = e.target.sex.value
  let dog = {
    "name": name,
    "breed": breed,
    "sex": sex
  }
  e.target.reset()

  url = `http://localhost:3000/dogs/${id}`
  fetch(url,{
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(dog)
  })
  .then(response => response.json())
  .then(dog => renderEdits(dog))
}


function renderEdits(dog){
  let dogRow = document.querySelector(`#dog-${dog.id}`)
  dogRow.innerHTML= `<td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-name = "${dog.name}" data-breed = "${dog.breed}" data-sex = "${dog.sex}"data-id = "${dog.id}">Edit</button></td>`
  dogRow.querySelector("button").addEventListener("click", populateForm)

}
