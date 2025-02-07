import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5000,
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Cross-Origin-Embedder-Policy": "unsafe-none",
            "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
        },
    }
})
