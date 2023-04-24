const server = 'https://creepy-pink-lingerie.cyclic.app';
let logsUrl
logsUrl = `${server}/api/log`;

setInterval(() => {

fetch(logsUrl)
    .then(response => response.json())
    .then(response => {
        const phData = {};
        const humedadData = {};
        const temperaturaData = {};

        response.forEach(item => {
            switch(item.id) {
                case "ph_suelo_s1":
                case "ph_suelo_s2":
                    phData[item.id] = item.value;
                    break;
                case "humedad_suelo_s1":
                case "humedad_suelo_s2":
                case "humedad_suelo_s3":
                    humedadData[item.id] = item.value;
                    break;
                case "temperatura_suelo_s1":
                case "temperatura_suelo_s2":
                case "temperatura_suelo_s3":
                    temperaturaData[item.id] = item.value;
                    break;
                default:
                    break;
            }
        });

        const phSum = (Number(phData['ph_suelo_s1']) + Number(phData['ph_suelo_s2'])) / 2;
        const phAvg = phSum.toFixed(2);
        const divPh = document.getElementById('value-PH');
        divPh.innerHTML = phAvg + " pH" || 'No se encontraron resultados';

        const humedadSum = (Number(humedadData['humedad_suelo_s1']) + Number(humedadData['humedad_suelo_s2']) + Number(humedadData['humedad_suelo_s3'])) / 3;
        const humedadAvg = humedadSum.toFixed(2);
        const divHume = document.getElementById('value-Hume');
        divHume.innerHTML = humedadAvg + " %" || 'No se encontraron resultados';

        const temperaturaSum = (Number(temperaturaData['temperatura_suelo_s1']) + Number(temperaturaData['temperatura_suelo_s2']) + Number(temperaturaData['temperatura_suelo_s3'])) / 3;
        const temperaturaAvg = temperaturaSum.toFixed(2);
        const divTemp = document.getElementById('value-Temp');
        divTemp.innerHTML = temperaturaAvg + " °C" || 'No se encontraron resultados';
    })
    .catch(error => console.log(error));

}, 60000);

function ph() {
    window.location.href = '../../pages/suelo/ph.html'
}
function humedad() {
    window.location.href = '../../pages/suelo/humedad.html'
}
function temperatura() {
    window.location.href = '../../pages/suelo/temperatura.html'
}