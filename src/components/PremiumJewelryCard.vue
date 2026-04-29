<template>
  <div class="premium-card" @click="navigateToDetail">
    <!-- 🎨 Contenedor de imagen con efectos -->
    <div class="image-container">
      <div class="image-wrapper">
        <img 
          :src="imagen" 
          :alt="nombre"
          loading="lazy"
          class="jewelry-image"
        />
        
        <!-- Overlay gradient con información -->
        <div class="image-overlay">
          <div class="overlay-content">
            <p class="overlay-material">{{ material }}</p>
            <p class="overlay-price">{{ precio }} €</p>
          </div>
        </div>

        <!-- Elementos flotantes -->
        <div class="floating-badges">
          <span v-if="esNuevo" class="badge badge-nuevo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10"/>
            </svg>
            Nuevo
          </span>
          <span v-if="!disponible" class="badge badge-agotado">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12h8"/>
            </svg>
            Agotado
          </span>
        </div>

        <!-- Botón favorito floating -->
        <button 
          class="btn-favorito"
          @click.stop="toggleFavorito"
          :class="{ 'activo': isFavorito }"
          :aria-label="isFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'"
        >
          <svg v-if="!isFavorito" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- 📋 Contenido card -->
    <div class="card-content">
      <!-- Header con tipo -->
      <div class="content-header">
        <div class="type-badge">{{ tipo }}</div>
      </div>

      <!-- Nombre de la joya -->
      <h3 class="jewelry-name">{{ nombre }}</h3>

      <!-- Precio y medidas prominentes -->
      <div class="price-medidas-row">
        <span class="price">{{ precio }} €</span>
        <span class="medidas-badge" v-if="medidas">{{ medidas }}</span>
      </div>

      <!-- Descripción más pequeña -->
      <p class="jewelry-description">{{ descripcion }}</p>

      <!-- Disponibilidad compacto -->
      <div class="availability-section">
        <div class="availability-dot" :class="{ 'available': disponible, 'unavailable': !disponible }"></div>
        <span class="availability-text">
          {{ disponible ? 'Disponible' : 'No disponible' }}
        </span>
      </div>

      <!-- CTA Button -->
      <button class="btn-view-detail" @click.stop="navigateToDetail">
        <span>Ver detalles</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- Elemento decorativo de fondo -->
    <div class="card-decoration"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavoritosStore } from '@/stores/favoritos'

const router = useRouter()
const favStore = useFavoritosStore()

const props = defineProps({
  id: { type: String, required: true },
  imagen: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  tipo: { type: String, default: 'Joya' },
  material: { type: String, default: 'Material' },
  medidas: { type: String, default: '' },
  precio: { type: Number, required: true },
  disponible: { type: Boolean, default: true },
  slug: { type: String, required: true },
  esNuevo: { type: Boolean, default: false }
})

const isFavorito = computed(() => favStore.esFavorito(props.id))

const toggleFavorito = () => {
  favStore.toggleFavorito(props.id)
}

const navigateToDetail = () => {
  router.push(`/joya/${props.slug}`)
}
</script>

<style lang="sass" scoped>
$primary: #1a1a1a
$accent: #C9A55A
$light-bg: #FDFCF8
$border: #E8E2D9
$shadow-sm: 0 4px 12px rgba(26, 26, 26, 0.05)
$shadow-md: 0 12px 32px rgba(26, 26, 26, 0.12)
$shadow-lg: 0 20px 48px rgba(26, 26, 26, 0.15)

.premium-card
  position: relative
  display: flex
  flex-direction: column
  height: 100%
  background: white
  border-radius: 20px
  overflow: hidden
  cursor: pointer
  transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1)
  box-shadow: $shadow-sm
  border: 1px solid $border

  &:hover
    transform: translateY(-8px)
    box-shadow: $shadow-lg
    border-color: $accent

    .jewelry-image
      transform: scale(1.08)

    .btn-view-detail
      background: $primary
      color: white
      transform: translateX(4px)

    .card-decoration
      opacity: 1
      transform: scale(1.1)

// 🎨 Image Container
.image-container
  position: relative
  width: 100%
  padding-bottom: 100%
  overflow: hidden
  background: linear-gradient(135deg, #f5f0e8 0%, #ede9d8 100%)

.image-wrapper
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  display: flex
  align-items: center
  justify-content: center

.jewelry-image
  width: 100%
  height: 100%
  object-fit: contain
  padding: 1.5rem
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1)

// 🌈 Image Overlay
.image-overlay
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.3) 0%, rgba(201, 165, 90, 0.2) 100%)
  opacity: 0
  transition: opacity 0.4s ease
  display: flex
  align-items: flex-end
  justify-content: flex-start
  padding: 1.5rem

.overlay-content
  display: flex
  flex-direction: column
  gap: 0.5rem

.overlay-material
  font-size: 0.75rem
  color: rgba(255, 255, 255, 0.8)
  text-transform: uppercase
  letter-spacing: 0.12rem
  font-weight: 600
  margin: 0

.overlay-price
  font-size: 1.3rem
  color: white
  font-weight: 700
  margin: 0
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3)

// 🏷️ Floating Badges
.floating-badges
  position: absolute
  top: 12px
  right: 12px
  display: flex
  flex-direction: column
  gap: 8px
  z-index: 3

