import { getActuators, getSummary, useState } from "./requests.js";
import { setActuatorsValues, setSummaryValues } from "./sethtml.js";
import { setupNav, getChangedTouches, getTouches } from "./touches.js";

window.screen.orientation.lock('portrait')

const removeElement = e => {
    e.preventDefault()
    const id = e.target.id
    const element = document.getElementById(id)
    element.remove()
    navigator.vibrate(500)
}

const [loading, setLoading] = useState(true)

const toggleLoading = () => setLoading(!loading())

const loadButtons = () => {
    const buttons = document.querySelectorAll('.record')
    if (loading()) {
        buttons.forEach(button => {
            button.classList.add('loading')
            button.addEventListener('click', removeElement)
        })
    } else {
        buttons.forEach(button => {
            button.classList.remove('loading')
        })
    }
}

const setSummary = async () => {
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

window.addEventListener('touchstart', getTouches)
window.addEventListener('touchend', getChangedTouches)

setupNav()
setSummary()