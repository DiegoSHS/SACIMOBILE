import { idRef, isVisibleNotis } from "../sethtml.js"
import Toastify from "../toasts/toastify-es.js"

export let badgeToasts = []
let toast

const toastHtml = (state, name, onBadge) => {
    const date = new Date(Date.now())
    return (
        `
        <div class="content">
        ${onBadge ? date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' : ''}
            <i class="power icon ${state ? 'green' : 'red'}"></i>
            ${`Actuador ${name} ${state ? 'encendido' : 'apagado'}`}
        </div>
        `
    )
}

const toastDiv = (contentHtml) => {
    const icon = document.createElement('div')
    icon.classList.add('ui', 'mini', 'message')
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

export const stateToast = ({ state, name }, duration, onBadge) => {
    if (toast && !onBadge) {
        toast.hideToast()
    }
    const notis = idRef('notis')
    const badgeHtml = toastHtml(state, name, true)
    const badgeDiv = toastDiv(badgeHtml)
    const badgeProps = toastProps(true, duration, notis, badgeDiv)
    badgeToasts.push(badgeProps)
    if (isVisibleNotis('notifications')) {
        setToasts(badgeToasts)
    } else {
        const element = idRef('toasts')
        const html = toastHtml(state, name, false)
        const icon = toastDiv(html)
        const props = toastProps(false, duration, element, icon)
        toast = Toastify(props)
        toast.showToast()
    }
}

export const setToasts = (toasts) => {
    console.log('Seting toasts')
    idRef('notis').innerHTML = ''
    toasts.forEach((toast) => {
        const elem = Toastify(toast).showToast().toastElement
        elem.classList.remove('toastify-bottom')
        elem.classList.remove('toastify-left')
        elem.classList.remove('toastify-right')
    })
}

export const clearToasts = () => {
    badgeToasts = []
    idRef('notis').innerHTML = ''
}