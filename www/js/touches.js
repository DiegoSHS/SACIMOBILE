import { clearToasts } from "./components/toast.js"
import { useState } from "./requests.js"
import { idRef, toggleVisible } from "./sethtml.js"
import { toggleVisibleCount } from "./socket.js"
import { goCenterClick, goLeftClick, goRightClick, togglePage } from "./switchpages.js"

const [touchPos, setTouchPos] = useState({
    x: 0,
    y: 0
})
/**
 * Returns the x and y coordinates of the touch based on the first touch
 * @param {TouchEvent} e touch event
 * @returns the x and y coordinates of the touch
 */
export const getTouches = (e) => {
    const { clientX, clientY } = e.touches[0]
    setTouchPos({ x: clientX, y: clientY })
    return { clientX, clientY }
}
/**
 * Calculates the difference between the first touch and the current touch and sends it to the togglePage function
 * @param {TouchEvent} e touch event
 * @returns coordinates of the current touch and the difference between the first touch and the current touch
 */
export const getChangedTouches = (e) => {
    const { clientX, clientY } = e.changedTouches[0]
    const { x } = touchPos()
    const diffX = Math.trunc(clientX - x)
    togglePage(diffX)
    return { clientX, clientY, diffX }
}
/**
 * Sets the active tab to the one that was clicked
 * @param {Event} e 
 */
export const setActive = (e) => {
    const element = idRef(e.target.id)
    setActivetab(element)
}
/**
 * Removes the active class from all tabs and adds it to the one that was clicked
 * @param {HTMLElement} element 
 */
export const setActivetab = (element) => {
    const tabs = document.querySelectorAll('.navitem')
    tabs.forEach(tab => tab.classList.remove('active'))
    element.classList.add('active')
}

export const setupNav = () => {
    const tabs = document.querySelectorAll('.navitem')
    tabs.forEach(tab => tab.addEventListener('click', setActive))
    const leftTab = idRef('suelo')
    const rightTab = idRef('aire')
    const centerTab = idRef('inicio')
    const center = idRef('page1')
    const left = idRef('page2')
    const right = idRef('page3')
    const notiBtn = idRef('notibtn')
    const clearBtn = idRef('cleartoasts')
    const goleft = () => goLeftClick({ left, center, right })
    const goright = () => goRightClick({ left, center, right })
    const gocenter = () => goCenterClick({ left, center, right })
    leftTab.addEventListener('click', goleft)
    rightTab.addEventListener('click', goright)
    centerTab.addEventListener('click', gocenter)
    notiBtn.addEventListener('click', ()=>{
        toggleVisibleCount()
        toggleVisible('notifications')
    })
    clearBtn.addEventListener('click', clearToasts)
}