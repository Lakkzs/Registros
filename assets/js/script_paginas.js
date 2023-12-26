let c = 20

function changeCantidad(cantidad){
    c = parseInt(cantidad)
    let params = new URLSearchParams(window.location.search);
    params.set('c', c)
    window.location.search = params;
    localStorage.setItem('cantidad', cantidad)

    fetch('/tabla?' + params, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
    .then((response) => {
        console.log(13, response)
    })
    .catch(function (err) {
        console.log(err)
    })
}

function changeURLNumber(number) {
    // url.searchParams.set('p', number)
    // console.log(url.href)
    
    let params = new URLSearchParams(window.location.search);   
    params.set('p', number);
    params.set('c', localStorage.cantidad)
    window.location.search = params;
    

    fetch('/tabla?' + params, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
    .then((response) => {
        console.log(13, response)
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