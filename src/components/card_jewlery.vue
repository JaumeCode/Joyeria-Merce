<template>
  <div class="card-joya">
    <div class="imagen_wrapper">
      <div class="imagen_bg"></div>
      <img class="imagen" :src="imagen" :alt="nombre" />
      <div class="badge_nuevo" v-if="novedad">Nuevo</div>
      <button
        class="btn_fav"
        @click.stop="favStore.toggleFavorito(id)"
        :class="{ activo: favStore.esFavorito(id) }"
        :aria-label="favStore.esFavorito(id) ? 'Quitar de favoritos' : 'Añadir a favoritos'"
        >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>

    <div class="contenido">
      <div class="chip_row">
        <template v-if="novedad">
          <span class="chip chip_novedad">✦ Novedad</span>
          <span class="chip">Recién llegado</span>
        </template>
        <template v-else>
          <span class="chip">✦ Exclusivo</span>
          <span class="chip">Hecho a mano</span>
        </template>
      </div>

      <h3 class="nombre">{{ nombre }}</h3>
      <p class="descripcion">{{ descripcion }}</p>

      <div class="footer_card">
        <button class="btn" @click="$router.push(`/joya/${id}`)">
          <span>{{ textoBoton }}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useFavoritosStore } from '@/stores/favoritos'  
const favStore = useFavoritosStore()

defineProps({
  id: { type: String, required: true },
  imagen: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  textoBoton: { type: String, default: 'Ver joya' },
  novedad: { type: Boolean, default: false }
})
</script>

<style lang="sass" scoped>

.btn_fav
  position: absolute
  bottom: 10px
  left: 12px
  z-index: 3
  width: 32px
  height: 32px
  border-radius: 50%
  border: 1px solid rgba(0,0,0,0.12)
  background: rgba(255,255,255,0.85)
  backdrop-filter: blur(4px)
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  transition: all 0.25s ease
  color: #7a6e5f

  &:hover
    background: #fff
    border-color: rgba(0,0,0,0.2)

  &.activo
    background: #1a1a1a
    border-color: #1a1a1a
    color: #EDE9D8

    svg
      fill: #EDE9D8
.chip_novedad
  background: #1a1a1a
  color: #EDE9D8
  border-color: #1a1a1a
.card-joya
  display: flex
  flex-direction: column
  width: 280px
  height: 400px
  background: #FDFCF8
  border-radius: 20px
  overflow: hidden
  border: 1px solid rgba(0,0,0,0.08)
  box-shadow: 0 4px 24px rgba(0,0,0,0.06)
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1)
  position: relative
  cursor: pointer

  &:hover
    transform: translateY(-8px)
    box-shadow: 0 20px 48px rgba(0,0,0,0.13)

    .imagen
      transform: scale(1.06)

    .btn
      background: #1a1a1a
      gap: 10px

.imagen_wrapper
  position: relative
  width: 100%
  height: 190px
  overflow: hidden
  background: linear-gradient(145deg, #f5f0e8, #ede9d8)

  .imagen_bg
    position: absolute
    inset: 0
    background: radial-gradient(circle at 60% 40%, rgba(255,255,255,0.6), transparent 70%)
    z-index: 1

  .imagen
    width: 100%
    height: 100%
    object-fit: contain
    object-position: center
    padding: 16px
    position: relative
    z-index: 2
    transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)

  .badge_nuevo
    position: absolute
    top: 12px
    right: 12px
    z-index: 3
    background: #1a1a1a
    color: #EDE9D8
    font-size: 0.65rem
    font-weight: 600
    letter-spacing: 0.15rem
    text-transform: uppercase
    padding: 4px 10px
    border-radius: 20px

.contenido
  display: flex
  flex-direction: column
  padding: 16px 18px
  gap: 8px
  flex: 1

.chip_row
  display: flex
  gap: 6px
  flex-wrap: wrap

.chip
  font-size: 0.65rem
  letter-spacing: 0.08rem
  color: #7a6e5f
  background: #f0ece0
  border: 1px solid #e0d9c8
  padding: 3px 10px
  border-radius: 20px
  font-weight: 500

.nombre
  font-size: 1rem
  font-weight: 700
  color: #1a1a1a
  letter-spacing: 0.03rem
  font-family: 'Playfair Display', serif
  margin: 0
  line-height: 1.3

.descripcion
  font-size: 0.82rem
  color: #7a6e5f
  line-height: 1.55
  margin: 0
  overflow: hidden
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical

.footer_card
  margin-top: auto
  padding-top: 8px
  border-top: 1px solid rgba(0,0,0,0.06)

.btn
  display: flex
  align-items: center
  justify-content: center
  gap: 6px
  width: 100%
  padding: 11px
  background: #2a2a2a
  color: #EDE9D8
  border: none
  border-radius: 12px
  font-size: 0.82rem
  font-weight: 600
  letter-spacing: 0.08rem
  cursor: pointer
  transition: all 0.3s ease

  svg
    transition: transform 0.3s ease

  &:hover svg
    transform: translateX(3px)

@media (max-width: 480px)
  .card-joya
    width: 100%
    height: auto

  .imagen_wrapper
    height: 150px

  .contenido
    padding: 12px 14px
    gap: 6px

  .nombre
    font-size: 0.9rem

  .descripcion
    font-size: 0.78rem
</style>