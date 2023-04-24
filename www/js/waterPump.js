
//manual
var manual = document.getElementById('checkManual');
console.log('checkManual' + manual.checked);
manual.checked = true;


//automatico
var estado = "OFF";


fetch('https://saci.serveo.net/estado_sensor/6445e8fc1e2082065e3bd485')
  .then((response) => response.json())
  .then(data => {
  /*// Obtener el contenedor de la etiqueta html
  let canAgua = document.getElementById('tinaco');

  // Iterar sobre el array
  let filtro = data.find(element => element.id == "nivel_agua"); 
  //imprimir en la etiqueta
  canAgua.innerHTML = `${filtro.value}%`;
          });
*/
console.log(data)
        });

if (estado == "ON") {
  manual.disabled = true;
  document.querySelector(".manual").style.opacity = 0.5;
} else {

}

var automatico = document.getElementById('checkAutomatico');
console.log('checkAutomatico' + automatico.checked);



//Encender/apagar bomba Manualmente
const manualEncApa=()=>{
  if (manual.checked) {
   console.log('El elemento no está marcado');
   
    const Http = new XMLHttpRequest();
    const url='https://58c3-2806-10a6-15-7eab-ecc3-4b59-fab3-b3d5.ngrok-free.app/apagar_aspersores';
    Http.open("POST", url);
    Http.send();
    
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }
   
    setTimeout(function() {
      manual.disabled = false;
      document.querySelector(".manual").style.opacity = 1;
    }, 3000);
    // Deshabilita el checkbox temporalmente
    manual.disabled = true;
    document.querySelector(".manual").style.opacity = 0.5;

  } else {
    console.log('El elemento está marcado');

    const Http = new XMLHttpRequest();
    const url='https://58c3-2806-10a6-15-7eab-ecc3-4b59-fab3-b3d5.ngrok-free.app/encender_aspersores';
    Http.open("POST", url);
    Http.send();
    
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }

    setTimeout(function() {
      manual.disabled = false;
      document.querySelector(".manual").style.opacity = 1;
    }, 3000);
    // Deshabilita el checkbox temporalmente
    manual.disabled = true;
    document.querySelector(".manual").style.opacity = 0.5;
  }
};
