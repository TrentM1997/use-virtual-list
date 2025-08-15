/// <reference types="vite/client" />

export interface MockData {
    id: number,
    title: string,
    description: string
}

export type Ctx = boolean;

interface Loader {
    context: boolean
}