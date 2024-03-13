
function onRegistro(e){
    e.preventDefault()

    var formRegistroPuestos = new FormData(document.getElementById('formAltaPuestos'))
    var jsonRegistroPuestos = {}
    var arrFaltantes = []
    for(var key of formRegistroPuestos.keys()){
        jsonRegistroPuestos[key] = formRegistroPuestos.get(key)
        if((jsonRegistroPuestos[key] == '' || jsonRegistroPuestos[key] == null || jsonRegistroPuestos[key] == undefined || jsonRegistroPuestos[key] == 'Nada')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
        
    }
        if(arrFaltantes.length > 0){
            alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
        }
        else{
            fetch('/rt_altaPuestos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonRegistroPuestos)
            }).then((response) => response.json())
            .then((response) => {
                console.log(response)
                if(response.datos[0].RESULT == 'EXISTE'){
                    alert('El puesto ingresado no está disponible, intente de nuevo.')
                }
                if(response.datos[0].RESULT == 'OK'){
                    alert('El puesto ha sido registrado correctamente')
                    document.getElementById('formAltaPuestos').reset();
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        }
}
