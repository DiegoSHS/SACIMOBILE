import { ActuatorCards } from "./components/sensorCard.js"
import { enableSensor, getActuators, getSummary, useState } from "./requests.js"
import { emitState, setupSocket } from "./socket.js"

export const idRef = (id) => document.getElementById(id)

export const setSummaryValues = (records) => {
    const {
        aire: { tempAire, humAire, co2, lum, tds, radiation },
        suelo: { tempAvg, phAvg, humAvg }
    } = records
    idRef('tempAire').innerHTML = `<i aria-hidden="true" class="fi-rr-summer icon red"></i>
    Temp: ${tempAire} °C`
    idRef('humAire').innerHTML = `<i aria-hidden="true" class="fi-sr-humidity icon blue"></i>
    Humedad: ${humAire}%`
    idRef('co2').innerHTML = `<i aria-hidden="true" class="fi-sr-cloud icon black"></i>
    CO2: ${co2} ppm`
    idRef('lum').innerHTML = `<i aria-hidden="true" class="fi-sr-bulb icon yellow"></i>
    Lum: ${lum}`
    idRef('tds').innerHTML = `<i aria-hidden="true" class="fi-sr-humidity icon brown"></i>
    TDS: ${tds} ppm`
    idRef('radiation').innerHTML = `<i aria-hidden="true" class="fi-sr-sun icon yellow"></i>
    ${radiation} W/m²`
    idRef('tempAvg').innerHTML = `<i aria-hidden="true" class="fi-rr-thermometer-half icon red"></i>
    Temp: ${tempAvg} °C`
    idRef('phAvg').innerHTML = `<i aria-hidden="true" class="fi-sr-leaf icon green"></i>
    Ph: ${phAvg} Unidades`
    idRef('humAvg').innerHTML = `<i aria-hidden="true" class="fi-sr-humidity icon blue"></i>
    Humedad: ${humAvg}%`
}

const toggleLoadingButton = (id) => {
    const element = idRef(id)
    element.classList.toggle('loading')
}

export const toggleColorButton = (id) => {
    const element = idRef(`act_${id}`)
    if (element.classList.contains('green')) {
        element.classList.remove('green')
        element.classList.add('red')
    } else {
        element.classList.remove('red')
        element.classList.add('green')
    }
}

export const toggleTextButton = (id) => {
    const element = idRef(id)
    const html = element.innerHTML
    if (checkState(id)) {
        element.innerHTML = html.replace('Encendido', 'Apagado')
    } else {
        element.innerHTML = html.replace('Apagado', 'Encendido')
    }
}

const checkState = (id, regex = /Encendido/g) => regex.test(idRef(id).innerHTML)

const replaceId = (id, regex = /act_/g) => id.replace(regex, '')

const setActuatorState = async (id) => {
    id = replaceId(id)
    toggleLoadingButton(id)
    await enableSensor(id, !checkState(id))
    toggleLoadingButton(id)
    toggleColorButton(id)
    toggleTextButton(id)
}

const setActuatorsValues = (actuators) => {
    idRef('actuators').innerHTML = ActuatorCards(actuators)
    const enableButtons = document.querySelectorAll('.enable')
    enableButtons.forEach(button => {
        button.addEventListener('click', async e => {
            e.preventDefault()
            const { id } = e.target
            emitState(setupSocket(), { name: replaceId(id), state: !checkState(id) })
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