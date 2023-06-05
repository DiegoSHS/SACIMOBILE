import { SensorCards } from "./components/sensorCard.js"

export const setSummaryValues = (records) => {
    const {
        aire: { tempAire, humAire, co2, lum, tds, radiation },
        suelo: { tempAvg, phAvg, humAvg }
    } = records
    document.getElementById('tempAire').innerHTML = `<i aria-hidden="true" class="fi-rr-summer icon red"></i>
    Temp: ${tempAire} °C`
    document.getElementById('humAire').innerHTML = `<i aria-hidden="true" class="fi-sr-humidity icon blue"></i>
    Humedad: ${humAire}%`
    document.getElementById('co2').innerHTML = `<i aria-hidden="true" class="fi-sr-cloud icon black"></i>
    CO2: ${co2} ppm`
    document.getElementById('lum').innerHTML = `<i aria-hidden="true" class="fi-sr-bulb icon yellow"></i>
    Lum: ${lum}`
    document.getElementById('tds').innerHTML = `<i aria-hidden="true" class="fi-sr-humidity icon brown"></i>
    TDS: ${tds} ppm`
    document.getElementById('radiation').innerHTML = `<i aria-hidden="true" class="fi-sr-sun icon yellow"></i>
    ${radiation} W/m²`
    document.getElementById('tempAvg').innerHTML = `<i aria-hidden="true" class="fi-rr-thermometer-half icon red"></i>
    Temp: ${tempAvg} °C`
    document.getElementById('phAvg').innerHTML = `<i aria-hidden="true" class="fi-sr-leaf icon green"></i>
    Ph: ${phAvg} Unidades`
    document.getElementById('humAvg').innerHTML = `<i aria-hidden="true" class="fi-sr-humidity icon blue"></i>
    Humedad: ${humAvg}%`
}

export const setActuatorsValues = (actuators) => {
    //document.getElementById('actuators').innerHTML = SensorCards(actuators)
}