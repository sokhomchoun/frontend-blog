import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
        server: {
        host: '0.0.0.0', // Required for Docker
        port: 5173, // Ensure it matches docker-compose.yml
        watch: {
            usePolling: true, // Fixes file change detection
        },
    },
});