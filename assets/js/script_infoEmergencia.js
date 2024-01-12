function otro(value) {
    if (value == "Otro") {
        document.getElementById('oculto').removeAttribute('hidden');
    } else {
        document.getElementById('oculto').setAttribute('hidden', 'hidden');
    }
}

function otro2(value) {
    if (value == "Otro") {
        document.getElementById('oculto2').removeAttribute('hidden');
    } else {
        document.getElementById('oculto2').setAttribute('hidden', 'hidden');
    }
}

function otro3(value) {
    if (value == "Otro") {
        document.getElementById('oculto3').removeAttribute('hidden');
    } else {
        document.getElementById('oculto3').setAttribute('hidden', 'hidden');
    }
}

function onRegistro(e) {
    e.preventDefault()
    let txtColaborador = document.getElementById('txtColaborador').value
    var jsonRegistroContacto= {txtColaborador}

    if(txtColaborador == 'Nada' || txtColaborador== undefined) {
        alert(`Por favor llene los siguientes campos faltantes: Colaborador`)
    }else{
        fetch('/rt_info_Emergencia', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroContacto)
        }).then((response) => response.json())
        .then(async (response) => {
            document.getElementById('pedazo').innerHTML = response.html
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}

function onRegistro2(e) {
    e.preventDefault()

    var formInfo = new FormData(document.getElementById('formContacto'))
    var jsonInfo = {}
    var arrFaltantes = []

    for (var key of formInfo.keys()) {
        jsonInfo[key] = formInfo.get(key)
        console.log(jsonInfo[key])
        if ((jsonInfo[key] == '' || jsonInfo[key] == null || jsonInfo[key] == undefined || jsonInfo[key] == 'Nada' ) &&
         (key != 'txtOtro' && key != 'txtOtro2'&& key != 'txtOtro3' )) {
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }

    if (arrFaltantes.length > 0) {
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    
    }else{
        fetch('/rt_altaEmergencia', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonInfo)
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos[0].RESULT == 'ACTUALIZADO'){
                alert('La información adicional ha sido actualizada correctamente.')
            }
            if(response.datos[0].RESULT == 'OK'){
                alert('La información adicional ha sido registrada correctamente.')
                document.getElementById('formContacto').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        }) 
    }

}



