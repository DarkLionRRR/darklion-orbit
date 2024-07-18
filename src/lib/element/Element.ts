import { ElementConfig } from './element.interface'

class Element {
    protected selector: string
    protected width: number = 4600
    protected height: number = 4600
    protected startY: number = 354
    protected startX: number = 300
    protected spaceBetween: number = 0
    protected x: number = 0
    protected y: number = 0
    protected radius: number = 0

    public step: number = 0

    public $elList: HTMLElement[]
    public $cloneList: HTMLElement[] = []

    private cloneElements(): void {
        const size = this.$elList[0].offsetWidth + this.spaceBetween
        const $parent = this.$elList[0].parentElement
        const circumference = 2 * Math.PI * this.radius

        const quantity = Math.round(circumference / size)

        if (this.$elList.length >= quantity) {
            return
        }

        while (this.$elList.length + this.$cloneList.length < quantity) {
            for (let i = 0; i < this.$elList.length - 1; i++) {
                const $clone = document.createElement('div')
                $clone.className = this.$elList[i].className
                $clone.innerHTML = this.$elList[i].innerHTML
                $parent?.appendChild($clone)
                this.$cloneList.push($clone)

                if (this.$elList.length + this.$cloneList.length >= quantity) {
                    break
                }
            }
        }
    }

    private setParams(): void {
        if (!this.$elList.length) {
            throw new Error('HTML элемент отсутствует')
        }

        this.step =
            (2 * Math.PI) / (this.$elList.length + this.$cloneList.length)
        let angle = 0

        this.$elList.forEach($elem => {
            const x = Math.round(
                this.radius +
                    this.radius * Math.cos(angle) -
                    $elem.offsetWidth / 2
            )
            const y = Math.round(
                this.radius +
                    this.radius * Math.sin(angle) -
                    $elem.offsetHeight / 2
            )

            $elem.style.top = `${y}px`
            $elem.style.left = `${x}px`

            angle += this.step
        })

        this.$cloneList.forEach($elem => {
            const x = Math.round(
                this.radius +
                    this.radius * Math.cos(angle) -
                    $elem.offsetWidth / 2
            )
            const y = Math.round(
                this.radius +
                    this.radius * Math.sin(angle) -
                    $elem.offsetHeight / 2
            )

            $elem.style.top = `${y}px`
            $elem.style.left = `${x}px`

            angle += this.step
        })
    }

    constructor(selector: string, params: ElementConfig) {
        this.selector = selector

        this.$elList = Array.from(document.querySelectorAll(this.selector))

        if (!this.$elList.length) {
            throw new Error('Элемент не найден.')
        }

        this.startY = params.y
        this.startX = params.x
        this.radius = params.radius
        this.spaceBetween = params.spaceBetween

        this.cloneElements()
        this.setParams()
    }

    public next(value: number): void {
        this.$elList.forEach($elem => {
            $elem.style.transform = `rotate(-${value}deg)`
        })

        this.$cloneList.forEach($elem => {
            $elem.style.transform = `rotate(-${value}deg)`
        })
    }

    public destroy(): void {
        this.$cloneList.length && this.$cloneList.forEach($elem => {
            $elem.remove()
        })
        this.$cloneList = []
    }
}

export default Element
