import { createBadge, stateToast } from "./components/toast.js"
import { getNotis } from "./indexdb/transactions.js"
import { useState } from "./requests.js"
import { idRef, isVisibleNotis, toggleColorButton, toggleTextButton } from "./sethtml.js"
import { io } from "./socket.io.esm.min.js"

let socket
const [notifyCounter, setNotifyCounter] = useState(0)

export const updateCounter = async () => {
    const notis = await getNotis()
    const count = notis.length
    setNotifyCounter(count)
}

export const toggleVisibleCount = async () => {
    if (notifyCounter()) {
        idRef('noticounter').classList.toggle('hidden')
    }
}

export const setupBadge = async () => {
    createBadge()
    await updateCounter()
    const counter = idRef('noticounter')
    if (notifyCounter()) {
        counter.classList.remove('hidden')
        counter.innerHTML = notifyCounter()
    } else {
        counter.classList.add('hidden')
    }
}

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
    socket.on('recieve-newactuator', async(state) => {
        const { name } = state
        const noti = idRef('noticounter')
        toggleColorButton(name)
        toggleTextButton(name)
        if (isVisibleNotis('notifications')) {
            stateToast(state, -1, true)
        } else {
            noti.classList.remove('hidden')
            stateToast(state, 1500, false)
        }
        await updateCounter()
        noti.innerHTML = notifyCounter()
    })
}
export const emitState = (socket, { name, state }) => {
    socket.emit('send-newactuator', {
        name,
        state
    })
}