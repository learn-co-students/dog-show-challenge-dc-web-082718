class Adapter {

  static getDogs(r) {
    console.log(r)
    return fetch('http://localhost:3000/dogs')
    .then(res => res.json())
  }

  static getDog(id) {
    return fetch(`http://localhost:3000/dogs/${id}`)
    .then(res => res.json())
  }

  static postDog(data) {
    const url = `http://localhost:3000/dogs/${data.id}`
    delete data.id;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    return fetch(url, options).then(res => res.json())
  }

}
