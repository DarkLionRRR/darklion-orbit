import { OrbitConfig } from './orbit.interface'

class Orbit {
    protected selector: string
    protected width: number = 4600
    protected height: number = 4600
    protected y: number = 354
    protected x: number = 300

    public $el: HTMLElement | null

    private setParams() {
        if (!this.$el) {
            throw new Error('HTML элемент отсутствует')
        }

        this.$el.style.width = `${this.width}px`
        this.$el.style.height = `${this.height}px`
        this.$el.style.top = `${this.y}px`
        this.$el.style.left = `${this.x}px`
    }

    constructor(selector: string, params: OrbitConfig) {
        this.selector = selector

        this.$el = document.querySelector(this.selector)

        if (!this.$el) {
            throw new Error('Элемент не найден.')
        }

        this.width = params.width
        this.height = params.height
        this.y = params.y
        this.x = params.x

        this.setParams()
    }

    get getWidth(): number {
        return this.width
    }

    public next(value: number): void {
        if (!this.$el) {
            throw new Error('HTML элемент отсутствует')
        }

        this.$el.style.transform = `rotate(${value}deg)`
    }
}

export default Orbit
