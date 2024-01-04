
function onRegistro(e){
    e.preventDefault()

    var formRegistroTipoUsuario = new FormData(document.getElementById('formAltaTipoUsuario'))
    var jsonRegistroTipoUsuario = {}
    var arrFaltantes = []
    for(var key of formRegistroTipoUsuario.keys()){
        jsonRegistroTipoUsuario[key] = formRegistroTipoUsuario.get(key)
        if((jsonRegistroTipoUsuario[key] == '' || jsonRegistroTipoUsuario[key] == null || jsonRegistroTipoUsuario[key] == undefined || jsonRegistroTipoUsuario[key] == 'Nada')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }
    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_altaTipoUsuario', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroTipoUsuario)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'EXISTE'){
                alert('El Tipo de Usuario ingresado no está disponible, intente de nuevo.')
            }
            if(response.datos[0].RESULT == 'OK'){
                alert('El Tipo de Usuario se ha registrado correctamente.')
                document.getElementById('formAltaTipoUsuario').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}
