import { setupPage, toggleColorButton, toggleTextButton } from "./sethtml.js";
import { setupBadge, setupEvents, setupSocket } from "./socket.js";
import { setupNav, getChangedTouches, getTouches } from "./touches.js";

const onPause = () => {
    socket = setupSocket()
    socket.on('connect', () => {
        console.log('Connected')
        socket.on('recieve-newactuator', (state) => {
            toggleColorButton(id)
            toggleTextButton(id)
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
    setupEvents(setupSocket())
    setupNav()
    setupBadge()
    setupPage()
}

document.addEventListener('DOMContentLoaded', onDeviceReady, false)