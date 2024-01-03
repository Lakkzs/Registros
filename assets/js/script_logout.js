
function cerrarSesion(){
    fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
    }).then(() => {
        document.getElementById('formLogout').submit();
    })
    .catch(function (err) {
        console.log(err)
    })

}