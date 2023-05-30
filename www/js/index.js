import { navbar } from "./components/navbar.js"
import { getSummary } from "./requests.js";
const setNavbar = () => {
    document.getElementById('navbar').innerHTML = navbar()
}
getSummary()