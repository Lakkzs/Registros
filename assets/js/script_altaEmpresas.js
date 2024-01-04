
function onRegistro(e){
    e.preventDefault()

    var formRegistroEmpresa = new FormData(document.getElementById('formAltaEmpresa'))
    var jsonRegistroEmpresa = {}
    var arrFaltantes = []
    var correo = ""
    var validacion = 0
    for(var key of formRegistroEmpresa.keys()){
        jsonRegistroEmpresa[key] = formRegistroEmpresa.get(key)
        if((jsonRegistroEmpresa[key] == '' || jsonRegistroEmpresa[key] == null || jsonRegistroEmpresa[key] == undefined || jsonRegistroEmpresa[key] == 'Nada') && (key != 'txtNum_Interior')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
        if(key == "txtLogo_Full" || key == "txtLogo_Una_Tinta" || key == "txtAvatar"){
            jsonRegistroEmpresa[key] = formRegistroEmpresa.get(key).name
        }
    }
    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_altaEmpresas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroEmpresa)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'EXISTE'){
                alert('El Nombre, Razón Social o RFC ingresado no está disponible, intente de nuevo.')
            }
            if(response.datos[0].RESULT == 'OK'){
                alert('La empresa ha sido registrada correctamente.')
                document.getElementById('formAltaEmpresa').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}
