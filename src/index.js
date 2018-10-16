
document.addEventListener('DOMContentLoaded', () => {
  getAllDogs();

  let form = document.getElementById('dog-form');
  form.addEventListener('submit', submitDogEdit)
})

function getAllDogs(){

  fetch("http://localhost:3000/dogs").
  then(res => res.json()).
  then(data => {data.forEach(dog => renderDogInRow(dog))})
}

function renderDogInRow(dog){
  let name = dog.name;
  let id = dog.id;
  let breed = dog.breed;
  let sex = dog.sex;

  let table = document.getElementById('table-body')

  let row = document.createElement('tr');
  row.id = `row-${id}`;
  table.appendChild(row);

  let nameTD = document.createElement('td');
  nameTD.innerText = name
  row.appendChild(nameTD);

  let breedTD = document.createElement('td');
  breedTD.innerText = breed;
  row.appendChild(breedTD);

  let sexTD = document.createElement('td');
  sexTD.innerText = sex;
  row.appendChild(sexTD);

  let button = document.createElement('button');
  button.innerText = "Edit";
  button.id = `button-${id}`;
  row.appendChild(button);

  button.addEventListener('click', editDog)
}

function editDog(e){
  let form = document.getElementById('dog-form');

  let nameForm = form.children[0];
  let breedForm = form.children[1];
  let sexForm = form.children[2];

  nameForm.value = e.target.parentElement.children[0].innerText;
  nameForm.id = e.target.id.split("-")[1];

  breedForm.value = e.target.parentElement.children[1].innerText;

  sexForm.value = e.target.parentElement.children[2].innerText;
}

function submitDogEdit(e){
  e.preventDefault();
  let id = e.target.children[0].id;
  let name = e.target.children[0].value;
  let breed = e.target.children[1].value;
  let sex = e.target.children[2].value;

  return fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json"
    },
    body:
      JSON.stringify({
        "name": name,
        "breed": breed,
        "sex": sex
      })
    }).then(res => res.json())
    .then(function(json){
      console.log(json)
      return json
    })
    .then(function(){
      document.querySelector('tbody').innerHTML = ""
    }).then(function(){
    getAllDogs()});

  }



  // (!e.currentTarget.children[0].value && !e.currentTarget.children[1].value && !e.currentTarget.children[2].value)
