import { stateToast } from "./components/toast.js"
import { setActuatorState } from "./sethtml.js"
import { io } from "./socket.io.esm.min.js"

let socket
const socketSetup = () => {
    socket = io('https://sacionweb.up.railway.app/',{
        transports: ['websocket', 'polling', 'flashsocket']
    })
    socket.on('connect', () => {
        console.log('Connected')
        socket.on('recieve-newactuator', (state) => {
            setActuatorState(state.name, true)
            stateToast(state,1500)
        })
    })
    
    console.log('Socket setup')
}

socketSetup()