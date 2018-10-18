
class DogController {
    static init(){
        Adapter.fetchDogs()
        .then(DogController.renderDogs)
        const form = document.querySelector('#dog-form')
        form.addEventListener('submit', DogController.handleSubmit)
    }



    static renderDogs(dogs){
        // debugger;
        // dogs.forEach()
        // debugger;
        const table = document.getElementById("table-body");
        table.innerHTML = '';
        dogs.forEach(DogController.renderDog)
        // let dog = (new Dog(dogs[0].id,dogs[0].name,dogs[0].breed,dogs[0].sex)).render();
        // console.log(dog);
        // document.getElementById("table-body").innerHTML += dog;
    }

    static renderDog(dog){
        // debugger;
        const table = document.getElementById("table-body");
        const newDog = new Dog(dog);
        table.appendChild(newDog.render());
    }

//form submit
static handleSubmit(event){
    event.preventDefault();
    //form stuff can be accessed with just the inputs name= atts

    // if event.target.dataset.id


    const data = {
        id: event.target.dataset.id,
        name: event.target.name.value,
        breed: event.target.breed.value,
        sex: event.target.sex.value

    }
    Adapter.patchDog(data)

    //this is slower for larger tables/servers with long response times
    //*****this is not really scalable and less performance vs just rerendering one row
    .then(Adapter.fetchDogs) //refetch all the Dogs
    .then(DogController.renderDogs) // rerender the whole page again
    //-> probably just need to render the row instead of getting everything
    //since we have change from patchDog response
    event.target.reset();
    event.target.dataset.id = ''
}

//click edit button -> load row data into edit form "dog-form"
//fetch that dog based on id saved in button

//get dog from datatable or transfer from html row
//dont really need to fetch can assign data from row in column
//this is slower for larger tables/servers with long response times
static editClick(event){

    //can refetch or just get that rows info from page
    const dogRow = document.getElementById(`dog-${event.target.dataset.id}`);

    const form = document.querySelector('#dog-form')

    //roundabout but doesnt require another fetch
    form.dataset.id = event.target.dataset.id;
    form.name.value = dogRow.children[0].innerText
    form.breed.value = dogRow.children[1].innerText
    form.sex.value = dogRow.children[2].innerText



}


//render one dog
//render all dogs

//on page load fetch all dogs from localhost:3000/dogs and render in the table
//with margin flex class - add id

// Dog object is a <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>


//on form submit -> Fetch Patch to http://localhost:3000/dogs/:id name,breed,sex
//update table on patch response

}
