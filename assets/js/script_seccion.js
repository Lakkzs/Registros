const tablaAltas = document.getElementById('altas');
let enero = document.getElementById('enero').value;
let febrero = document.getElementById('febrero').value;
let marzo = document.getElementById('marzo').value;
let abril = document.getElementById('abril').value;
let mayo = document.getElementById('mayo').value;
let junio = document.getElementById('junio').value;
let julio = document.getElementById('julio').value;
let agosto = document.getElementById('agosto').value;
let septiembre = document.getElementById('septiembre').value;
let octubre = document.getElementById('octubre').value;
let noviembre = document.getElementById('noviembre').value;
let diciembre = document.getElementById('diciembre').value;

new Chart(tablaAltas, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
            label: 'ALTAS EN EL ULTIMO AÑO',
            data: [enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});

const tablaAños = document.getElementById('altasAños');
let actual = document.getElementById('actual').value;
let pasado = document.getElementById('pasado').value;
let antepasado = document.getElementById('antepasado').value;
let pasadoAntepasado = document.getElementById('pasadoAntepasado').value;
let añoactual = new Date().getFullYear();
let añoPasado = new Date().getFullYear() - 1;
let añoAntepasado = new Date().getFullYear() - 2;
let añoPasadoAntepasado = new Date().getFullYear() - 3;


