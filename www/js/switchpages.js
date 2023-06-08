import { setActivetab } from "./touches.js"

/**
 * Checks if the page is in the center
 * @returns {Boolean} true if the page is in the center
 */
const isCenter = () => {
    const center = document.getElementById('page1')
    const left = center.classList.contains('sendLeft')
    const right = center.classList.contains('sendRight')
    return !(left || right)
}

/**
 * Sets the page in the center by removing the classes 'sendRight' and 'sendLeft'
 * @param {HTMLElement} element Page to set in the center
 */
const setCenter = (element) => {
    element.classList.remove('sendRight', 'sendLeft')
}
/**
 * Send the page to the right by adding the class 'sendRight'
 * @param {HTMLElement} element Page to send to the right
 */
const toggleRight = (element) => {
    element.classList.toggle('sendRight')
}
/**
 * Send the page to the left by adding the class 'sendLeft'
 * @param {HTMLElement} element Page to send to the left 
 */
const toggleLeft = (element) => {
    element.classList.toggle('sendLeft')
}
/**
 * Moves the center page to the right if is in the center, otherwise moves the page back to the center
 * @param {HTMLCollection} param0 The pages to move
 */

const goRight = ({center,right}) => {
    if(isCenter()){
        toggleLeft(center)
        setCenter(right)
        setActivetab(document.getElementById('aire'))
        console.log('right')
    }else{
        setActivetab(document.getElementById('inicio'))
        setCenter(center)
        toggleRight(right)
        console.log('center')
    }
}
/**
 * Moves the center page to the left if is in the center, otherwise moves the page back to the center
 * @param {HTMLCollection} param0 The pages to move
 */

const goLeft = ({left,center}) => {
    if(isCenter()){
        setActivetab(document.getElementById('suelo'))
        toggleRight(center)
        setCenter(left)
        console.log('left')
    }else{
        setActivetab(document.getElementById('inicio'))
        setCenter(center)
        toggleLeft(left)
        console.log('center')
    }
}
/**
 * If the touch is long enough, moves the page to the left or right based on the direction of the touch
 * @param {Number} touch The distance of the touch
 * @returns 
 */
export const togglePage = (touch) => {
    const longTouch = touch>80 || touch<-80
    if(!touch || !longTouch){
        return
    }
    const center = document.getElementById('page1')
    const left = document.getElementById('page2')
    const right = document.getElementById('page3')
    const leftmost = touch>0 && !left.classList.contains('sendLeft')
    const rightmost = touch<0 && !right.classList.contains('sendRight')
    if((leftmost || rightmost) && !isCenter()){
        return
    }
    if((touch<0 && isCenter() || touch>0 && !isCenter())){
        goRight({center,right})
    }else{
        goLeft({left,center})
    }
}
/**
 * Moves the pages to its initial position
 * @param {HTMLCollection} param0 The pages to move
 */
export const goCenterClick = ({left,center,right}) => {
    left.classList.add('sendLeft')
    right.classList.add('sendRight')
    center.classList.remove('sendLeft','sendRight')
}
/**
 * Moves the center page to the right and the left page to the center
 * @param {HTMLCollection} param0 The pages to move
 */
export const goLeftClick = ({left,center,right}) => {
    left.classList.remove('sendLeft')
    right.classList.add('sendRight')
    center.classList.add('sendRight')
}
/**
 * Moves the center page to the left and the right page to the center
 * @param {HTMLCollection} param0 The pages to move
 */
export const goRightClick = ({left,center,right}) => {
    left.classList.add('sendLeft')
    right.classList.remove('sendRight')
    center.classList.add('sendLeft')
}
