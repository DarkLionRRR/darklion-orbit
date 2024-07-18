import './darklion-orbit.css'
import { DarkLionOrbitConfig, IDarkLionOrbit } from './darklion-orbit.interface'
import Element from './element/Element'
import Orbit from './orbit/Orbit'
import Wrapper from './wrapper/Wrapper'

class DarkLionOrbit implements IDarkLionOrbit {
    protected mainSelector: string

    protected params: DarkLionOrbitConfig

    protected angle: number = 0

    protected interval: any

    public wrapper?: Wrapper
    public orbit?: Orbit
    public element?: Element

    constructor(mainSelector: string, params: DarkLionOrbitConfig) {
        this.mainSelector = mainSelector
        this.params = params
        this.init()
    }

    public init() {
        this.wrapper = new Wrapper(this.mainSelector, this.params.wrapper)

        this.orbit = new Orbit(
            `${this.mainSelector} .darklion-orbit__wrapper`,
            this.params.orbit
        )

        this.element = new Element(
            `${this.mainSelector} .darklion-orbit__element`,
            {
                radius: this.orbit.getWidth / 2,
                y: 0,
                x: 0,
                spaceBetween: this.params.spaceBetween,
            }
        )

        if (!this.orbit.$el || !this.element.$elList.length) {
            return
        }

        this.orbit.$el.style.transition = `transform ${this.params.speed}ms linear`

        this.element.$elList.forEach($elem => {
            $elem.style.transition = `transform ${this.params.speed - 20}ms linear`
        })

        this.element.$cloneList.length &&
            this.element.$cloneList.forEach($elem => {
                $elem.style.transition = `transform ${this.params.speed - 20}ms linear`
            })

        this.start()

        this.element.$elList.forEach($elem => {
            $elem.addEventListener('mousemove', this.stop.bind(this))
            $elem.addEventListener('mouseleave', this.start.bind(this))
        })

        this.element.$cloneList.length &&
            this.element.$cloneList.forEach($elem => {
                $elem.addEventListener('mousemove', this.stop.bind(this))
                $elem.addEventListener('mouseleave', this.start.bind(this))
            })

        return true
    }

    public next(): void {
        if (!this.orbit || !this.element) {
            return
        }

        this.angle += this.element.step
        this.orbit.next(this.angle)
        this.element.next(this.angle)
    }

    public start(): void {
        this.next()
        this.interval = setInterval(this.next.bind(this), this.params.speed)
    }

    public stop(): void {
        clearInterval(this.interval)
    }

    public destroy() {
        this.stop()
        this.element && this.element.destroy()
        this.element = undefined
        this.orbit = undefined
        this.wrapper = undefined
    }
}

export default DarkLionOrbit
