import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/lib/darklion-orbit.ts'),
            name: 'darklionOrbit',
            fileName: 'darklion-orbit',
            formats: ['iife'],
        },
    },
})
