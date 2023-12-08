
function onRegistro(e){
    e.preventDefault()
    var formVerify = new FormData(document.getElementById('formVerify'))
    var jsonVerify = {}

    for(var key of formVerify.keys()){
        console.log(formVerify.get(key))
        jsonVerify[key] = formVerify.get(key)
    }
    console.log(jsonVerify)
    fetch('/rt_verify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonVerify)
    }).then((response) => response.json())
    .then((response) => {
        console.log(response)
        if(response.datos[0].RESULT == 'INCORRECTO'){
            alert('El código ingresado es incorrecto o es invalido, intente de nuevo.')
        }
        if(response.datos[0].RESULT == 'COINCIDE'){
            alert('¡Su cuenta ha sido confirmada correctamente! Se le ha enviado un correo electrónico con su contraseña temporal.')
            document.getElementById('formVerify').submit();
        }
    })
    .catch(function (err) {
        console.log(err)
    })

}



