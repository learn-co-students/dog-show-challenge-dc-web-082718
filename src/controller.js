class Controller {
  static getDogs() {
    fetch(`http://localhost:3000/dogs`)
      .then(response => response.json())
      .then (json => {
        makeDogs(json)
      })
  }


  static populateDogForm(event) {
    event.preventDefault()
    let btnVal = event.currentTarget.classList.value
    let btn = document.querySelector(`button.${btnVal}`)
    let dogId = btnVal.split("btn-")[1]


    let name = document.querySelector(`tr.id-${dogId} td:nth-child(1)`).innerText
    let breed = document.querySelector(`tr.id-${dogId} td:nth-child(2)`).innerText
    let sex = document.querySelector(`tr.id-${dogId} td:nth-child(3)`).innerText

    let inputName = document.querySelector('#dog-form input[type=name]')
    let inputBreed = document.querySelector('#dog-form input[type=breed]')
    let inputSex = document.querySelector('#dog-form input[type=sex]')

    inputName.setAttribute("placeholder", name)
    inputName.setAttribute("value", name)
    inputBreed.setAttribute("placeholder", breed)
    inputBreed.setAttribute("value", breed)
    inputSex.setAttribute("placeholder", sex)
    inputSex.setAttribute("value", sex)
  }
  // Will re-render all dogs on the page
  static editDog(event) {
    // Need to add patch param for selecting the correct dog to edit
    event.preventDefault()
    fetch(`http://localhost:3000/dogs`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "breed": breed,
        "sex": sex
      })
    }).then (response => response.json())
    // Will this response be the whole posted object?
    .then(jsonData => makeDogs(jsonData))
  }
}
