import Toastify from "../toastify-es.js"

export const createToast = (message, duration) => {
    const contentHtml = `
        <div class="content">
            <i class="power icon"></i>
            ${message}
        </div>`
    const icon = document.createElement('div')
    icon.classList.add('ui', 'mini', 'message')
    icon.innerHTML = contentHtml
    Toastify({
        duration: duration,
        node: icon,
        gravity: "top",
        position: 'right',
        style:{
            padding: '0',
            margin: '0',
            border: 'none',
            borderRadius: '10px'
        }
    }).showToast()
}