import Toastify from "../toasts/toastify-es.js"

export const stateToast = (state, duration) => {
    const contentHtml = `
        <div class="content">
            <i class="power icon ${state.state ? 'green' : 'red'}"></i>
            ${`Actuador ${state.name} ${state.state ? 'encendido' : 'apagado'}`}
        </div>`
    const icon = document.createElement('div')
    icon.classList.add('ui', 'mini', 'message')
    icon.style.borderRadius = '10px'
    icon.innerHTML = contentHtml
    Toastify({
        duration: duration,
        node: icon,
        gravity: "top",
        position: 'right',
        style: {
            padding: '0',
            margin: '0',
            border: 'none',
            borderRadius: '10px'
        }
    }).showToast()
}