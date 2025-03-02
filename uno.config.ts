import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetRemToPx({
            baseFontSize: 4,
        }),
    ],
    // 媒体查询
    theme: {
        breakpoints: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
    },
})
