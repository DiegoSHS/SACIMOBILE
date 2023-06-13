import { setupPage } from "./sethtml.js";
import { setupNav, getChangedTouches, getTouches } from "./touches.js";

window.screen.orientation.lock('portrait')
window.addEventListener('touchstart', getTouches)
window.addEventListener('touchend', getChangedTouches)

setupNav()
setupPage()