new Chart(tablaAños, {
    type: 'bar',
    data: {
        labels: [añoPasadoAntepasado, añoAntepasado, añoPasado, añoactual],
        datasets: [{
            label: 'ALTAS EN LOS ULTIMOS AÑOS',
            data: [pasadoAntepasado, antepasado, pasado, actual],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});


function loadChart(valores, meses) {
    const tablaAltas2 = document.getElementById('altas2');
    console.log('asd', valores, meses)
    new Chart(tablaAltas2, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'ALTAS EN EL AÑO',
                data: valores,
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function loadChart2(valores, anios) {
    const tablaAltas2 = document.getElementById('altasAños2');
    console.log('asd', valores, anios)
    new Chart(tablaAltas2, {
        type: 'bar',
        data: {
            labels: anios,
            datasets: [{
                label: 'ALTAS EN LOS ULTIMOS AÑOS',
                data: valores,
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}


async function cargaGrafico(value, consulta) {
    let meses = { value, consulta }
    console.log('mesesseleccionados', meses)
    fetch('/rt_cargaMeses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(meses)
    }).then((response) => response.json())
        .then((response) => {
            console.log(10, response)
            document.getElementById('linea2').innerHTML = response.html
            let meses = []
            let mes = document.getElementsByClassName('mes')
            for (let i = 0; i < mes.length; i++) {
                meses.push(mes[i].value)
            }
            let valores = []
            let valor = document.getElementsByClassName('valor')
            for (let i = 0; i < valor.length; i++) {
                valores.push(parseInt(valor[i].value))
            }
            console.log('valor', valores)
            console.log('mes', meses)
            loadChart(valores, meses)
            // if(value!="1234"){
            //   document.getElementById('altas').setAttribute('Hidden', 'Hidden')
            //   document.getElementById('altas2').removeAttribute('Hidden')
            // }else{
            //   document.getElementById('altas2').setAttribute('Hidden', 'Hidden')
            //   document.getElementById('altas').removeAttribute('Hidden')
            // }
        })
        .catch(function (err) {
            console.log(err)
        })

}

async function cargaGraficoAnio(value, consulta) {
    let anios = { value, consulta }
    console.log('años seleccionados', anios)
    fetch('/rt_cargaAnios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anios)
    }).then((response) => response.json())
        .then((response) => {
            console.log(10, response)
            document.getElementById('linea3').innerHTML = response.html
            let anios = []
            let anio = document.getElementsByClassName('anio')
            for (let i = 0; i < anio.length; i++) {
                anios.push(anio[i].value)
            }
            let valores = []
            let valor = document.getElementsByClassName('valor2')
            for (let i = 0; i < valor.length; i++) {
                valores.push(parseInt(valor[i].value))
            }
            console.log('valor2', valores)
            console.log('anio', anios)
            loadChart2(valores, anios)
            // if(value!="1234"){
            //   document.getElementById('altas').setAttribute('Hidden', 'Hidden')
            //   document.getElementById('altas2').removeAttribute('Hidden')
            // }else{
            //   document.getElementById('altas2').setAttribute('Hidden', 'Hidden')
            //   document.getElementById('altas').removeAttribute('Hidden')
            // }
        })
        .catch(function (err) {
            console.log(err)
        })

}

async function cambiarColor(currentDate, events) {
    console.log('llega')
    if (events.length > 0) {
        console.log('entra')
        console.log("month change", currentDate, events);
        let evento = document.getElementsByClassName('calendar__day-event')
        console.log(evento)
        for (let i = 0; i < events.length; i++) {
            console.log(events[i])
            if (events[i].CATEGORIA_DIAS_FESTIVOS == "Día festivo oficial") {
                console.log('festivo')
                evento[i].children[1].setAttribute('style', 'background-color: #d1272b')
            } else if (events[i].CATEGORIA_DIAS_FESTIVOS == "Día festivo no oficial") {
                console.log('no festivo')
                evento[i].children[1].setAttribute('style', 'background-color: #f4b31b')
            } else if (events[i].CATEGORIA_DIAS_FESTIVOS == "Evento de empresa") {
                console.log('empresa')
                evento[i].children[1].setAttribute('style', 'background-color: #60a709')
            }
        }
    }
}

let eventosM = []

window.onload = async function carga() {
    let datosDias = []
    fetch('/rt_consultaEventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosDias)
    }).then((response) => response.json())
        .then((response) => {
            datosDias.push(response)
            console.log(4545454554545, datosDias)
            let calA = new Calendar({
                id: "#color-calendar",
                theme: "basic",
                primaryColor: "#000000",
                secondaryColor: "#c91010",
                weekdayType: "long-upper",
                monthDisplayType: "long",
                calendarSize: "small",
                layoutModifiers: ["month-left-align"],
                eventsData:
                    datosDias[0]
                ,
                monthChanged: async (currentDate, events) => {
                    eventosM = []
                    console.log(777, events)
                    if (events.length > 0) {
                        console.log("month change", currentDate, events);
                        let evento = document.getElementsByClassName('calendar__day-event')
                        console.log(evento)
                        for (let i = 0; i < events.length; i++) {
                            if (events[i].CATEGORIA_DIAS_FESTIVOS == "Día festivo oficial") {
                                evento[i].children[1].setAttribute('style', 'background-color: #d1272b')
                            } else if (events[i].CATEGORIA_DIAS_FESTIVOS == "Día festivo no oficial") {
                                evento[i].children[1].setAttribute('style', 'background-color: #f4b31b')
                            } else if (events[i].CATEGORIA_DIAS_FESTIVOS == "Evento de empresa") {
                                evento[i].children[1].setAttribute('style', 'background-color: #60a709')
                            }
                        }
                    }
                    eventosM.push(events)
                },
                dateChanged: async (currentDate, events) => {
                    console.log("date change", currentDate, events);
                    if (events[0]) {
                        alert(events[0].name + ' (' + events[0].CATEGORIA_DIAS_FESTIVOS + ')')
                    }
                    let evento = document.getElementsByClassName('calendar__day-event')
                    console.log(321, evento)
                    console.log(123, events)
                    eventosM.flat(1)
                    await colorChange(eventosM)
                },
            });
        })
        .catch(function (err) {
            console.log(err)
        })
}

function onRegistro2(e) {
  console.log(e)
  // let value= 1 

  fetch('/seccionDepartamentos', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => response.text())
  .then((response) => {
    document.getElementById("container").remove()
      document.getElementById("todo").innerHTML = response;
  })
    .catch(function (err) {
      console.log(err)
    })
}



function onRegistro2(e) {
  console.log(e)
  // let value= 1 

  fetch('/seccionDepartamentos', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then((response) => response.text())
  .then((response) => {
    document.getElementById("container").remove()
      document.getElementById("todo").innerHTML = response;
  })
    .catch(function (err) {
      console.log(err)
    })
}



async function colorChange(eventosM) {
    if (eventosM.length > 0) {
        console.log(eventosM[0])
        let evento = document.getElementsByClassName('calendar__day-event')
        console.log(evento)
        for (let i = 0; i < eventosM[0].length; i++) {
            if (eventosM[0][i].CATEGORIA_DIAS_FESTIVOS == "Día festivo oficial") {
                evento[i].children[1].setAttribute('style', 'background-color: #d1272b')
            } else if (eventosM[0].CATEGORIA_DIAS_FESTIVOS == "Día festivo no oficial") {
                evento[i].children[1].setAttribute('style', 'background-color: #f4b31b')
            } else if (eventosM[0].CATEGORIA_DIAS_FESTIVOS == "Evento de empresa") {
                evento[i].children[1].setAttribute('style', 'background-color: #60a709')
            }
        }
    }
}