/// <reference types="vite/client" />

export interface MockData {
    id: number,
    title: string,
    description: string
}

export type Ctx = boolean;

interface Loader {
    context?: boolean
}

export interface CycleButton {
    setIndex: React<React.SetStateAction<number>>,
    scrollers: string[],
    index: number
}


export interface RenderTitles {
    scrollers: string[],
    index: number
}

export interface CycleScrollers {
    index: number
}