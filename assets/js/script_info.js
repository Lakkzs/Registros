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
        document.getElementById('txtNumero').removeAttribute('disabled');
    } else {
        document.getElementById('txtNumero').setAttribute('disabled', 'disabled');
    }
}

 function onRegistro(e) {
    e.preventDefault()
    let txtColaborador = document.getElementById('txtColaborador').value
    var jsonRegistroInformacion= {txtColaborador}

    if(txtColaborador == 'Nada' || txtColaborador== undefined) {
        alert(`Por favor llene los siguientes campos faltantes: Colaborador`)
    }else{
        fetch('/rt_info_Adicional', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroInformacion)
        }).then((response) => response.json())
        .then(async (response) => {
            document.getElementById('estado').innerHTML = response.html
            let element = document.getElementById('txtDependencia').value
            let element1 = document.getElementById('txtNumero').value
            if(element == 'Si'){
                let sel = document.getElementById('txtNumero')
                sel.removeAttribute('disabled')
            }else{
                let sel = document.getElementById('txtNumero')
                sel.setAttribute('disabled','disabled')
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
    

}


async function cargaDependientes(value, consulta){
    let depende = {value, consulta}
    console.log(152, depende)
    fetch('/rt_info_Adicional', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(depende)
    }).then((response) => response.json())
    .then((response) => {
        console.log(5, response)
        document.getElementById('estado').innerHTML = response.html
        if(document.getElementsByClassName('depDepende')[0].value == 'Si'){
            let sel = document.getElementsByClassName('numDepen')
            sel.removeAttribute('disabled')
        }
        if(document.getElementsByClassName('depDepende')[0].value != 'Si'){
            let sel2 = document.getElementsByClassName('numDepen')
            sel2.setAttribute('disabled','disabled')
        }
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
    }else{
        fetch('/rt_altaAdicional', {
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
                document.getElementById('formInfoAdicional').reset();
            }
        })
        .catch(function (err) {
            console.log(err)
        }) 
    }

}


