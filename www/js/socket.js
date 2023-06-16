import { stateToast } from "./components/toast.js"
import { isVisibleNotis, toggleColorButton, toggleTextButton } from "./sethtml.js"
import { io } from "./socket.io.esm.min.js"

let socket
export let notifyCounter = 0

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
        if(isVisibleNotis('notifications')) {
            stateToast(state, 1500, true)
            notifyCounter++
        }else{
            stateToast(state, 5000, false)
        }
    })
}
export const emitState = (socket, { name, state }) => {
    socket.emit('send-newactuator', {
        name,
        state
    })
}