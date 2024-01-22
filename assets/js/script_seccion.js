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
      label: 'ALTAS EN EL AÑO',
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

const tablaColaboradores = document.getElementById('colaboradores');
let mujer = document.getElementById('mujeres').value;
let hombre = document.getElementById('hombres').value;
new Chart(tablaColaboradores, {
  type: 'pie',
  data: {
    labels: ['Hombres', 'Mujeres'],
    datasets: [{
      label: 'COLABORADORES',
      data: [hombre, mujer],
      borderWidth: 3
    }]
  },
  options: {

  }
});




function loadChart(valores, meses){
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
    })
    .catch(function (err) {
      console.log(err)
    })

}


