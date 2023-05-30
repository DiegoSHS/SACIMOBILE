import { navbar } from "./components/navbar.js"

const setNavbar = () => {
    document.getElementById('navbar').innerHTML = navbar()
}
setNavbar()

const useButton = () => {
    console.log('button clicked')
}

document.getElementById('but').addEventListener('click', useButton)