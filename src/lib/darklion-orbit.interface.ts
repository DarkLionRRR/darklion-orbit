import { OrbitConfig } from './orbit/orbit.interface'
import { WrapperConfig } from './wrapper/wrapper.interface'

export interface IDarkLionOrbit {
    init: () => void
    next: () => void
    start: () => void
    stop: () => void
    destroy: () => void
}

export type DarkLionOrbitConfig = {
    wrapper: WrapperConfig
    orbit: OrbitConfig
    spaceBetween: number
    speed: number
}
