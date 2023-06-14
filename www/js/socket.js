import { stateToast } from "./components/toast.js"
import { toggleColorButton, toggleTextButton } from "./sethtml.js"
import { io } from "./socket.io.esm.min.js"

let socket
export const setupSocket = () => {
    if (socket) {
        console.log('Socket already setup')
    } else {
        console.log('Setting up socket')
        socket = io('https://sacionweb.up.railway.app/', {
            transports: ['websocket', 'polling', 'flashsocket']
        })
        socket.on('connect', () => {
            console.log('Socket connected')
        })
    }
    return socket
}
export const setupEvents = (socket) => {
    socket.on('recieve-newactuator', (state) => {
        const { name } = state
        toggleColorButton(name)
        toggleTextButton(name)
        stateToast(state, 1500)
    })
}
export const emitState = (socket, { name, state }) => {
    socket.emit('send-newactuator', {
        name,
        state
    })
}