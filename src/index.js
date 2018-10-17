// Initialize fetch for dogs, create dog objects, and render them to the page (in that order)
document.addEventListener('DOMContentLoaded', () => {
  Controller.getDogs()
  addSubmitListener()
})

function addSubmitListener() {
  submitBtn = document.querySelector(`form#dog-form input[type=submit]`)
  submitBtn.addEventListener('submit', (e) => {
    Dog.editDog(e)
  })
}

// Takes JSON get request, creates dog object for each, render to page, and returns map
function makeDogs(data) {
  return data.map(dog => {
    render(new Dog(dog))
  })
}

// Called for each dog class instance
function render(obj) {
  let tableBody = document.querySelector('#table-body')
  let newDog = document.createElement('tr')
  // Add each property of dog object to newDog HTML element
  for (let property in obj) {
    if (property == 'id') {
      newDog.classList.add(`id-${obj[property]}`)
    } else {
      let elem = document.createElement('td')
      elem.innerHTML = obj[property]
      newDog.appendChild(elem)
    }
  }
  let elem = document.createElement('td')
  let button = document.createElement('button')
  button.classList = `btn-${obj.id}`
  button.innerText = 'Edit'
  button.addEventListener('click', Controller.populateDogForm)
  elem.appendChild(button)
  newDog.appendChild(elem)
  tableBody.appendChild(newDog)

  // newRow.classList.add(`id-${id}`)
}
