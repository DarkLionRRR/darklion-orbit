import { IWrapper, WrapperConfig } from './wrapper.interface'

class Wrapper implements IWrapper {
    protected selector: string
    protected width: number = 5200
    protected height: number = 5254
    protected y: number = 0
    protected x: number = -2578

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

    constructor(selector: string, params: WrapperConfig) {
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
}

export default Wrapper
