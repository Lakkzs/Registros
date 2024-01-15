async function cargaMunicipios(value, consulta){
    let depende = {value, consulta}
    console.log(65879, depende)
    fetch('/rt_cargaMunicipio', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(depende)
    }).then((response) => response.json())
    .then((response) => {
        document.getElementById('municipioselect').innerHTML = response.html
    })
}