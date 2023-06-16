import { addNoti, deleteAllNotis, getNotis } from "../indexdb/transactions.js"
import { useState } from "../requests.js"
import { idRef, isVisibleNotis } from "../sethtml.js"
import { updateCounter } from "../socket.js"
import Toastify from "../toasts/toastify-es.js"

let toast

const [badgeToasts, setBadgeToasts] = useState([])
/**
 * Creates a timestamp in the format dd/mm/yyyy hh:mm
 * @returns {String} the current time in the format dd/mm/yyyy hh:mm
 */
const timeStamp = () => {
    const date = new Date(Date.now())
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    return `${day}/${month}/${year} ${hour}:${minutes}`
}
/**
 * Generates the html string of a toast
 * @param {Boolean} state the state of the actuator
 * @param {String} name the name of the actuator
 * @param {String} timeStamp the timestamp of the notification
 * @param {Boolean} onBadge true if the notification is on the badge
 * @returns {String} the html string of the toast
 */
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
/**
 * Creates a html element of a toast
 * @param {String} contentHtml the html string of the toast
 * @returns {HTMLDivElement} the div element of the toast
 */
const toastDiv = (contentHtml) => {
    const icon = document.createElement('div')
    icon.classList.add('ui', 'tiny', 'message')
    icon.style.borderRadius = '10px'
    icon.innerHTML = contentHtml
    return icon
}
/**
 * Generates an object with the props of a toast
 * @param {Boolean} onBadge true if the notification is on the badge 
 * @param {Number} duration the duration of the toast in ms
 * @param {HTMLElement} element the element where the toast will be appended
 * @param {HTMLDivElement} customhtml the html that will be appended to the toast
 * @returns {Object} the props of the toast
 */
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
/**
 * Generates and array of toast props
 * @param {Array} toasts an array of objects with the props of the toasts
 * @returns {Array} an array of toast props
 */
const generateToasts = (toasts) => toasts.map(({ name, state, timestamp }) => {
    const html = toastHtml(state, name, timestamp, true)
    const icon = toastDiv(html)
    const element = idRef('notis')
    const props = toastProps(true, -1, element, icon)
    return props
})
/**
 * Shows the toasts on the DOM
 * @param {Array} toasts an array of objects with the props of the toasts
 */
export const setToasts = (toasts) => {
    idRef('notis').innerHTML = ''
    toasts.forEach((toast) => {
        const elem = Toastify(toast).showToast().toastElement
        elem.classList.remove('toastify-bottom')
        elem.classList.remove('toastify-left')
        elem.classList.remove('toastify-right')
    })
}
/**
 * Creates the badge with the notifications
 */
export const createBadge = async () => {
    const allnotis = await getNotis()
    setBadgeToasts(generateToasts(allnotis))
    setToasts(badgeToasts())
}
/**
 * Deletes all the notifications and hides the badge
 */
export const clearToasts = async () => {
    setBadgeToasts([])
    await deleteAllNotis()
    await updateCounter()
    idRef('notis').innerHTML = ''
}
/**
 * Generates a toast and shows it on the DOM and on the badge
 * @param {Object} param0 object with the state and name of the actuator
 * @param {Number} duration duration of the toast in ms
 * @param {Boolean} onBadge true if the notification is on the badge
 */
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