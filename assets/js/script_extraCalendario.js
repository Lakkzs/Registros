function addDate(e){
    e.preventDefault()

    var container = document.getElementById("fecha");
    let filas = document.getElementsByClassName('filas').length

    // Crea un nuevo div para la fila con el contenido deseado
    var nuevaFilaHTML = `
<div id="inputs" style="display: flex;">
    <input class="form-control" type="text" id="fila${filas}" name="txtId${filas}" value="0" hidden>
    <input class="form-control filas" type="text" name="txtDescripcion${filas}">
    <select class="form-control" name="txtCategoria${filas}">
        <option value="Nada" class="seleccione" selected hidden> Seleccione una opción </option>
        <option value="Día festivo oficial">Día festivo oficial</option>
        <option value="Día festivo no oficial">Día festivo no oficial</option>
        <option value="Cumpleaños">Cumpleaños</option>
    </select>
    <select class="form-control" name="txtMes${filas}">
        <option value="Nada" class="seleccione" selected hidden> Seleccione una opción </option>
        <option value="ENERO"> ENERO </option>
        <option value="FEBRERO"> FEBRERO </option>
        <option value="MARZO"> MARZO </option>
        <option value="ABRIL"> ABRIL </option>
        <option value="MAYO"> MAYO </option>
        <option value="JUNIO"> JUNIO </option>
        <option value="JULIO"> JULIO </option>
        <option value="AGOSTO"> AGOSTO </option>
        <option value="SEPTIEMBRE"> SEPTIEMBRE </option>
        <option value="OCTUBRE"> OCTUBRE </option>
        <option value="NOVIEMBRE"> NOVIEMBRE </option>
        <option value="DICIEMBRE"> DICIEMBRE </option>
    </select>
    <select class="form-control" name="txtDia${filas}">
        <option value="Nada" class="seleccione" selected hidden> Seleccione una opción </option>
        <option value="1"> 1 </option>
        <option value="2"> 2 </option>
        <option value="3"> 3 </option>
        <option value="4"> 4 </option>
        <option value="5"> 5 </option>
        <option value="6"> 6 </option>
        <option value="7"> 7 </option>
        <option value="8"> 8 </option>
        <option value="9"> 9 </option>
        <option value="10"> 10 </option>
        <option value="11"> 11 </option>
        <option value="12"> 12 </option>
        <option value="13"> 13 </option>
        <option value="14"> 14 </option>
        <option value="15"> 15 </option>
        <option value="16"> 16 </option>
        <option value="17"> 17 </option>
        <option value="18"> 18 </option>
        <option value="19"> 19 </option>
        <option value="20"> 20 </option>
        <option value="21"> 21 </option>
        <option value="22"> 22 </option>
        <option value="23"> 23 </option>
        <option value="24"> 24 </option>
        <option value="25"> 25 </option>
        <option value="26"> 26 </option>
        <option value="27"> 27 </option>
        <option value="28"> 28 </option>
        <option value="29"> 29 </option>
        <option value="30"> 30 </option>
        <option value="31"> 31 </option>
    </select>
    <button class="btn btn-dark bi bi-trash3" type="button" style="width: 15%;" onclick="deleteRow('fila${filas}')"></button>
    </div>
    `;

    // Inserta la nueva fila al final del contenido del contenedor
    container.insertAdjacentHTML('beforeend', nuevaFilaHTML);

}

function loadList(){
    fetch('/rt_cargarCalendario', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify()
    }).then((response) => response.json())
    .then(async (response) => {
        document.getElementById('fecha').innerHTML = response.html
        
    })
    .catch(function (err) {
        console.log(err)
    })
}

function deleteRow(id){
    if(isNaN(id)){
        console.log(id)
    }else{
        console.log(id,id)
        if(confirm("Esta apunto de eliminar este día festivo de la base de datos")){
            if(confirm("¿Esta seguro de esta acción?")){
                fetch('/rt_eliminarFecha', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id})
                }).then((response) => response.json())
                .then((response) => {
                    console.log(response)
                    if(response.datos[0].RESULT == 'ELIMINADO'){
                        alert('El día festivo se ha eliminado correctamente.')
                        loadList()
                    }else{
                        alert('Ha ocurrido un error.')
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
            }
        }

    }
}

function onRegistro(e){
    e.preventDefault()
    var formExtraCalendario = new FormData(document.getElementById('formExtraCalendario'))
    var jsonExtraCalendario = {}
    var arrFaltantes = []
    let filas = document.getElementsByClassName('filas').length

    for(var key of formExtraCalendario.keys()){
        jsonExtraCalendario[key] = formExtraCalendario.get(key)
        console.log(456, jsonExtraCalendario[key])
        if((jsonExtraCalendario[key] == '' || jsonExtraCalendario[key] == null || jsonExtraCalendario[key] == undefined || jsonExtraCalendario[key] == 'Nada')){
            arrFaltantes.push(' ' + key.replace("txt", ""))
        }
    }
    if(arrFaltantes.length > 0){
        alert(`Por favor llene los siguientes campos faltantes:${arrFaltantes}`)
    }
    else{
        fetch('/rt_actualizarFechas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({jsonExtraCalendario, filas})
        }).then((response) => response.json())
        .then((response) => {
            console.log(response)
            if(response.datos == 'ACTUALIZADO'){
                alert('Los días festivos han sido agregados/actualizado correctamente.')
            }else{
                alert('Ha ocurrido un error.')
            }
        })
        .catch(function (err) {
            console.log(err)
        })
    }
}