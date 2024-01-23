function datosCol(e){
    e.preventDefault()
    let colaborador = document.getElementById('txtColaborador').value
    var colaboradora = {colaborador}
    console.log(colaborador)
    fetch('/rt_cargaInfoSalud', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(colaboradora)
    }).then((response) => response.json())
    .then(async (response) => {
        console.log(10, response)
        document.getElementById('info').innerHTML = response.html
    })
    .catch(function (err) {
        console.log(err)
    })
}
function onRegistro(e){
    e.preventDefault()

    var formRegistroSalud = new FormData(document.getElementById('formInfoSalud'))
    var jsonRegistroSalud = {}
    var arrFaltantes = []
    for(var key of formRegistroSalud.keys()){
        jsonRegistroSalud[key] = formRegistroSalud.get(key)
        if((jsonRegistroSalud[key] == '' || jsonRegistroSalud[key] == null || jsonRegistroSalud[key] == undefined || jsonRegistroSalud[key] == 'Nada')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }
    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_altaInfoSalud', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroSalud)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'ACTUALIZADO'){
                alert('Los datos han sido actualizados correctamente.')
            }
            if(response.datos[0].RESULT == 'OK'){
                alert('La información de salud se ha registrado correctamente.')
                document.getElementById('formInfoSalud').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}