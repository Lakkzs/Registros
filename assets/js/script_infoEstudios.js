function datosCol(e){
    e.preventDefault()
    let colaborador = document.getElementById('txtColaborador').value
    var colaboradora = {colaborador}
    console.log(colaborador)
    fetch('/rt_cargaInfoEstudios', {
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

    var formRegistroEstudios = new FormData(document.getElementById('formInfoEstudios'))
    var jsonRegistroEstudios = {}
    var arrFaltantes = []
    for(var key of formRegistroEstudios.keys()){
        jsonRegistroEstudios[key] = formRegistroEstudios.get(key)
        if((jsonRegistroEstudios[key] == '' || jsonRegistroEstudios[key] == null || jsonRegistroEstudios[key] == undefined || jsonRegistroEstudios[key] == 'Nada')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }
    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_altaInfoEstudios', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroEstudios)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'ACTUALIZADO'){
                alert('Los datos han sido actualizados correctamente.')
            }
            if(response.datos[0].RESULT == 'OK'){
                alert('La información de estudios se ha registrado correctamente.')
                document.getElementById('formInfoEstudios').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}