import { setActivetab } from "./touches.js"

const isCenter = () => {
    const center = document.getElementById('page1')
    const left = center.classList.contains('sendLeft')
    const right = center.classList.contains('sendRight')
    return !(left || right)
}

const setCenter = (element) => {
    element.classList.remove('sendRight', 'sendLeft')
}

const toggleRight = (element) => {
    element.classList.toggle('sendRight')
}

const toggleLeft = (element) => {
    element.classList.toggle('sendLeft')
}

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

export const goCenterClick = ({left,center,right}) => {
    left.classList.add('sendLeft')
    right.classList.add('sendRight')
    center.classList.remove('sendLeft','sendRight')
}
export const goLeftClick = ({left,center,right}) => {
    left.classList.remove('sendLeft')
    right.classList.add('sendRight')
    center.classList.add('sendRight')
}
export const goRightClick = ({left,center,right}) => {
    left.classList.add('sendLeft')
    right.classList.remove('sendRight')
    center.classList.add('sendLeft')
}
