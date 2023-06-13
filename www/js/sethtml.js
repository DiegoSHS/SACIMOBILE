import { ActuatorCards } from "./components/sensorCard.js"
import { enableSensor, getActuators, getSummary, useState } from "./requests.js"

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

const toggleLoadingButton = (id) => {
    const element = document.getElementById(id)
    element.classList.toggle('loading')
}

const toggleColorButton = (id) => {
    const element = document.getElementById(`act_${id}`)
    if (element.classList.contains('green')) {
        element.classList.remove('green')
        element.classList.add('red')
    } else {
        element.classList.remove('red')
        element.classList.add('green')
    }
}

const toggleTextButton = (id) => {
    const element = document.getElementById(id)
    const html = element.innerHTML
    if (checkState(id)) {
        element.innerHTML = html.replace('Encendido', 'Apagado')
    } else {
        element.innerHTML = html.replace('Apagado', 'Encendido')
    }
}

const checkState = (id) => {
    const element = document.getElementById(id)
    const html = element.innerHTML
    const regex = /Encendido/g
    if (regex.test(html)) {
        return true
    }
    return false
}

export const setActuatorState = async (id, norequest) => {
    toggleLoadingButton(id)
    if (!norequest) {
        await enableSensor(id, !checkState(id))
    }
    toggleLoadingButton(id)
    toggleColorButton(id)
    toggleTextButton(id)
}

const setActuatorsValues = (actuators) => {
    document.getElementById('actuators').innerHTML = ActuatorCards(actuators)
    const enableButtons = document.querySelectorAll('.enable')
    enableButtons.forEach(button => {
        button.addEventListener('click', async e => {
            e.preventDefault()
            const { id } = e.target
            setActuatorState(id)
        })
    })
}

const [loading, setLoading] = useState(true)

const toggleLoading = () => setLoading(!loading())

const loadButtons = () => {
    const buttons = document.querySelectorAll('.record')
    if (loading()) {
        buttons.forEach(button => {
            button.classList.add('loading')
        })
    } else {
        buttons.forEach(button => {
            button.classList.remove('loading')
        })
    }
}

export const setupPage = async () => {
    loadButtons()
    const results = await Promise.allSettled([getActuators(), getSummary()])
    const values = results.map(({ value }) => value)
    const [actuators, summary] = values
    console.log(actuators, summary)
    toggleLoading()
    loadButtons()
    setSummaryValues(summary)
    setActuatorsValues(actuators)
}