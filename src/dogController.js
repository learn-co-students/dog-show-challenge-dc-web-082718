class DogController {

  static init() {
    Adapter.getDogs().then(DogController.renderDogs)
    const form = document.querySelector('#dog-form');
    form.addEventListener('submit', DogController.handleEditSubmit)
  }

  static renderDogs(dogs) {
    const table = document.querySelector('#table-body')
    table.innerHTML = "";
    dogs.forEach(dog => DogController.renderDog(dog))
  }

  static renderDog(dog) {
    const table = document.querySelector('#table-body')
    let newDog = new Dog(dog);
    let newRow = newDog.element();
    table.append(newRow);
  }

  static handleEditClick(e) {
    e.preventDefault();
    const id = e.target.dataset.id;
    Adapter.getDog(id).then(dog => DogController.populateForm(dog))
  }

  static populateForm(dog) {
    const form = document.querySelector('#dog-form');
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex;
    form.dataset.id = dog.id;
  }

  static handleEditSubmit(e) {
    e.preventDefault();
    const data = {
      id: e.target.dataset.id,
      name: e.target.name.value,
      breed: e.target.breed.value,
      sex: e.target.sex.value
    }

    const table = document.querySelector('#table-body')

    Adapter.postDog(data)
    .then(Adapter.getDogs)
    .then(DogController.renderDogs)

  }

}
