
function onRegistro(e) {
    e.preventDefault()
    let txtAnios = document.getElementById('txtColaborador').value
    var jsonRegistroInformacion= {txtAnios}

    if(txtAnios == NaN || txtAnios == undefined || txtAnios == ' ' || txtAnios == 'Nada') {
        alert(`Por favor llene los siguientes campos faltantes: Colaborador`)
    }else{
        fetch('/rt_cargaseccion', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroInformacion)
        }).then((response) => response.json())
        .then(async (response) => {
            document.getElementById('asd').innerHTML = response.html
           
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}