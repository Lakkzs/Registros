
function onRegistro(e){
    e.preventDefault()

    var formRegistroDepartamentos = new FormData(document.getElementById('formAltaDepartamentos'))
    var jsonRegistroDepartamentos = {}
    var arrFaltantes = []
    var correo = ""
    var validacion = 0
    for(var key of formRegistroDepartamentos.keys()){
        jsonRegistroDepartamentos[key] = formRegistroDepartamentos.get(key)
        if((jsonRegistroDepartamentos[key] == '' || jsonRegistroDepartamentos[key] == null || jsonRegistroDepartamentos[key] == undefined || jsonRegistroDepartamentos[key] == 'Nada' || jsonRegistroDepartamentos[key].name == '')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
        if(key == "txtImagen"){
            jsonRegistroDepartamentos[key] = formRegistroDepartamentos.get(key).name
        }
    }
    console.log(jsonRegistroDepartamentos)
    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_altaDepartamentos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroDepartamentos)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'EXISTE'){
                alert('El nombre del departamento no está disponible, intente de nuevo.')
            }
            if(response.datos[0].RESULT == 'OK'){
                alert('El registro del departamento se ha realizado correctamente.')
                document.getElementById('formAltaDepartamentos').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}
