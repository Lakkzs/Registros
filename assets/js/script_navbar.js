function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
function myFunctionCatalogos() {
    document.getElementById("myDropdown1").classList.toggle("show");
}
function myFunctionInfoAdicional() {
    document.getElementById("myDropdown2").classList.toggle("show");
}
function myFunctionDashboard() {
    document.getElementById("myDropdown3").classList.toggle("show");
}
function myFunctionExtras() {
    document.getElementById("myDropdown4").classList.toggle("show");
}
    // Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
        }
        var myDropdown1 = document.getElementById("myDropdown1");
        if (myDropdown1.classList.contains('show')) {
        myDropdown1.classList.remove('show');
        }
        var myDropdown2 = document.getElementById("myDropdown2");
        if (myDropdown2.classList.contains('show')) {
        myDropdown2.classList.remove('show');
        }
        var myDropdown3 = document.getElementById("myDropdown3");
        if (myDropdown3.classList.contains('show')) {
        myDropdown3.classList.remove('show');
        }
        var myDropdown4 = document.getElementById("myDropdown4");
        if (myDropdown4.classList.contains('show')) {
        myDropdown4.classList.remove('show');
        }
    }   
}

// NECESITO HACER QUE HAGA UN FETCH PARA QUE SE LLAMEN A LOS DATOS DEL INICIO DE Session, DESPUES ESTA SELECCION VA A HACER QUE SE CANBIEN LOS DATOS EN EL SESSION.USER
// DESPUES ESTO VA A HACER QUE SE EL ID Y EL NOMBRE DE LA EMPRESA SEA DIFERENTE ENTONCES NO HABRA PROBLEMAS, AHORITA TIENE POR DEFAULT LA PRIMER EMPRESA EL SUPERADMIN,
// CUANDO SELECCIONE LA SEGUNDA SE DEBERIA DE QUEDAR ASI PQ PUES SI VDD, NO CREO QUE SE QUEDE GUARDADO PERO AHI VEMOS

async function selEmpresa(id, empresa){
    console.log(id)
    console.log(empresa)
}