class Dog {

  constructor({name, breed, sex, id}) {
    this.name = name;
    this.breed = breed;
    this.sex = sex;
    this.id = id;
  }

  element() {

    let row = document.createElement('tr');

    let nameBox = document.createElement('td');
    nameBox.innerText = this.name;
    row.appendChild(nameBox);

    let breedBox = document.createElement('td')
    breedBox.innerText = this.breed;
    row.appendChild(breedBox);

    let sexBox = document.createElement('td');
    sexBox.innerText = this.sex;
    row.appendChild(sexBox)

    let editBox = document.createElement('td');
    editBox.innerText = "Edit Dog";
    editBox.dataset.id = this.id;
    editBox.style.color = "Blue";
    editBox.addEventListener('click', DogController.handleEditClick);
    row.appendChild(editBox);

    return row

  }

}
