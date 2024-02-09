window.onload = async function carga(){
    let datosDias = []
    fetch('/rt_consultaEventos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datosDias)
    }).then((response) => response.json())
    .then((response) => {
        console.log(789456, response)
        datosDias.push(response)
        console.log(654654, datosDias)
        console.log(4545454554545, datosDias)
        let calA = new Calendar({
            id: "#color-calendar",
            theme: "basic",
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
    

