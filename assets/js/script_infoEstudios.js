function onRegistro(e){
    e.preventDefault()

    var formRegistroColaborador = new FormData(document.getElementById('formAltaColaborador'))
    var jsonRegistroColaborador = {}
    var arrFaltantes = []
    var correo = ""
    var validacion = 0
    for(var key of formRegistroColaborador.keys()){
        jsonRegistroColaborador[key] = formRegistroColaborador.get(key)
        if((jsonRegistroColaborador[key] == '' || jsonRegistroColaborador[key] == null || jsonRegistroColaborador[key] == undefined || jsonRegistroColaborador[key] == 'Nada') && (key != 'txtNum_Interior')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }
    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_altaColaborador', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroColaborador)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'EXISTE'){
                alert('El correo ingresado no está disponible, intente de nuevo.')
            }
            if(response.datos[0].RESULT == 'OK'){
                alert('El registro se ha realizado correctamente, se le ha enviado un correo de confirmación con su contraseña temporal.')
                document.getElementById('formAltaColaborador').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}