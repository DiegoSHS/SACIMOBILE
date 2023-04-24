const server = 'https://saci.serveo.net';
let logsUrl
logsUrl = `${server}/api/logs`;
sensorUrl = `${server}/api/sensors`;


fetch(logsUrl)
    .then(response => response.json())
    .then(response => {
        const data = {}; // Objeto para almacenar los valores filtrados por ID
        response.forEach(item => {
            if (item.id === "temperatura_suelo_s1" || item.id === "temperatura_suelo_s2" || item.id === "temperatura_suelo_s3") {
                data[item.id] = item.value;
            }
        });
        // Actualizar los valores de los h1 correspondientes
        const h1_1 = document.getElementById('seccion1');
        const h1_2 = document.getElementById('seccion2');
        const h1_3 = document.getElementById('seccion3');
        h1_1.innerHTML = data['temperatura_suelo_s1'] + " °C" || 'No se encontraron resultados';
        h1_2.innerHTML = data['temperatura_suelo_s2'] + " °C" || 'No se encontraron resultados';
        h1_3.innerHTML = data['temperatura_suelo_s3'] + " °C" || 'No se encontraron resultados';
    })
    .catch(error => console.log(error));
