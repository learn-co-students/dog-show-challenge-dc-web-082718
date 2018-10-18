class Dog {

    //put the values in a object since the response from fetch is a {}
    constructor({id,name,breed,sex}){

        this.name = name;
        this.breed = breed;
        this.sex = sex;
        this.id = id;

    }


    render(){
        const row = document.createElement('tr')
            row.id = `dog-${this.id}`
            const sex = document.createElement('td')
            sex.innerText = this.sex
            sex.classList.add('sex')
            const name = document.createElement('td')
            name.innerText = this.name
            name.classList.add('name')
            const breed = document.createElement('td')
            breed.innerText = this.breed
            breed.classList.add('breed')
            const edit = document.createElement('td')
            const btn = document.createElement('button')
            btn.innerText = 'Edit Dog'
            btn.dataset.id = this.id
            btn.addEventListener('click', DogController.editClick)
            edit.append(btn)
            row.append(name, breed, sex, edit)
            return row

        // `
        // <tr id=\"dog-${this.id}\">
        //     <td class=\"name\">${this.name}</td>
        //     <td class=\"breed\">${this.breed}</td>
        //     <td class=\"sex\">${this.sex}</td>
        //     <td><button class=\'dog-button'\ data-id=\"${this.id}\">Edit Dog</button></td>
        // </tr>`;

    }
}
