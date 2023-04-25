const server = 'https://creepy-pink-lingerie.cyclic.app';
let logsUrl
logsUrl = `${server}/api/log`;
sensorUrl = `${server}/api/sensors`;

setInterval(() => {
    
fetch(logsUrl)
    .then(response => response.json())
    .then(response => {
        const data = {}; // Objeto para almacenar los valores filtrados por ID
        response.forEach(item => {
            if (item.id === "humedad_suelo_s1" || item.id === "humedad_suelo_s2" || item.id === "humedad_suelo_s3") {
                data[item.id] = item.value;
            }
        });
        // Actualizar los valores de los h1 correspondientes
        const h1_1 = document.getElementById('seccion1');
        const h1_2 = document.getElementById('seccion2');
        const h1_3 = document.getElementById('seccion3');
        h1_1.innerHTML = data['humedad_suelo_s1'] + " %" || 'No se encontraron resultados';
        h1_2.innerHTML = data['humedad_suelo_s2'] + " %" || 'No se encontraron resultados';
        h1_3.innerHTML = data['humedad_suelo_s3'] + " %" || 'No se encontraron resultados';
    })
    .catch(error => console.log(error));
    
}, 3000);