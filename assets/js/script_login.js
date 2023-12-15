
function onRegistro(e){
    e.preventDefault()

    var formLogin = new FormData(document.getElementById('formLogin'))
    var jsonLogin = {}
    var arrFaltantes = []

    var correo = ""
    var validacion = 0
    for(var key of formLogin.keys()){
        jsonLogin[key] = formLogin.get(key)
        if((jsonLogin[key] == '' || jsonLogin[key] == null || jsonLogin[key] == undefined)){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
        if(key == 'txtCorreo'){
            if(jsonLogin[key].includes("@")){
                correo = jsonLogin[key]
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
            fetch('/rt_login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonLogin)
            }).then((response) => response.json())
            .then((response) => {
                console.log(response)
                if(response.datos[0].RESULT == 'USUARIO NO ENCONTRADO'){
                    alert('Los datos ingresados son incorrectos, intente de nuevo.')
                }
                if(response.datos[0].RESULT == 'USUARIO ENCONTRADO'){
                    alert('Sesión iniciada correctamente.')
                    document.getElementById('formLogin').submit();
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        }
    }
}



