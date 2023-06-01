import { useState } from "./requests.js"
import { goCenterClick, goLeftClick, goRightClick, togglePage } from "./switchpages.js"

const [touchPos, setTouchPos] = useState({
    x: 0,
    y: 0
})

export const getTouches = (e) => {
    const { clientX, clientY } = e.touches[0]
    setTouchPos({ x: clientX, y: clientY })
    return { clientX, clientY }
}

export const getChangedTouches = (e) => {
    const { clientX, clientY } = e.changedTouches[0]
    const { x, y } = touchPos()
    const diffX = Math.trunc(clientX - x)
    //document.getElementById('suelo').innerHTML = diffX
    togglePage(diffX)
    return { clientX, clientY }
}

export const setActive = (e) => {
    const element = document.getElementById(e.target.id)
    setActivetab(element)
}

export const setActivetab = (element) => {
    const tabs = document.querySelectorAll('.navitem')
    tabs.forEach(tab => tab.classList.remove('active'))
    element.classList.add('active')
}

export const setupNav = () => {
    const tabs = document.querySelectorAll('.navitem')
    tabs.forEach(tab => tab.addEventListener('click', setActive))
    const leftTab = document.getElementById('suelo')
    const rightTab = document.getElementById('aire')
    const centerTab = document.getElementById('inicio')
    const center = document.getElementById('page1')
    const left = document.getElementById('page2')
    const right = document.getElementById('page3')
    leftTab.addEventListener('click',()=>{
        goLeftClick({left,center,right})
    })
    rightTab.addEventListener('click',()=>{
        goRightClick({left,center,right})
    })
    centerTab.addEventListener('click',()=>{
        goCenterClick({left,center,right})
    })
}