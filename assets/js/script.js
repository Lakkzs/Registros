
function onRegistro(e){
    e.preventDefault()

    let enviarFormulario = true;
    var formRegistro = new FormData(document.getElementById('formRegistro'))
    var jsonRegistro = {}
    var arrFaltantes = []
    var correo = ""

    for(var key of formRegistro.keys()){
        jsonRegistro[key] = formRegistro.get(key)
        if((jsonRegistro[key] == '' || jsonRegistro[key] == null || jsonRegistro[key] == undefined) && (key != 'txtNum_Interior')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
        if(key == 'txtCorreo'){
            correo = jsonRegistro[key]
        }
    }
    console.log(2)

    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_registro', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistro)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'EXISTE'){
                alert('El correo ingresado no está disponible, intente de nuevo.')

            }
            if(response.datos[0].RESULT == 'OK'){
                console.log(8)
                alert('El registro se ha realizado correctamente, se le ha enviado un correo de confirmación.')
                console.log(correo)
                document.getElementById('formRegistro').submit();
            }
        })
        .catch(function (err) {
            enviarFormulario = false;
            console.log(err)
        })
    }
}
