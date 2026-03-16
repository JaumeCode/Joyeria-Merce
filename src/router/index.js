import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase/main'
import admin from '@/views/admin.vue'
import home from '@/views/home.vue'
import footer_component from '@/components/footer_component.vue'
import portada from '@/components/portada.vue'
import catalogo from '@/views/catalogo.vue'
import suscriptores from '@/views/admin_sites/suscriptores.vue'
import estadisticas from '@/views/admin_sites/estadisticas.vue'
import politicas_cookies from '@/views/politicas_cookies.vue'
import ubicacion from '@/views/ubicacion.vue'
// Guard para rutas protegidas
const soloAdmin = (to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (user && user.emailVerified) {
      next()
    } else {
      next('/admin')
    }
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', component: home },
    { path: '/admin', component: admin },
    { path: '/footer', component: footer_component },
    { path: '/joya/:id', component: () => import('@/views/joya_detalle.vue') },
    { path: '/portada', component: portada },
    { path: '/catalogo', component: catalogo },
    { path: '/admin/subs', component: suscriptores, beforeEnter: soloAdmin },
    { path: '/admin/estadisticas', component: estadisticas, beforeEnter: soloAdmin },
    {path: "/politicas", component: politicas_cookies},
    {path: "/ubicacion", component: ubicacion}
  ],
})

export default router