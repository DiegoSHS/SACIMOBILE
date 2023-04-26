var manual = document.getElementById('manual');
console.log('checkManual' + manual.checked);
manual.checked = true;

const manualEncApa=()=>{
  if (manual.checked) {
   console.log('El elemento no está marcado');
   
    const Http = new XMLHttpRequest();
    const url=' https://a288-189-161-153-176.ngrok-free.app/apagar_aspersores';
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
    const url=' https://a288-189-161-153-176.ngrok-free.app/encender_aspersores';
    Http.open("POST", url);
    Http.send();
    
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText)
    }

    
  }
};