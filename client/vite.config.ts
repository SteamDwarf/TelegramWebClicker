import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: "/src",
            pages: "/src/pages/",
            assets: "/src/assets/",
            app: "/src/app/",
            widgets: "/src/widgets/",
            features: "/src/features/",
            entities: "/src/entities/",
            components: "/src/components/",
            shared: "/src/shared"
        }
    }
})
