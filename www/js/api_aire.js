fetch('https://saci.serveo.net/api/logs')
    .then((response) => response.json())
    .then(data => {
        // Obtener el contenedor de la etiqueta html
        let temperatura = document.getElementById('temperatura');
        let humedad = document.getElementById('humedad');
        let radiacion = document.getElementById('radiacion');
        // Iterar sobre el array
        let filtro1 = data.find(element => element.id == "temperatura_aire") 
        let filtro2 = data.find(element => element.id == "humedad_aire")
        let filtro3 = data.find(element => element.id == "radiacion_solar_aire")
        //imprimir en la etiqueta
        temperatura.innerHTML = `${filtro1.value}°`;
        humedad.innerHTML = `${filtro2.value}%`;
        radiacion.innerHTML = `${filtro3.value} W/m²`;
      });

fetch('https://saci.serveo.net/api/logs')
  .then((response) => response.json())
  .then(data => {
  // Obtener el contenedor de la etiqueta html
  let canAgua = document.getElementById('canAgua');

  // Iterar sobre el array
  let filtro = data.find(element => element.id == "nivel_agua"); 
  //imprimir en la etiqueta
  canAgua.innerHTML = `${filtro.value}%`;
          });