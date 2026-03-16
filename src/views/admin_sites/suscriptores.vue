<template>
  <div class="pagina">

    <aside class="sidebar">
        <div class="sidebar-brand">
            <span class="sidebar-gem">✦</span>
            <div>
            <p class="sidebar-title">Joyería Mercè</p>
            <p class="sidebar-role">Administración</p>
            </div>
            <button class="btn-menu-toggle" @click="menuAbierto = !menuAbierto">
            {{ menuAbierto ? '✕' : '☰' }}
            </button>
        </div>
        <nav class="sidebar-nav" :class="{ abierto: menuAbierto }">
            <router-link class="nav-item" to="/admin" @click="menuAbierto = false">
            <span class="nav-icon">◈</span> Colección
            </router-link>
            <router-link class="nav-item" to="/admin/estadisticas" @click="menuAbierto = false">
            <span class="nav-icon">◇</span> Estadísticas
            </router-link>
            <router-link class="nav-item" to="/admin/subs" @click="menuAbierto = false">
            <span class="nav-icon">✉</span> Suscriptores
            </router-link>
        </nav>
    </aside>

    <main class="main-content">

      <section class="stats-row">
        <div class="stat-pill accent">
          <span class="stat-val">{{ store_correos.correos.length }}</span>
          <span class="stat-lbl">Total suscriptores</span>
        </div>
      </section>

      <section class="panel-section">
        <div class="panel-head">
          <h2>Suscriptores</h2>
          <p>Correos registrados para recibir novedades</p>
        </div>

        <div class="filter-bar">
          <input class="filter-search" v-model="buscador" placeholder="Buscar correo...">
        </div>

        <div class="correo-list">
          <div v-for="c in correos_filtrados" :key="c.id" class="correo-row">
            <span class="correo-icon">✉</span>
            <span class="correo-email">{{ c.correo }}</span>
            <span class="correo-fecha">{{ new Date(c.fecha_creacion).toLocaleDateString() }}</span>
            <button class="btn-del" @click="eliminar(c.id)">Eliminar</button>
          </div>
          <div v-if="!correos_filtrados.length" class="correo-vacio">
            No hay suscriptores todavía
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCorreosStore } from '@/stores/correos'
import { useToast } from 'vue-toastification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/main'
import { useRouter } from 'vue-router'

const router=useRouter()

onAuthStateChanged(auth,(user)=>{

    if (!auth.currentUser || !user.emailVerified) {
        router.push('/admin')
    }

})

//Modo movile 
const menuAbierto = ref(false)


const store_correos = useCorreosStore()
const toast = useToast()
const buscador = ref('')

onMounted(async () => {
  await store_correos.obtener_correos()
})

const correos_filtrados = computed(() => {
  return store_correos.correos.filter(c =>
    !buscador.value || c.correo.toLowerCase().includes(buscador.value.toLowerCase())
  )
})

