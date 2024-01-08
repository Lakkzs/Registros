
let puestosss = [{NOMBRE_PUESTO: 'Lider', id:1}, {NOMBRE_PUESTO: 'Ma', id: 2}, {NOMBRE_PUESTO: 'ma1', id: 3}]
function cargaPuesto(value){
    let departamento = {value}
    fetch('/rt_cargaPuesto', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(departamento)
    }).then((response) => response.json())
    .then((response) => {
        console.log(10, response)
        document.getElementById('puestos').innerHTML = response.html
        // for(var i = 0; i < response.puesto.length; i++){
        //     puestos.push(response.puesto[i])
        // }
        // console.log(170, puestosss)
        // document.getElementById('txtPuesto').removeAttribute('disabled')
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
        if((jsonRegistroColaborador[key] == '' || jsonRegistroColaborador[key] == null || jsonRegistroColaborador[key] == undefined || jsonRegistroColaborador[key] == 'Nada') && (key != 'txtNum_Interior')){
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
                if(response.resultado5[0].RESULT == 'EXISTE'){
                    alert('El Colaborador ya cuenta con datos')
                }
                if(response.resultado5[0].RESULT == 'OK'){
                    alert('El registro se ha realizado correctamente')
                    document.getElementById('formInfoLaboral').reset();
                }
            })
            .catch(function (err) {
                console.log(err)
            })
        }

}
