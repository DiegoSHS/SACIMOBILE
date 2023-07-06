import { ActuatorCards } from "./components/sensorCard.js"
import { createBadge } from "./components/toast.js"
import { enableSensor, getActuators, getSummary, useState } from "./requests.js"
import { emitState, setupSocket } from "./socket.js"

const [loading, setLoading] = useState(true)

const toggleLoading = () => setLoading(!loading())
/**
 * Checks if the HTMLElement is visible
 * @param {String} id the id of the HTMLElement
 * @returns {Boolean} true if the HTMLElement contains the class 'visible'
 */
export const isVisibleNotis = (id) => idRef(id).classList.contains('visible')
/**
 * Shortcut to document.getElementById
 * @param {String} id the id of the HTMLElement
 * @returns {HTMLElement} the HTMLElement with the id
 */
export const idRef = (id) => document.getElementById(id)

export const setSummaryValues = ({ aire, suelo }) => {
    const { tempAire, humAire, co2, lum, tds, radiation } = aire
    const { tempAvg, phAvg, humAvg } = suelo

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
/**
 * Toggle the loading class of the HTMLElement
 * @param {String} id the id of the HTMLElement
 */
const toggleLoadingButton = (id) => idRef(id).classList.toggle('loading')
/**
 * Toggle the visible and invisible classes of the HTMLElement
 * @param {String} id the id of the HTMLElement
 */
export const toggleVisible = (id) => {
    const element = idRef(id)
    if (element.classList.contains('invisible')) {
        createBadge()
        element.classList.replace('invisible', 'visible')
    } else {
        element.classList.replace('visible', 'invisible')
    }
}
/**
 * Changes the color of the button from green to red and viceversa
 * @param {String} id the id of the HTMLElement
 */
export const toggleColorButton = (id) => {
    const element = idRef(`act_${id}`)
    if (element.classList.contains('green')) {
        element.classList.replace('green','red')
    } else {
        element.classList.replace('red','green')
    }
}
/**
 * Replace the text of the button from 'Encendido' to 'Apagado' and viceversa
 * @param {String} id the id of the HTMLElement
 */
export const toggleTextButton = (id) => {
    const element = idRef(id)
    const html = element.innerHTML
    if (checkState(id)) {
        element.innerHTML = html.replace('Encendido', 'Apagado')
    } else {
        element.innerHTML = html.replace('Apagado', 'Encendido')
    }
}
/**
 * Checks if a html element contains a text
 * @param {String} id the id of the HTMLElement
 * @param {RegExp} regex regular expression to test the text of the HTMLElement
 * @returns 
 */
const checkState = (id, regex = /Encendido/g) => regex.test(idRef(id).innerHTML)
/**
 * Replaces the text of a html element
 * @param {String} id the id of the HTMLElement
 * @param {RegExp} regex regular expression to replace
 * @returns 
 */
const replaceId = (id, regex = /act_/g) => id.replace(regex, '')

const setActuatorState = async (id) => {
    id = replaceId(id)
    toggleLoadingButton(id)
    await enableSensor(id, !checkState(id))
    toggleLoadingButton(id)
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