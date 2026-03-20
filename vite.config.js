import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  ssr: {
    noExternal: ['vue-toastification']
  },
  ssgOptions: {
    includedRoutes: async (paths) => {
      const PROJECT_ID = "joyeriamerce-runing"
      
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/joyas`
      )
      const data = await res.json()
      const ids = data.documents.map(doc => {
        const parts = doc.name.split('/')
        return `/joya/${parts[parts.length - 1]}`
      })

      return [...paths, ...ids]
    }
  }
})