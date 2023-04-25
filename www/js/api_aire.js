const rellenarInicio=()=>{
  fetch('https://creepy-pink-lingerie.cyclic.app/api/log')
  .then((response) => response.json())
  .then(data => {
    // Iterar sobre el array
    const filtro1 = data
    .reverse()
    .find(item => item.id === 'temperatura_aire');

    const filtro2 = data
    .find(item => item.id === 'humedad_aire');

    const filtro3 = data
    .find(item => item.id === 'radiacion_solar_aire');

    // Obtener el contenedor de la etiqueta html
    let temperatura = document.getElementById('temperatura');
    let humedad = document.getElementById('humedad');
    let radiacion = document.getElementById('radiacion');

    //imprimir en la etiqueta
    temperatura.innerHTML = `${filtro1.value}°`;
    humedad.innerHTML = `${filtro2.value}%`;
    radiacion.innerHTML = `${filtro3.value} W/m²`;
    });


    fetch('https://creepy-pink-lingerie.cyclic.app/api/log/')
    .then(response => response.json())
    .then(data => {
      const ultimoNivelAgua = data
        .reverse() // invertir el arreglo para que el último elemento sea el primero
        .find(item => item.id === 'nivel_agua'); // encontrar el primer elemento con el valor 'nivel_agua'
      const label = document.getElementById('tinaco');
      label.textContent = ultimoNivelAgua.value;
    })
    .catch(error => console.error(error));
}


setInterval(rellenarInicio, 3000); // Realizar una petición cada 5 segundos
