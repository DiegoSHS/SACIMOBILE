import { setActuatorState, setupPage } from "./sethtml.js";
import { io } from "./socket.io.esm.min.js";
import { setupNav, getChangedTouches, getTouches } from "./touches.js";

let backGroundSocket

const onPause = () => {
    backGroundSocket = io('https://sacionweb.up.railway.app/', {
        transports: ['websocket', 'polling', 'flashsocket']
    })
    backGroundSocket.on('connect', () => {
        console.log('Connected')
        backGroundSocket.on('recieve-newactuator', (state) => {
            setActuatorState(state.name, true)
            navigator.vibrate(1000)
            navigator.notification.alert(`Actuador ${state.name} fue ${state.state ? 'encendido' : 'apagado'}`, () => { }, 'Sensor manipulado', 'Ok')
        })
    })
}

const onDeviceReady = () => {
    window.screen.orientation.lock('portrait')
    document.addEventListener('pause', onPause, false)
    window.addEventListener('touchstart', getTouches, false)
    window.addEventListener('touchend', getChangedTouches, false)
    setupNav()
    setupPage()
}

document.addEventListener('DOMContentLoaded', onDeviceReady, false)