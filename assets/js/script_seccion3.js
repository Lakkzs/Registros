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
                    document.getElementById('listaCal').innerHTML = ''
                    eventosM = []
                    console.log(777, events)
                    if (events.length > 0) {
                        console.log("month change", currentDate, events);
                        let evento = document.getElementsByClazssName('calendar__day-event')
                        console.log(evento)
                        for (let i = 0; i < events.length; i++) {
                            let startDate = new Date(events[i].start);
                            let fecha = startDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
                            document.getElementById('listaCal').insertAdjacentHTML('beforeend', `${fecha + ' - ' + events[i].name + ' - ' + events[i].CATEGORIA_DIAS_FESTIVOS} <br>`)
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

async function colorChange(eventosM) {
    if (eventosM.length > 0) {
        console.log(eventosM[0])
        let evento = document.getElementsByClassName('calendar__day-event')
        console.log(evento)
        for (let i = 0; i < eventosM[0].length; i++) {
            if (eventosM[0][i].CATEGORIA_DIAS_FESTIVOS == "Día festivo oficial") {
                evento[i].children[1].setAttribute('style', 'background-color: #d1272b')
            } else if (eventosM[0][i].CATEGORIA_DIAS_FESTIVOS == "Día festivo no oficial") {
                evento[i].children[1].setAttribute('style', 'background-color: #f4b31b')
            } else if (eventosM[0][i].CATEGORIA_DIAS_FESTIVOS == "Evento de empresa") {
                evento[i].children[1].setAttribute('style', 'background-color: #60a709')
            }
        }
    }
}

function onRegistro(e) {
    e.preventDefault()
    let txtColaborador = document.getElementById('txtColaborador').value
    var jsonRegistroInformacion= {txtColaborador}

    if(txtColaborador == NaN || txtColaborador == undefined || txtColaborador == ' ' || txtColaborador == 'Nada') {
        alert(`Por favor llene los siguientes campos faltantes: Colaborador`)
    }else{
        fetch('/rt_cargaseccion', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(jsonRegistroInformacion)
        }).then((response) => response.json())
        .then(async (response) => {
            document.getElementById('asd').innerHTML = response.html

        })
        .catch(function (err) {
            console.log(err)
        })
    }
}