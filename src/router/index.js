import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { auth } from '@/firebase/main'

import admin from '@/views/admin.vue'
import home from '@/views/home.vue'
import catalogo from '@/views/catalogo.vue'

import suscriptores from '@/views/admin_sites/suscriptores.vue'
import estadisticas from '@/views/admin_sites/estadisticas.vue'

import politicas_cookies from '@/views/politicas_cookies.vue'
import ubicacion from '@/views/ubicacion.vue'
import aviso_legal from '@/views/aviso_legal.vue'
import politicas_privacidad from '@/views/politicas_privacidad.vue'

import nosotros from '@/views/nosotros.vue'
import busca_joya from '@/views/busca_joya.vue'

// Landings
import anillos_compromiso from '@/views/secciones/anillos_compromiso.vue'
import regalos from '@/views/secciones/regalos.vue'

// Secciones / materiales / tipos (solo para SEO)
import anillos from '@/views/seccion_tipos/anillos.vue'
import pendientes from '@/views/seccion_tipos/pendientes.vue'
import cadenas from '@/views/seccion_tipos/cadenas.vue'
import pulseras from '@/views/seccion_tipos/pulseras.vue'
import colgantes from '@/views/seccion_tipos/colgantes.vue'

import oro from '@/views/seccion_material/oro.vue'
import plata from '@/views/seccion_material/plata.vue'
import acero from '@/views/seccion_material/acero.vue'

//Hub de joyas
import hub_joyas from '@/views/hub_joyas.vue'


const soloAdmin = (to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      next()
    } else {
      next('/admin')
    }
  })
}

export const routes = [
  { path: '/', component: home },
  { path: '/admin', component: admin },

  // Producto individual
  { path: '/joya/:id', component: () => import('@/views/joya_detalle.vue') },

  // 🔥 Catálogo dinámico para filtros
  { path: '/catalogo', component: catalogo },

  // Admin
  { path: '/admin/subs', component: suscriptores, beforeEnter: soloAdmin },
  { path: '/admin/estadisticas', component: estadisticas, beforeEnter: soloAdmin },

  // Legales
  { path: '/politicas', component: politicas_cookies },
  { path: '/ubicacion', component: ubicacion },
  { path: '/aviso_legal', component: aviso_legal },
  { path: '/politicas_privacidad', component: politicas_privacidad },

  // Landings / SEO
  { path: '/joyas/anillos-compromiso', component: anillos_compromiso },
  { path: '/joyas/regalos', component: regalos },
  { path: '/sobre-nosotros', component: nosotros },
  { path: '/buscar-joya', component: busca_joya },

  //Hub de joyas
  {path: '/joyas', component: hub_joyas},

  // URLs planas para SEO
  { path: '/joyas/oro', component: oro },
  { path: '/joyas/plata', component: plata },
  { path: '/joyas/acero', component: acero },

  { path: '/joyas/anillos', component: anillos },
  { path: '/joyas/pendientes', component: pendientes },
  { path: '/joyas/cadenas', component: cadenas },
  { path: '/joyas/pulseras', component: pulseras },
  { path: '/joyas/colgantes', component: colgantes },

  { path: '/anillos', redirect: '/joyas/anillos' },
  { path: '/pendientes', redirect: '/joyas/pendientes' },
  { path: '/cadenas', redirect: '/joyas/cadenas' },
  { path: '/pulseras', redirect: '/joyas/pulseras' },
  { path: '/colgantes', redirect: '/joyas/colgantes' },
  { path: '/oro', redirect: '/joyas/oro' },
  { path: '/plata', redirect: '/joyas/plata' },
  { path: '/acero', redirect: '/joyas/acero' },
  { path: '/anillos-compromiso', redirect: '/joyas/anillos-compromiso' },
  { path: '/regalos', redirect: '/joyas/regalos' },
]

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router