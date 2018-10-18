class Adapter {



    static fetchDogs(){
        return fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
    }

    static fetchDog(id){
        const url = `http://localhost:3000/dogs/${id}`;
        return fetch(url)
        .then(resp => resp.json());

    }


    //edit dog
    static patchDog(data){
        const url = `http://localhost:3000/dogs/${data.id}`;
        //remove the id since we dont want and cannot modify it with
        //patch
        delete data.id

        return fetch(url,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(r => r.json())

    }





}
