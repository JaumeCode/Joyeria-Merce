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
    joyaRoutes = data.documents
      .map(doc => {
        const slug = doc.fields?.slug?.stringValue
        if (!slug) return null
        return `/joya/${slug}`
      })
      .filter(Boolean) 
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
  },
  build: {
    // ⚡ Optimizaciones de rendimiento
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    cssMinify: true,
    cssCodeSplit: true, // Divide CSS por chunk
    rollupOptions: {
      output: {
        // Minimiza nombres de archivos
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Compresión agresiva
    reportCompressedSize: false,
    chunkSizeWarningLimit: 500, // Alerta si chunk > 500KB
  },
})