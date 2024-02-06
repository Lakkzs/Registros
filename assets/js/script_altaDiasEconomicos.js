function onRegistro(e) {
    e.preventDefault()
    let txtTiempo = document.getElementById('txtTiempo').value
    var jsonRegistroInformacion= {txtTiempo}

    if(txtTiempo == NaN || txtTiempo == undefined || txtTiempo == '' || txtTiempo == 'Nada') {
        alert(`Por favor llene los siguientes campos faltantes: Tiempo`)
    }else{
        fetch('/rt_buscarDias', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroInformacion)
        }).then((response) => response.json())
        .then(async (response) => {
            document.getElementById('asd2').innerHTML = response.html
           
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}


function onRegistro2(e) {
    e.preventDefault()

    var formInfo = new FormData(document.getElementById('formAltaDias'))
    var jsonInfo = {}
    var arrFaltantes = []

    for (var key of formInfo.keys()) {
        jsonInfo[key] = formInfo.get(key)
        console.log(jsonInfo[key])
        if ((jsonInfo[key] == '' || jsonInfo[key] == null || jsonInfo[key] == undefined || jsonInfo[key] == NaN)) {
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }

    if (arrFaltantes.length > 0) {
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }else{
        fetch('/rt_altaDias', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonInfo)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'ACTUALIZADO'){
                alert('La información adicional ha sido actualizada correctamente.')
                document.getElementById('formAltaDias').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        }) 
    }

}