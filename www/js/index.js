import { navbar } from "./components/navbar.js"

const setNavbar = () => {
    document.getElementById('navbar').innerHTML = navbar()
}
setNavbar()
