import { addNoti, deleteAllNotis, getNotis } from "../indexdb/transactions.js"
import { useState } from "../requests.js"
import { idRef, isVisibleNotis } from "../sethtml.js"
import { toggleVisibleCount, updateCounter } from "../socket.js"
import Toastify from "../toasts/toastify-es.js"

let toast

const [badgeToasts, setBadgeToasts] = useState([])

const timeStamp = () => {
    const date = new Date(Date.now())
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    return `${day}/${month}/${year} ${hour}:${minutes}`
}

const toastHtml = (state, name, timeStamp, onBadge) => {
    return (
        `
        <div class="content">
            <i class="power icon ${state ? 'green' : 'red'}"></i>
            Actuador ${name} ${state ? 'encendido' : 'apagado'}
            ${onBadge ? `<div class="ui label active mini">${timeStamp}</div>` : ''}
        </div>
        `
    )
}

const toastDiv = (contentHtml) => {
    const icon = document.createElement('div')
    icon.classList.add('ui', 'tiny', 'message')
    icon.style.borderRadius = '10px'
    icon.innerHTML = contentHtml
    return icon
}

const toastProps = (onBadge, duration, element, customhtml) => ({
    selector: element,
    duration: onBadge ? -1 : duration,
    node: customhtml,
    gravity: "top",
    position: 'right',
    offset: onBadge ? {} : { y: 25 },
    style: {
        position: onBadge ? 'relative' : 'fixed',
        display: onBadge ? 'inline' : 'inline-block',
        border: 'none',
        borderRadius: '10px',
        maxWidth: '100%'
    }
})

const generateToasts = (toasts) => toasts.map(({ name, state, timestamp }) => {
    const html = toastHtml(state, name, timestamp, true)
    const icon = toastDiv(html)
    const element = idRef('notis')
    const props = toastProps(true, -1, element, icon)
    return props
})

export const setToasts = (toasts) => {
    idRef('notis').innerHTML = ''
    toasts.forEach((toast) => {
        const elem = Toastify(toast).showToast().toastElement
        elem.classList.remove('toastify-bottom')
        elem.classList.remove('toastify-left')
        elem.classList.remove('toastify-right')
    })
}

export const createBadge = async () => {
    const allnotis = await getNotis()
    setBadgeToasts(generateToasts(allnotis))
    setToasts(badgeToasts())
}

export const clearToasts = async () => {
    setBadgeToasts([])
    await deleteAllNotis()
    await updateCounter()
    idRef('notis').innerHTML = ''
}

export const stateToast = async ({ state, name }, duration, onBadge) => {
    if (toast && !onBadge) {
        toast.hideToast()
    }
    await addNoti({ state, name, timestamp: timeStamp() })
    if (isVisibleNotis('notifications')) {
        createBadge()
    } else {
        const element = idRef('toasts')
        const html = toastHtml(state, name, false)
        const icon = toastDiv(html)
        const props = toastProps(false, duration, element, icon)
        toast = Toastify(props)
        toast.showToast()
    }
}