
function cerrarSesion(){
    fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
    })
    .catch(function (err) {
        console.log(err)
    })

}