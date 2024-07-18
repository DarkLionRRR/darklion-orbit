export interface IElement {}

import { PositionType } from '../types/position.type'

export type ElementConfig = PositionType & {
    spaceBetween: number
    radius: number
}