.badge
  display: inline-flex
  align-items: center
  gap: 6px
  padding: 6px 12px
  border-radius: 50px
  font-size: 0.72rem
  font-weight: 600
  letter-spacing: 0.06rem
  text-transform: uppercase
  backdrop-filter: blur(8px)
  background: rgba(255, 255, 255, 0.92)
  border: 1px solid rgba(255, 255, 255, 0.6)
  color: $primary
  transition: all 0.3s ease

  svg
    width: 14px
    height: 14px
    flex-shrink: 0

  &.badge-nuevo
    background: rgba(201, 165, 90, 0.95)
    border-color: rgba(201, 165, 90, 0.8)
    color: white

  &.badge-agotado
    background: rgba(239, 68, 68, 0.9)
    border-color: rgba(239, 68, 68, 0.8)
    color: white

// ❤️ Favorite Button
.btn-favorito
  position: absolute
  top: 12px
  left: 12px
  width: 44px
  height: 44px
  background: rgba(255, 255, 255, 0.95)
  border: 1px solid rgba(255, 255, 255, 0.8)
  border-radius: 50%
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  color: #9a8f7f
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1)
  z-index: 4
  backdrop-filter: blur(8px)

  &:hover
    background: white
    border-color: $accent
    color: $accent
    transform: scale(1.1)

  &.activo
    background: $accent
    border-color: $accent
    color: white
    animation: pop 0.3s cubic-bezier(0.23, 1, 0.320, 1)

// 📋 Card Content
.card-content
  position: relative
  z-index: 2
  display: flex
  flex-direction: column
  gap: 0.65rem
  padding: 1.25rem
  flex-grow: 1

.content-header
  display: flex
  align-items: center
  justify-content: flex-start
  gap: 0.75rem

.type-badge
  display: inline-block
  font-size: 0.65rem
  letter-spacing: 0.12rem
  text-transform: uppercase
  color: $accent
  font-weight: 700
  background: rgba(201, 165, 90, 0.1)
  padding: 4px 10px
  border-radius: 6px
  border: 1px solid rgba(201, 165, 90, 0.2)

.jewelry-name
  font-family: 'Playfair Display', serif
  font-size: 1.05rem
  font-weight: 700
  color: $primary
  margin: 0
  line-height: 1.25
  letter-spacing: -0.01em

// 💰 Price & Medidas
.price-medidas-row
  display: flex
  align-items: center
  justify-content: space-between
  gap: 0.75rem

.price
  font-size: 1.2rem
  font-weight: 700
  color: $primary

.medidas-badge
  font-size: 0.65rem
  letter-spacing: 0.08rem
  text-transform: uppercase
  color: $accent
  font-weight: 600
  background: rgba(201, 165, 90, 0.1)
  padding: 4px 8px
  border-radius: 5px
  border: 1px solid rgba(201, 165, 90, 0.2)

.jewelry-description
  font-size: 0.78rem
  color: #7a6e5f
  line-height: 1.4
  margin: 0
  display: -webkit-box
  -webkit-line-clamp: 1
  -webkit-box-orient: vertical
  overflow: hidden

// 🟢 Availability
.availability-section
  display: flex
  align-items: center
  gap: 6px
  padding: 6px 0
  border-top: 1px solid rgba(0, 0, 0, 0.05)
  border-bottom: 1px solid rgba(0, 0, 0, 0.05)

.availability-dot
  width: 7px
  height: 7px
  border-radius: 50%
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite

  &.available
    background: #10b981
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.3)

  &.unavailable
    background: #d1d5db
    animation: none

.availability-text
  font-size: 0.75rem
  color: #6b7280
  font-weight: 500

// 🔘 View Detail Button
.btn-view-detail
  margin-top: auto
  padding: 10px 14px
  background: linear-gradient(135deg, rgba(201, 165, 90, 0.1) 0%, rgba(201, 165, 90, 0.05) 100%)
  border: 1.5px solid $accent
  border-radius: 10px
  color: $accent
  font-size: 0.85rem
  font-weight: 600
  letter-spacing: 0.05rem
  display: flex
  align-items: center
  justify-content: center
  gap: 6px
  cursor: pointer
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1)
  font-family: inherit

  &:hover
    background: $primary
    color: white
    border-color: $primary
    transform: translateX(2px)

    svg
      transform: translateX(2px)

  svg
    transition: transform 0.3s ease
    flex-shrink: 0

// 🎀 Decorative Background
.card-decoration
  position: absolute
  top: 0
  right: -40%
  width: 400px
  height: 400px
  background: radial-gradient(circle, rgba(201, 165, 90, 0.08) 0%, transparent 70%)
  border-radius: 50%
  pointer-events: none
  opacity: 0
  transition: all 0.4s ease
  transform: scale(0.8)
  z-index: 0

// 🎬 Animations
@keyframes pop
  0%
    transform: scale(1)
  50%
    transform: scale(1.2)
  100%
    transform: scale(1)

@keyframes pulse
  0%, 100%
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7)
  50%
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0)

// 📱 Responsive
@media (max-width: 768px)
  .premium-card
    border-radius: 16px
    box-shadow: $shadow-sm

    &:hover
      transform: translateY(-4px)
      box-shadow: $shadow-md

  .image-wrapper
    padding: 1rem

  .card-content
    padding: 1rem
    gap: 0.5rem

  .jewelry-name
    font-size: 0.95rem

  .price
    font-size: 1.1rem

  .jewelry-description
    font-size: 0.75rem

  .btn-view-detail
    padding: 9px 12px
    font-size: 0.8rem

  .btn-favorito
    width: 40px
    height: 40px

  .floating-badges
    top: 8px
    right: 8px
    gap: 6px

  .badge
    padding: 4px 8px
    font-size: 0.65rem
</style>
