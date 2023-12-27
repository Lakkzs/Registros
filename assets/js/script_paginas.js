let c = 20

function changeCantidad(cantidad){
    c = parseInt(cantidad)
    let params = new URLSearchParams(window.location.search);
    params.set('c', c)
    localStorage.setItem('cantidad', cantidad)
    //window.location.search = params;
    window.history.replaceState({}, "", "tabla?"+params);
    

    fetch('/tabla?' + params, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.text())
    .then((response) => {
        console.log(13, response)
    })
    .catch(function (err) {
        console.log(err)
    })
}

function changeURLNumber(number) {

    let params = new URLSearchParams(window.location.search);   
    params.set('p', number);
    params.set('c', localStorage.cantidad)
    //window.location.search = params;
    window.history.replaceState({}, "", "tabla?"+params);
    

    fetch('/tabla?' + params, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.text())
    .then((response) => {
        console.log(13, response)
        document.getElementById("container").remove()
        document.getElementById("todo").innerHTML = response;
    })
    .catch(function (err) {
        console.log(err)
    })



    // fetch(url.href, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // }).then((response) => response.json())
    // .then((response) => {
    //     console.log(response)
    // })
    // .catch(function (err) {
    //     console.log(err)
    // })
}