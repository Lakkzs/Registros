
function onRegistro(e){
    e.preventDefault()

    var formInfo = new FormData(document.getElementById('formInfo'))
    var jsonInfo = {}
    var arrFaltantes = []
    var validacion = 0
    for(var key of formInfo.keys()){
        jsonInfo[key] = formInfo.get(key)
        console.log(jsonInfo[key])
        if((jsonInfo[key] == '' || jsonInfo[key] == null || jsonInfo[key] == undefined  || jsonInfo[key] == 'Nada' )){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }
    console.log(arrFaltantes);
    if(validacion == 1){
        if(arrFaltantes.length > 0){
            alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
        }
        // else{
        //     fetch('/rt_recuperar', {
        //         method: 'POST',
        //         headers: {'Content-Type': 'application/json'},
        //         body: JSON.stringify(jsonInfo)
        //     }).then((response) => response.json())
        //     .then((response) => {
        //         console.log(response)
        //         if(response.resp.datos[0].RESULT == 'INCORRECTO'){
        //             alert('El correo ingresado no está registrado, intente de nuevo.')
        //         }
        //         if(response.resp.datos[0].RESULT == 'ACTUALIZADO'){
        //             alert('La recuperación se ha realizado correctamente, se le ha enviado un correo con su nueva contraseña.')
        //             document.getElementById('formInfo').submit();
        //         }
        //     })
        //     .catch(function (err) {
        //         console.log(err)
        //     })
        // }
    }
    else{
        if(arrFaltantes.length > 0){
            alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
        }
    }
}

