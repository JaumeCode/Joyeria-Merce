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
import anillos from '@/views/seccion_tipos/anillos.vue'
import pendientes from '@/views/seccion_tipos/pendientes.vue'
import cadenas from '@/views/seccion_tipos/cadenas.vue'
import pulseras from '@/views/seccion_tipos/pulseras.vue'
import colgantes from '@/views/seccion_tipos/colgantes.vue'

//Materiales
import oro from '@/views/seccion_material/oro.vue'
import plata from '@/views/seccion_material/plata.vue'
import acero from '@/views/seccion_material/acero.vue'


//Secciones Generales
import anillos_compromiso from '@/views/secciones/anillos_compromiso.vue'
import regalos from '@/views/secciones/regalos.vue'

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
  { path: '/joya/:id', component: () => import('@/views/joya_detalle.vue') },
  { path: '/catalogo', component: catalogo },
  { path: '/admin/subs', component: suscriptores, beforeEnter: soloAdmin },
  { path: '/admin/estadisticas', component: estadisticas, beforeEnter: soloAdmin },
  { path: '/politicas', component: politicas_cookies },
  { path: '/ubicacion', component: ubicacion },
  { path: '/aviso_legal', component: aviso_legal },
  { path: '/politicas_privacidad', component: politicas_privacidad },
  { path:'/anillos' ,component: anillos},
  { path: '/pendientes' ,component: pendientes},
  { path: '/colgantes' ,component: colgantes},
  { path: '/pulseras' ,component: pulseras},
  { path: '/cadenas' ,component: cadenas},
  { path: '/oro' ,component: oro},
  { path: '/plata' ,component: plata},
  { path: '/acero' ,component: acero},
  { path: '/anillos-compromiso' ,component: anillos_compromiso},
  { path: '/regalos', component: regalos}
]

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router