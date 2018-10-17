let currentDog = [];
let editDog = [];

document.addEventListener('DOMContentLoaded', () => {
  fetchDogData();
})

function fetchDogData()
{
  fetch('http://localhost:3000/dogs')
    .then(response => response.json())
      .then(data =>
        {
          console.log(data);
          let table = document.getElementById('table-body');

          data.forEach(function(object)
          {
            let tableRow = document.createElement('tr');
            tableRow.id = `${object['id']}tableRow`;
            tableRow.innerHTML =
              `<td name='name'>${object['name']}</td>
               <td>${object['breed']}</td>
               <td>${object['sex']}</td>
               <td><button class = 'button' id = '${object['id']}button'>Edit</button></td>`;
            table.appendChild(tableRow);
          })
          initialize();

        });
}

function initialize()
{
  addEditBtnListeners();
  addSubmitBtnLister();
}

function addEditBtnListeners()
{
  let editBtnElements = document.querySelectorAll('.button')

  editBtnElements.forEach(editBtnElement => editBtnElement.addEventListener('click', addEditBtnListener));
}

function addEditBtnListener(event)
{
  event.preventDefault();
  let editBtnElement = event.currentTarget;
  setCurrentDog(parseInt(editBtnElement.id));
  populateEditForm();
}

function setCurrentDog(dogID)
{
  let tableRowId = `${dogID}tableRow`;
  let tableRowElement = document.getElementById(tableRowId);
  let tableRowArray = tableRowElement.childNodes;
  let name = tableRowArray[0].innerText;
  let breed = tableRowArray[2].innerText;
  let sex = tableRowArray[4].innerText;
  currentDog = [dogID,
    {
      name: name,
      breed: breed,
      sex: sex
    }
  ];
};

function getEditDog()
{
  editDog = currentDog;
  editDog[1]['name'] = document.getElementById('formName').value;
  editDog[1]['breed'] = document.getElementById('formBreed').value;
  editDog[1]['sex'] = document.getElementById('formSex').value;
}

function displayEditedDog()
{
  let tableRowId = `${editDog[0]}tableRow`;
  let tableRowElement = document.getElementById(tableRowId);
  let tableRowArray = tableRowElement.childNodes;
  tableRowArray[0].innerText = editDog[1]['name'];
  tableRowArray[2].innerText = editDog[1]['breed'];
  tableRowArray[4].innerText = editDog[1]['sex'];
}

function populateEditForm()
{
  // event.preventDefault();
  // let tableRowId = `${currentDog}tableRow`;
  // let tableRowElement = document.getElementById(tableRowId);
  // let tableRowArray = tableRowElement.childNodes;
  // let name = tableRowArray[0].innerText;
  // let breed = tableRowArray[2].innerText;
  // let sex = tableRowArray[4].innerText;
  // console.log(name);
  // console.log(breed);
  // console.log(sex);

  document.getElementById('formName').value = currentDog[1]['name'];
  document.getElementById('formBreed').value = currentDog[1]['breed'];
  document.getElementById('formSex').value = currentDog[1]['sex'];
}

function addSubmitBtnLister()
{
  document.getElementById('formSubmit').addEventListener('click',
    function()
    {
      event.preventDefault();
      getEditDog();
      if (editDog === [])
      {
        return;
      }

      url = `http://localhost:3000/dogs/${editDog[0]}`;
      console.log(url);
      fetch(url,
        {
          method: 'PATCH',
          headers:
            {
              "Content-Type": "application/json"
            },
          body: JSON.stringify(editDog[1])
        }
      )
        .then(response => response.json())
          .then(data =>
            {
              console.log('Data is a success! ', data)
              displayEditedDog();
            }
          )
    }
  );
}

// function addEmailListeners(){
//   let emailElements = document.querySelectorAll('.email')
//   emailElements.forEach(el => el.addEventListener('click', addEmailListener))
// }

// <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
