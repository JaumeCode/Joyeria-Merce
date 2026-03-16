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

        <div class="vacio" v-if="joyas_favoritas.length === 0">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <p>Aún no tienes favoritos</p>
          <span>Pulsa el corazón en cualquier joya para guardarla aquí</span>
          <span class="aviso">Los favoritos solo se guardarán en este dispositivo</span>
        </div>

        <div class="lista" v-else>
          <div class="item_fav" v-for="joya in joyas_favoritas" :key="joya.id">
            <img :src="joya.imagenes[0]" :alt="joya.nombre" />
            <div class="item_info">
              <p class="item_nombre">{{ joya.nombre }}</p>
              <p class="item_precio">{{ joya.precio }} €</p>
            </div>
            <button class="item_quitar" @click="favStore.toggleFavorito(joya.id)">
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
import { computed } from 'vue'
import { useFavoritosStore } from '@/stores/favoritos'
import { useJoyasPublicasStore } from '@/stores/joyas'

const favStore = useFavoritosStore()
const joyasStore = useJoyasPublicasStore()

const joyas_favoritas = computed(() =>
  joyasStore.todas.filter(j => favStore.ids.includes(j.id))
)
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

.fade-enter-active, .fade-leave-active
  transition: opacity 0.3s ease

.fade-enter-from, .fade-leave-to
  opacity: 0

.slide-enter-active, .slide-leave-active
  transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)

.slide-enter-from, .slide-leave-to
  transform: translateX(-100%)
</style>