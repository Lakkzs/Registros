async function cargaMunicipios(value, consulta){
    let depende = {value, consulta}
    console.log(65879, depende)
    fetch('/rt_cargaMunicipio', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(depende)
    }).then((response) => response.json())
    .then((response) => {
        document.getElementById('municipioselect').innerHTML = response.html
    })
}

function onRegistro(e) {
    e.preventDefault()
    let txtColaborador = document.getElementById('txtColaborador').value
    
    var jsonRegistroInformacion= {txtColaborador}
    
    if(txtColaborador == 'Nada' || txtColaborador== undefined) {
        alert(`Por favor llene los siguientes campos faltantes: Colaborador`)
    }else{
        fetch('/rt_info_Principal', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroInformacion)
        }).then((response) => response.json())
        .then((response) => {
            document.getElementById('info').innerHTML = response.html
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}