const eliminar = async (id) => {
  const resultado = await store_correos.eliminar_correo(id)
  if (resultado.ok) {
    await store_correos.obtener_correos()
    toast.success("Suscriptor eliminado")
  } else {
    toast.error("Error al eliminar")
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap')

$white:      #FFFFFF
$off-white:  #F9F8F6
$bg:         #F4F2EE
$line:       #E8E4DE
$line-soft:  #F0EDE8
$text:       #1C1917
$text-mid:   #57534E
$text-muted: #A8A29E
$gold:       #B8860B
$gold-soft:  #D4A017
$red:        #991B1B
$red-bg:     #FEE2E2
$shadow-sm:  0 1px 3px rgba(28,25,23,0.06)
$shadow-md:  0 4px 16px rgba(28,25,23,0.08)
$shadow-lg:  0 20px 60px rgba(28,25,23,0.12)
$serif: 'Playfair Display', Georgia, serif
$sans:  'DM Sans', sans-serif

*
  box-sizing: border-box
  margin: 0
  padding: 0

.pagina
  display: flex
  min-height: 100vh
  background: $bg

.sidebar
  width: 260px
  flex-shrink: 0
  background: $white
  border-right: 1px solid $line
  display: flex
  flex-direction: column
  padding: 2rem 1.5rem
  position: sticky
  top: 0
  height: 100vh

.sidebar-brand
  display: flex
  align-items: center
  gap: 1rem
  padding-bottom: 2rem
  border-bottom: 1px solid $line-soft
  margin-bottom: 2rem

.sidebar-gem
  font-size: 1.4rem
  color: $gold

.sidebar-title
  font-family: $serif
  font-size: 1rem
  font-weight: 500
  color: $text

.sidebar-role
  font-family: $sans
  font-size: .72rem
  color: $text-muted
  letter-spacing: .08rem
  text-transform: uppercase

.sidebar-nav
  display: flex
  flex-direction: column
  gap: .3rem

.nav-item
  display: flex
  align-items: center
  gap: .8rem
  padding: .7rem 1rem
  border-radius: 8px
  font-family: $sans
  font-size: .88rem
  color: $text-muted
  cursor: pointer
  text-decoration: none
  transition: background .15s, color .15s

  .nav-icon
    font-size: .9rem

  &:hover
    background: $off-white
    color: $text

  &.router-link-active
    background: $off-white
    color: $text
    font-weight: 500

.main-content
  flex: 1
  padding: 2.5rem 3rem
  overflow-y: auto
  min-width: 0

.stats-row
  display: flex
  gap: 1rem
  margin-bottom: 2.5rem

.stat-pill
  flex: 1
  background: $white
  border: 1px solid $line
  border-radius: 12px
  padding: 1.5rem 1.8rem
  display: flex
  flex-direction: column
  gap: .3rem

  &.accent
    background: $text
    border-color: $text

    .stat-val
      color: $white

    .stat-lbl
      color: rgba(255,255,255,0.45)

.stat-val
  font-family: $serif
  font-size: 2.4rem
  font-weight: 400
  color: $text
  line-height: 1

.stat-lbl
  font-family: $sans
  font-size: .72rem
  font-weight: 500
  letter-spacing: .1rem
  text-transform: uppercase
  color: $text-muted

.panel-section
  background: $white
  border: 1px solid $line
  border-radius: 16px
  padding: 2.5rem
  margin-bottom: 2rem

.panel-head
  margin-bottom: 2rem
  padding-bottom: 1.5rem
  border-bottom: 1px solid $line-soft

  h2
    font-family: $serif
    font-size: 1.5rem
    font-weight: 400
    color: $text
    margin-bottom: .3rem

  p
    font-family: $sans
    font-size: .85rem
    color: $text-muted

.filter-bar
  display: flex
  gap: .8rem
  margin-bottom: 1.5rem

.filter-search
  flex: 1
  padding: .7rem 1rem
  font-family: $sans
  font-size: .88rem
  color: $text
  background: $off-white
  border: 1px solid $line
  border-radius: 8px
  outline: none
  transition: border-color .2s

  &::placeholder
    color: $text-muted

  &:focus
    border-color: $gold-soft
    background: $white

.correo-list
  display: flex
  flex-direction: column
  gap: .5rem

.correo-row
  display: flex
  align-items: center
  gap: 1rem
  padding: .9rem 1.2rem
  border: 1px solid $line-soft
  border-radius: 10px
  background: $off-white
  transition: background .2s, box-shadow .2s

  &:hover
    background: $white
    box-shadow: $shadow-sm

.correo-icon
  font-size: .9rem
  color: $text-muted

.correo-email
  flex: 1
  font-family: $sans
  font-size: .88rem
  color: $text

.correo-fecha
  font-family: $sans
  font-size: .75rem
  color: $text-muted

.correo-vacio
  text-align: center
  padding: 3rem
  font-family: $sans
  font-size: .88rem
  color: $text-muted

.btn-del
  padding: .5rem 1.1rem
  background: $white
  border: 1px solid $line
  border-radius: 8px
  font-family: $sans
  font-size: .78rem
  font-weight: 500
  color: $text-muted
  cursor: pointer
  transition: all .2s
  white-space: nowrap

  &:hover
    border-color: $red
    color: $red
    background: $red-bg

.btn-menu-toggle
  display: none

@media (max-width: 768px)
  .pagina
    flex-direction: column
    overflow-x: hidden

  .sidebar
    width: 100%
    height: auto
    position: sticky
    top: 0
    z-index: 100
    background: $white
    border-right: none
    border-bottom: 1px solid $line
    padding: 1rem 1.5rem

  .sidebar-brand
    padding-bottom: 0
    border-bottom: none
    margin-bottom: 0

  .btn-menu-toggle
    display: flex
    align-items: center
    justify-content: center
    margin-left: auto
    width: 36px
    height: 36px
    background: $off-white
    border: 1px solid $line
    border-radius: 8px
    font-size: 1rem
    color: $text-mid
    cursor: pointer
    transition: all .2s
    flex-shrink: 0

    &:hover
      background: $bg
      border-color: $text-mid

  .sidebar-nav
    display: none
    flex-direction: column
    gap: .3rem
    padding-top: 1rem
    margin-top: 1rem
    border-top: 1px solid $line-soft

    &.abierto
      display: flex

  .main-content
    padding: 1rem
    width: 100%
    overflow-x: hidden

  .stats-row
    margin-bottom: 1.5rem

  .stat-pill
    padding: 1rem 1.2rem

  .stat-val
    font-size: 1.8rem

  .panel-section
    padding: 1.2rem

  .correo-row
    flex-wrap: wrap
    gap: .6rem

  .correo-email
    font-size: .82rem

  .correo-fecha
    display: none

  .btn-del
    margin-left: auto
</style>