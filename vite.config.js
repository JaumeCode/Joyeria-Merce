import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Sitemap from 'vite-plugin-sitemap'

const PROJECT_ID = "joyeriamerce-runing"

// 🔥 Función para obtener TODAS las joyas (con paginación)
async function getAllJoyas() {
  let joyaRoutes = []
  let pageToken = null

  try {
    do {
      const url = new URL(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/joyas`
      )

      if (pageToken) {
        url.searchParams.append('pageToken', pageToken)
      }

      const res = await fetch(url)
      const data = await res.json()

      if (data.documents) {
        const newRoutes = data.documents
          .map(doc => {
            const slug = doc.fields?.slug?.stringValue
            return slug ? `/joya/${slug}` : null
          })
          .filter(Boolean)

        joyaRoutes.push(...newRoutes)
      }

      pageToken = data.nextPageToken || null

    } while (pageToken)

  } catch (e) {
    console.error("❌ Error cargando joyas:", e)
  }

  // 🔥 Eliminar duplicados
  joyaRoutes = [...new Set(joyaRoutes)]

  console.log(`✅ ${joyaRoutes.length} joyas cargadas para sitemap`)

  return joyaRoutes
}

export default defineConfig(async () => {
  const joyaRoutes = await getAllJoyas()

  if (!joyaRoutes.length) {
    console.warn("⚠️ No se cargaron joyas dinámicas")
  }

  const staticRoutes = [
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
  ]

  const allRoutes = [...staticRoutes, ...joyaRoutes]

  return {
    plugins: [
      vue(),
      vueDevTools(),
      Sitemap({
        hostname: 'https://joyeriamerce.es',

        // 🔥 Rutas dinámicas + estáticas
        dynamicRoutes: allRoutes,

        // 🔥 Opciones SEO (MUY recomendable)
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date(),

        // 🔥 Opcional: excluir rutas si quieres
        // exclude: ['/admin']

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

    // 🔥 SSG compatible
    ssgOptions: {
      includedRoutes: () => allRoutes
    },

    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      cssMinify: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      reportCompressedSize: false,
      chunkSizeWarningLimit: 500,
    },
  }
})