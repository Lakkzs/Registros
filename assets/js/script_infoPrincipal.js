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

async function onRegistro(e) {
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
            // if(document.getElementById('txtEstado').value != 'Nada'){
                let element = document.getElementById('txtEstado').value
                let element1 = document.getElementById('txtCiudad').value
                await cargaMunicipios(element, element1)
            // }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}

async function onRegistro2(e){
    e.preventDefault()

    var formRegistroColaboradorPrincipal = new FormData(document.getElementById('formInfoPrincipal'))
    var jsonRegistroColaboradorPrincipal = {}
    var arrFaltantes = []

  
    for(var key of formRegistroColaboradorPrincipal.keys()){
        jsonRegistroColaboradorPrincipal[key] = formRegistroColaboradorPrincipal.get(key)
        if((jsonRegistroColaboradorPrincipal[key] == '' || jsonRegistroColaboradorPrincipal[key] == null || jsonRegistroColaboradorPrincipal[key] == undefined || jsonRegistroColaboradorPrincipal[key] == 'Nada') && (key != 'txtNum_Interior')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }
    console.log(jsonRegistroColaboradorPrincipal)
        if(arrFaltantes.length > 0){
            alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
        }
        else{
            fetch('/rt_altaInfoPrincipal', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonRegistroColaboradorPrincipal)
            }).then((response) => response.json())
            .then(async (response) => {
                console.log(response)
                if(response.resultado[0].RESULT == 'ACTUALIZADO'){
                    alert('El registro se ha realizado correctamente')
                    document.getElementById('formInfoPrincipal').reset();
                    var jsonRegistroInformacion = {txtColaborador: 0}
                    console.log(jsonRegistroInformacion)
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
                }
                else{
                    alert('No se han podido registrar los datos correctamente.')
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        }

}

