let c = 20
let pags = Paginas

function changeCantidad(cantidad){
    c = parseInt(cantidad)
    let params = new URLSearchParams(window.location.search);
    params.set('p', 0)
    params.set('c', c)
    localStorage.setItem('cantidad', cantidad)
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
    if(number == 5){
        let element1 = document.getElementById('Cuarto')
        let element2 = document.getElementById('Quinto')
        let element3 = document.getElementById('Sexto')
    }
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

function numerosPaginacion(){

}