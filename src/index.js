document.addEventListener('DOMContentLoaded', () => {
  form = document.querySelector("#dog-form")
  fetchDogs()
})

function fetchDogs(){
  fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(json => {
      json.forEach(dog => render(dog))
    })
}

function render(dog){
  let tableRow = document.createElement("tr")
  tableRow.innerHTML =
    `<td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td class="padding center"><button id="button-${dog.id}">Edit</button></td>`
  tableRow.id = `dog-${dog.id}`

  document.querySelector("#table-body").appendChild(tableRow)

  editListener(dog)
}

function editListener(dog){
  document.querySelector(`#button-${dog.id}`).addEventListener("click", function(){

    form.querySelector("input[name=name]").value = dog.name
    form.querySelector("input[name=breed]").value = dog.breed
    form.querySelector("input[name=sex]").value = dog.sex

    submitDogListener(dog)
  })
}

function submitDogListener(dog){
  document.querySelector("#dog-form").addEventListener("submit", function(){

    let name = form.querySelector("input[name=name]").value
    let breed = form.querySelector("input[name=breed]").value
    let sex = form.querySelector("input[name=sex]").value
    let data = {name: name, breed: breed, sex: sex}

    fetch(`http://localhost:3000/dogs/${dog.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(data)
    })

  })
}
