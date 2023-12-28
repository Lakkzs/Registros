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
          beginAtZero: true
        }
      }
    }
  });

  const tablaAños = document.getElementById('altasAños');

  new Chart(tablaAños, {
    type: 'bar',
    data: {
      labels: ['2020','2021','2022','2023'],
      datasets: [{
        label: 'ALTAS EN EL AÑO',
        data: [20,52,65,70],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

