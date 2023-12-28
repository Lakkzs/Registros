const tablaAltas = document.getElementById('altas');

  new Chart(tablaAltas, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'ALTAS EN EL AÑO',
        data: [12, 50, 3, 5, 2, 3, 20,45,26,47,51,1],
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

