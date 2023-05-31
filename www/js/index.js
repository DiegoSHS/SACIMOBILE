import { navbar } from "./components/navbar.js"
import { getSummary, useState } from "./requests.js";

const setValues = (records) => {
    const {
        aire: { tempAire, humAire, co2, lum, tds, radiation },
        suelo: { tempAvg, phAvg, humAvg }
    } = records
    document.getElementById('tempAire').innerHTML = `<i aria-hidden="true" class="fi-rr-summer icon red"></i>
    Tempe: ${tempAire} °C`
    document.getElementById('humAire').innerHTML = `<i aria-hidden="true" class="fi-sr-humidity icon blue"></i>
    Humedad: %${humAire}`
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
    PH: ${phAvg} Unidades`
    document.getElementById('humAvg').innerHTML = `<i aria-hidden="true" class="fi-sr-humidity icon blue"></i>
    Humedad: %${humAvg}`
}

const removeElement = e => {
    e.preventDefault()
    const id = e.target.id
    const element = document.getElementById(id)
    element.remove()
}

const [loading, setLoading] = useState(true)

const toggleLoading = () => setLoading(!loading())

const loadButtons = () => {
    const buttons = document.querySelectorAll('.record')
    if(loading()){
        buttons.forEach(button => {
            button.classList.add('loading')
            button.addEventListener('click', removeElement)
        })
    }else{
        buttons.forEach(button => {
            button.classList.remove('loading')
        })
    }
}

const setSummary = async () => {
    console.log(window.location.href)
    getSummary().then(summary => {
        loadButtons()
        summary
        setTimeout(() => {
            toggleLoading()
            loadButtons()
            console.log(loading())
            console.log(summary)
            setValues(summary)
        },3000)
    }
    )

}

setSummary()