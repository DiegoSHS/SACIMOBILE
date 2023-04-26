const botarSeguro=()=>{
  const Http = new XMLHttpRequest();
    const url=' https://a288-189-161-153-176.ngrok-free.app/apagar_bomba';
    Http.open("POST", url);
    Http.send();
    
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }
}

const rellenarInicio=()=>{
    fetch('https://creepy-pink-lingerie.cyclic.app/api/log/')
    .then(response => response.json())
    .then(data => {
      const ultimoNivelAgua = data
        .reverse() // invertir el arreglo para que el último elemento sea el primero
        .find(item => item.id === 'nivel_agua'); // encontrar el primer elemento con el valor 'nivel_agua'
      const label = document.getElementById('tinaco');
      if (ultimoNivelAgua.value>100){botarSeguro(); label.textContent = "100%";}
      else{label.textContent = ultimoNivelAgua.value+ "%";} 
      
    })
    .catch(error => console.error(error));
}


setInterval(rellenarInicio, 1000); // Realizar una petición cada 5 segundos


//manual
var manual = document.getElementById('checkManual');
console.log('checkManual' + manual.checked);
manual.checked = true;

var automatico = document.getElementById('checkAutomatico');
  console.log('checkAutomatico' + automatico.checked);

//automatico
const checar_estado=()=>{
  
  
  
  var estado; 
  fetch('https://creepy-pink-lingerie.cyclic.app/api/estado_sensor')
    .then((response) => response.json())
    .then(data => {
  
     estado = data[0].state;

     console.log('Nuevo valor de estado: ' + estado);

     if (estado == "1") {
      manual.disabled = true;
      document.querySelector(".manual").style.opacity = 0.5;
      automatico.checked = false;
    } else if(estado == "0"){
      automatico.checked = true;
    
    }
    });
  
  
}



const Automatico=()=>{
  if (automatico.checked) {
  fetch('https://creepy-pink-lingerie.cyclic.app/api/estado_sensor/6445e8fc1e2082065e3bd485', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"state": "0"})
})
  .then(response => {

   
  });
  alert("Modo automatico desactivado");
  window.location.reload();
  //checar_estado();
}else{
      fetch('https://creepy-pink-lingerie.cyclic.app/api/estado_sensor/6445e8fc1e2082065e3bd485', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"state": "1"})
      })
      .then(response => {
        

      });
     //checar_estado();
     alert("Modo automatico activado");
     window.location.reload();
  }
  
}


//Encender/apagar bomba Manualmente
const manualEncApa=()=>{
  if (manual.checked) {
   console.log('El elemento no está marcado');
   
    const Http = new XMLHttpRequest();
    const url=' https://a288-189-161-153-176.ngrok-free.app/apagar_bomba';
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
    const url=' https://a288-189-161-153-176.ngrok-free.app/encender_bomba';
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



