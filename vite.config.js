import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'

const PROJECT_ID = "joyeriamerce-runing"

let joyaRoutes = []
try {
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/joyas`
  )
  const data = await res.json()
  console.log("Respuesta Firestore:", JSON.stringify(data).slice(0, 300))
  if (data.documents) {
    joyaRoutes = data.documents.map(doc => {
      const parts = doc.name.split('/')
      return `/joya/${parts[parts.length - 1]}`
    })
  }
  console.log("Rutas de joyas:", joyaRoutes)
} catch (e) {
  console.error("Error:", e)
}

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Sitemap({
      hostname: 'https://joyeriamerce.es',
      dynamicRoutes: [
        '/catalogo',
        '/ubicacion',
        '/buscar-joya',
        '/sobre-nosotros',
        '/joyas',
        '/joyas/regalos',
        '/joyas/anillos-compromiso',
        '/joyas/oro',
        '/joyas/plata',
        '/joyas/acero',
        '/joyas/anillos',
        '/joyas/colgantes',
        '/joyas/cadenas',
        '/joyas/pendientes',
        '/joyas/pulseras',
        ...joyaRoutes
      ]
    }),
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
    includedRoutes: (paths) => [...paths, ...joyaRoutes]
  }
})