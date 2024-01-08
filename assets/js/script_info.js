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

function dependencia(value) {
    console.log(value, typeof (value))
    if (value == "Si") {
        document.getElementById('numero').removeAttribute('disabled');
    } else {
        document.getElementById('numero').setAttribute('disabled', 'disabled');
    }
}

function onRegistro(e) {
    e.preventDefault()
    let txtColaborador = document.getElementById('txtColaborador').value
    var jsonRegistroInformacion= {txtColaborador}

    fetch('/rt_info_Adicional', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(jsonRegistroInformacion)
    }).then((response) => response.json())
    .then((response) => {
        console.log(response)
        document.getElementById('estado').innerHTML = response.html

    })
    .catch(function (err) {
        console.log(err)
    })

}

function onRegistro2(e) {
    e.preventDefault()

    var formInfo = new FormData(document.getElementById('formInfoAdicional'))
    var jsonInfo = {}
    var arrFaltantes = []

    for (var key of formInfo.keys()) {
        jsonInfo[key] = formInfo.get(key)
        console.log(jsonInfo[key])
        if ((jsonInfo[key] == '' || jsonInfo[key] == null || jsonInfo[key] == undefined || jsonInfo[key] == 'Nada')) {
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }

    if (arrFaltantes.length > 0) {
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }

}

