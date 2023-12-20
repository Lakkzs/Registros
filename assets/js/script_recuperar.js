
function onRegistro(e){
    e.preventDefault()

    var formRecuperar = new FormData(document.getElementById('formRecuperar'))
    var jsonRecuperar = {}
    var arrFaltantes = []
    var correo = ""
    var validacion = 0
    for(var key of formRecuperar.keys()){
        jsonRecuperar[key] = formRecuperar.get(key)
        if((jsonRecuperar[key] == '' || jsonRecuperar[key] == null || jsonRecuperar[key] == undefined)){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
        if(key == 'txtCorreo'){
            if(jsonRecuperar[key].includes("@")){
                correo = jsonRecuperar[key]
                validacion = 1
            }else{
                alert('Por favor ingrese un correo válido.')
            }
        }
    }
    if(validacion == 1){
        if(arrFaltantes.length > 0){
            alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
        }
        else{
            fetch('/rt_recuperar', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonRecuperar)
            }).then((response) => response.json())
            .then((response) => {
                console.log(response)
                if(response.resp.datos[0].RESULT == 'INCORRECTO'){
                    alert('El correo ingresado no está registrado, intente de nuevo.')
                }
                if(response.resp.datos[0].RESULT == 'ACTUALIZADO'){
                    alert('La recuperación se ha realizado correctamente, se le ha enviado un correo con su nueva contraseña.')
                    document.getElementById('formRecuperar').submit();
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        }
    }
    else{
        if(arrFaltantes.length > 0){
            alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
        }
    }
}

