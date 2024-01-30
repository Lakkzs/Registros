function datosCol(e){
    e.preventDefault()
    let colaborador = document.getElementById('txtColaborador').value
    var colaboradora = {colaborador}
    console.log(colaborador)
    fetch('/rt_cargaInfoEmpresa', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(colaboradora)
    }).then((response) => response.json())
    .then(async (response) => {
        console.log(10, response)
        document.getElementById('informacion').innerHTML = response.html
        if(document.getElementsByClassName('depSeleccion')[0].value != ''){
            let sel = document.getElementsByClassName('seleccione')
            for(let i = 0; i < sel.length; i++){
                sel[i].removeAttribute('selected')
            }
            let dep = document.getElementsByClassName('depSeleccion')
            for(let i = 0; i < dep.length; i++){
                dep[i].setAttribute('selected', 'selected')
            }
            let element = document.getElementById('txtDepartamento').value
            let element1 = document.getElementById('puesto').value
            await cargaPuesto(element, element1)
        }
    })
    .catch(function (err) {
        console.log(err)
    })
}

async function cargaPuesto(value, consulta){
    let departamento = {value, consulta}
    console.log(100, departamento)
    fetch('/rt_cargaPuesto', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(departamento)
    }).then((response) => response.json())
    .then((response) => {
        console.log(10, response)
        document.getElementById('puestos').innerHTML = response.html
        if(document.getElementsByClassName('depSeleccion')[0].value != ''){
            let sel = document.getElementsByClassName('seleccione')
            for(let i = 0; i < sel.length; i++){
                sel[i].removeAttribute('selected')
            }
            let dep = document.getElementsByClassName('depSeleccion')
            for(let i = 0; i < dep.length; i++){
                dep[i].setAttribute('selected', 'selected')
            }
        }
    })
    .catch(function (err) {
        console.log(err)
    })
}

function onRegistro(e){
    e.preventDefault()

    var formRegistroColaborador = new FormData(document.getElementById('formInfoLaboral'))
    var jsonRegistroColaborador = {}
    var arrFaltantes = []

  
    for(var key of formRegistroColaborador.keys()){
        jsonRegistroColaborador[key] = formRegistroColaborador.get(key)
        if((jsonRegistroColaborador[key] == '' || jsonRegistroColaborador[key] == null || jsonRegistroColaborador[key] == undefined || jsonRegistroColaborador[key] == 'Nada') && (key != 'txtFecha_Salida')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }
    console.log(jsonRegistroColaborador)
        if(arrFaltantes.length > 0){
            alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
        }
        else{
            fetch('/rt_infoEmpresa', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonRegistroColaborador)
            }).then((response) => response.json())
            .then((response) => {
                console.log(response)
                if(response.resultado5[0].RESULT == 'ACTUALIZADO'){
                    alert('Los datos se han actualizado correctamente.')
                }
                if(response.resultado5[0].RESULT == 'OK'){
                    alert('El registro se ha realizado correctamente.')
                    document.getElementById('formInfoLaboral').reset();
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        }

}
