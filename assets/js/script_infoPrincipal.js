async function cargaMunicipios(value, CIUDAD_COLABORADOR){
    let depende = {value, CIUDAD_COLABORADOR}
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
        .then(async (response) => {
            document.getElementById('info').innerHTML = response.html
            let element = document.getElementById('txtEstado').value
            let element1 = document.getElementById('txtCiudad').value
            await cargaMunicipios(element, element1)
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}
