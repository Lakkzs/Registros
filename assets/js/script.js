
function onRegistro(e){

    var formRegistro = new FormData(document.getElementById('formRegistro'))
    var jsonRegistro = {}
    var arrFaltantes = []

    for(var key of formRegistro.keys()){
        jsonRegistro[key] = formRegistro.get(key)
        if((jsonRegistro[key] == '' || jsonRegistro[key] == null || jsonRegistro[key] == undefined) && (key != 'txtNum_Interior')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }

    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_registro', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistro)
        }).then((response) => response.json())
        .then(async (response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'EXISTE'){
                alert('El correo ingresado no está disponible, intente de nuevo.')
            }else if(response.datos[0].RESULT == 'OK'){
                alert('El registro se ha realizado correctamente, se le ha enviado un correo de confirmación.')
                document.getElementById("formRegistro").reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}



