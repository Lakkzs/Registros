let c = 20

function changeCantidad(cantidad){
    c = parseInt(cantidad)
    let params = new URLSearchParams(window.location.search);
    params.set('p', 0)
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
        document.getElementById("container").remove()
        document.getElementById("todo").innerHTML = response;
    })
    .catch(function (err) {
        console.log(err)
    })
}

function changeURLNumber(number) {

    let params = new URLSearchParams(window.location.search);   
    params.set('p', number);
    if(localStorage.cantidad == undefined){
        params.set('c', 20)
    }else{
        params.set('c', localStorage.cantidad)
    }
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

}