
function onRegistro(e){
    e.preventDefault()

    var formLogin = new FormData(document.getElementById('formLogin'))
    var jsonLogin = {}
    var arrFaltantes = []

    for(var key of formLogin.keys()){
        console.log(formLogin.get(key))
        jsonLogin[key] = formLogin.get(key)
    }
    console.log(jsonLogin)
    fetch('/rt_login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonLogin)
    }).then((response) => response.json())
        .then((response) => {
            console.log(response)
        })
        .catch(function (err) {
            console.log(err)
        })

    // for(var key of formLogin.keys()){
    //     jsonLogin[key] = formLogin.get(key)
    //     if((jsonLogin[key] == '' || jsonLogin[key] == null || jsonLogin[key] == undefined)){
    //         arrFaltantes.push(' ' + key.replace("txt", ""))
    //     }
    // }

    // if(arrFaltantes.length > 0){
    //     alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    // }
    // else{
    //     fetch('/rt_login', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(jsonLogin)
    //     }).then((response) => response.json())
    //     .then((response) => {
    //         console.log(response)
    //         // if(response.datos[0].RESULT == 'EXISTE'){
    //         //     alert('El correo ingresado no está disponible, intente de nuevo.')
    //         // }else if(response.datos[0].RESULT == 'OK'){
    //         //     alert('El registro se ha realizado correctamente.')
    //         //     document.getElementById("formLogin").reset();
    //         // }
    //     })
    //     .catch(function (err) {
    //         console.log(err)
    //     })
    // }
}



