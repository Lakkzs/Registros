
function onRegistro(e){
    e.preventDefault()

    var formRegistroTransitorios = new FormData(document.getElementById('formAltaTransitorios'))
    var jsonRegistroTransitorios = {}
    var arrFaltantes = []
    for(var key of formRegistroTransitorios.keys()){
        jsonRegistroTransitorios[key] = formRegistroTransitorios.get(key)
        if((jsonRegistroTransitorios[key] == '' || jsonRegistroTransitorios[key] == null || jsonRegistroTransitorios[key] == undefined || jsonRegistroTransitorios[key] == 'Nada')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
        
    }
        if(arrFaltantes.length > 0){
            alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
        }
        else{
            fetch('/rt_altaTransitorios', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonRegistroTransitorios)
            }).then((response) => response.json())
            .then((response) => {
                console.log(response)
                if(response.datos[0].RESULT == 'EXISTE'){
                    alert('El nombre del transitorio ingresado no está disponible, intente de nuevo.')
                }
                if(response.datos[0].RESULT == 'OK'){
                    alert('El transitorio ha sido registrado correctamente.')
                    document.getElementById('formAltaTransitorios').reset();
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        }
}
