import {
    fileURLToPath,
    URL
} from 'node:url'
import {
    defineConfig
} from 'vite'
import vue
    from '@vitejs/plugin-vue'
import UnoCSS
    from 'unocss/vite'

export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),],
    build: {
        minify: "terser",
        terserOptions: {
            // 配置打包完取消打印和debugger
            //compress: {
            //    drop_console: true,
            //    drop_debugger: true
            //}
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            host: "localhost",
            port: "5174",
            open: "true",
            https: "true",
            cors: "true",
            "/api": {
                target: "http://192.168.3.117:7021",
                // target: "https://www.likefigure8.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
})
