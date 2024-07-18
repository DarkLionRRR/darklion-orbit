import './style.css'
import './lib/darklion-orbit'
import DarkLionOrbit from './lib/darklion-orbit'

document.addEventListener('DOMContentLoaded', () => {
    const mainHeight = document.body.scrollHeight * 4.11
    const mainWidth = mainHeight / 1.010384

    const wrapperParams = {
        width: mainWidth,
        height: mainHeight,
        y: 0,
        x: -(window.screen.width * 1.34),
    }

    const orbitParams = {
        width: wrapperParams.width * 0.884615,
        height: wrapperParams.width * 0.884615,
        y: wrapperParams.height * 0.067377,
        x: wrapperParams.width * 0.057692,
    }

    new DarkLionOrbit('#app', {
        wrapper: wrapperParams,
        orbit: orbitParams,
        spaceBetween: 72,
        speed: 720,
    })
})
