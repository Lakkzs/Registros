function addDate(e){
    e.preventDefault()

    var container = document.getElementById("fecha");

    // Crea un nuevo div para la fila con el contenido deseado
    var nuevaFilaHTML = `
        <div id="inputs" style="display: flex;">
            <input class="form-control" type="text">
            <select class="form-control" name="" id="">
                <option value="Nada" selected hidden>Seleccione una opcion</option>
                <option value="Día inhabil">Día inhabil</option>
                <option value="Día festivo">Día festivo</option>
                <option value="Puente">Puente</option>
                <option value="Cumpleaños">Cumpleaños</option>
            </select>
            <input class="form-control" type="date">
            <input class="form-control" type="date">
        </div>
    `;

    // Inserta la nueva fila al final del contenido del contenedor
    container.insertAdjacentHTML('beforeend', nuevaFilaHTML);

}