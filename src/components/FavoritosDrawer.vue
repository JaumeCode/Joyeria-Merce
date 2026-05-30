<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="favStore.drawerAbierto" class="overlay" @click="favStore.drawerAbierto = false"/>
    </Transition>

    <Transition name="slide">
      <div v-if="favStore.drawerAbierto" class="drawer">

        <div class="drawer_header">
          <h2>Mis Favoritos</h2>
          <button class="cerrar" @click="favStore.drawerAbierto = false">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="luxury_loader" v-if="cargando">
          <div class="spinner_container">
            <div class="gold_ring"></div>
            <svg class="corazon_pulso" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <span class="loading_text">Buscando tus piezas exclusivas</span>
        </div>

        <div class="vacio" v-else-if="joyas_favoritas.length === 0">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p>Aún no tienes favoritos</p>
          <span>Pulsa el corazón en cualquier joya para guardarla aquí</span>
          <span class="aviso">Los favoritos solo se guardarán en este dispositivo</span>
        </div>

        <div class="lista" v-else>
          <div class="item_fav" v-for="joya in joyas_favoritas" :key="joya.id">
            <img :src="joya.imagenes?.[0]" :alt="joya.nombre" />
            <div class="item_info">
              <p class="item_nombre">{{ joya.nombre }}</p>
              <p class="item_precio">{{ joya.precio }} €</p>
            </div>
            <button class="item_quitar" @click="quitarDeFavoritos(joya.id)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useFavoritosStore } from '@/stores/favoritos'
import { useJoyasPublicasStore } from '@/stores/joyas'

const favStore = useFavoritosStore()
const joyasStore = useJoyasPublicasStore()

const joyasCargadas = ref([])
const cargando = ref(false)

// Cargar las joyas completas desde la base de datos
const cargarJoyasFavoritos = async () => {
  const ids = favStore.ids
  
  if (!ids || ids.length === 0) {
    joyasCargadas.value = []
    return
  }
  
  cargando.value = true
  try {
    const joyas = await joyasStore.cargarJoyasPorIds(ids)
    joyasCargadas.value = joyas || []
  } catch (e) {
    console.error('Error cargando favoritos desde la API:', e)
    joyasCargadas.value = []
  } finally {
    // 600ms para que dé tiempo a disfrutar de la nueva animación fluida
    setTimeout(() => {
      cargando.value = false
    }, 600)
  }
}

// Disparar la petición HTTP solo cuando el usuario abre el Drawer
watch(() => favStore.drawerAbierto, (abierto) => {
  if (abierto) {
    cargarJoyasFavoritos()
  }
})

// Quitar favorito: feedback instantáneo en pantalla
const quitarDeFavoritos = (id) => {
  favStore.toggleFavorito(id)
  joyasCargadas.value = joyasCargadas.value.filter(joya => String(joya.id) !== String(id))
}

const joyas_favoritas = computed(() => joyasCargadas.value)
</script>

<style lang="sass" scoped>
.overlay
  position: fixed
  inset: 0
  background: rgba(0,0,0,0.35)
  z-index: 9998

.drawer
  position: fixed
  top: 0
  left: 0
  width: 360px
  height: 100vh
  background: #FDFCF8
  z-index: 9999
  display: flex
  flex-direction: column
  box-shadow: 8px 0 32px rgba(0,0,0,0.12)

  @media (max-width: 480px)
    width: 100vw

  .drawer_header
    display: flex
    align-items: center
    justify-content: space-between
    padding: 1.5rem 1.25rem
    border-bottom: 1px solid rgba(0,0,0,0.08)

    h2
      font-family: 'Playfair Display', serif
      font-size: 1.2rem
      font-weight: 700
      color: #1a1a1a

    .cerrar
      width: 32px
      height: 32px
      border-radius: 50%
      border: 1px solid rgba(0,0,0,0.1)
      background: transparent
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
      color: #1a1a1a
      transition: all 0.2s ease

      &:hover
        background: rgba(0,0,0,0.05)

  /* --- NUEVO ESTADO DE CARGA PRESTIGE --- */
  .luxury_loader
    flex: 1
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 1.5rem
    padding: 2rem

    .spinner_container
      position: relative
      width: 50px
      height: 50px
      display: flex
      align-items: center
      justify-content: center

      .gold_ring
        position: absolute
        width: 100%
        height: 100%
        border: 2px solid rgba(122, 110, 95, 0.15)
        border-top: 2px solid #7a6e5f // Un tono sutil oro/tostado elegante
        border-radius: 50%
        animation: spin 1s infinite linear

      .corazon_pulso
        animation: pulseHeart 1.5s infinite ease-in-out

    .loading_text
      font-family: 'Playfair Display', serif
      font-size: 0.95rem
      font-style: italic
      color: #7a6e5f
      letter-spacing: 0.5px
      animation: pulseText 2s infinite ease-in-out

  .vacio
    flex: 1
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    gap: 0.75rem
    color: #7a6e5f
    padding: 2rem

    p
      font-size: 1rem
      font-weight: 600
      color: #1a1a1a

    span
      font-size: 0.82rem
      text-align: center
      line-height: 1.5

    .aviso
      font-size: 0.75rem
      color: #b0a898
      margin-top: 0.5rem

  .lista
    flex: 1
    overflow-y: auto
    padding: 1rem 1.25rem
    display: flex
    flex-direction: column
    gap: 12px

    &::-webkit-scrollbar
      width: 4px

    &::-webkit-scrollbar-thumb
      background: rgba(0,0,0,0.15)
      border-radius: 4px

  .item_fav
    display: flex
    align-items: center
    gap: 12px
    padding: 10px
    border-radius: 12px
    border: 1px solid rgba(0,0,0,0.07)
    background: #fff
    transition: border-color 0.2s

    &:hover
      border-color: rgba(0,0,0,0.15)

    img
      width: 56px
      height: 56px
      object-fit: contain
      border-radius: 8px
      background: linear-gradient(145deg, #f5f0e8, #ede9d8)
      padding: 4px

    .item_info
      flex: 1

      .item_nombre
        font-size: 0.88rem
        font-weight: 600
        color: #1a1a1a
        font-family: 'Playfair Display', serif
        margin: 0 0 3px

      .item_precio
        font-size: 0.82rem
        color: #7a6e5f
        margin: 0

    .item_quitar
      width: 28px
      height: 28px
      border-radius: 50%
      border: 1px solid rgba(0,0,0,0.1)
      background: transparent
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
      color: #7a6e5f
      transition: all 0.2s ease
      flex-shrink: 0

      &:hover
        background: #1a1a1a
        color: #EDE9D8
        border-color: #1a1a1a

/* --- ANIMACIONES CSS --- */
@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

@keyframes pulseHeart
  0%, 100%
    transform: scale(0.92)
    opacity: 0.6
  50%
    transform: scale(1.05)
    opacity: 1

@keyframes pulseText
  0%, 100%
    opacity: 0.5
  50%
    opacity: 1

/* Transiciones del Drawer */
.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from, .fade-leave-to
  opacity: 0

.slide-enter-active, .slide-leave-active
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)

.slide-enter-from, .slide-leave-to
  transform: translateX(-100%)
</style>