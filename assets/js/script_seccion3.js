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
            dateChanged: (currentDate, events) => {
                console.log("date change", currentDate, events);
                if(events[0]){
                    alert(events[0].name + ' (' + events[0].CATEGORIA_DIAS_FESTIVOS + ')')
                }
            },
            monthChanged: (currentDate, events) => {
                console.log("month change", currentDate, events);
            }
        });
    })
    .catch(function (err) {
        console.log(err)
    })
}
    

