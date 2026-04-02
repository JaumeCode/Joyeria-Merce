<template>
  <div class="card-joya">
    <div class="imagen_wrapper">
      <img class="imagen" :src="imagen" :alt="nombre" loading="lazy" />
      <div class="badge_nuevo" v-if="novedad">Nuevo</div>
      <button
        class="btn_fav"
        @click.stop="favStore.toggleFavorito(id)"
        :class="{ activo: favStore.esFavorito(id) }"
        :aria-label="favStore.esFavorito(id) ? 'Quitar de favoritos' : 'Añadir a favoritos'"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>

    <div class="contenido">
      <p class="categoria">
        <template v-if="novedad">✦ Novedad</template>
        <template v-else>✦ Exclusivo</template>
        · {{ material }}
      </p>
      <h3 class="nombre">{{ nombre }}</h3>
      <div class="footer_card">
        <span class="material">{{ medidas }}</span>
        <button class="btn" @click="$router.push(`/joya/${slug}`)">
          {{ textoBoton }} →
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
  novedad: { type: Boolean, default: false },
  material: { type: String, default: 'Artesanal' },
  medidas: {type: String, default: "Medida Unica"},
  slug: { type: String, default: "No contiene Slug"}
})

</script>

<style lang="sass" scoped>

.card-joya
  display: flex
  flex-direction: column
  width: 280px
  background: #FAF8F5
  border: 0.5px solid #E8E2D9
  position: relative
  cursor: pointer
  transition: transform 0.35s ease

  &:hover
    transform: translateY(-6px)

    .imagen
      transform: scale(1.04)

    .btn
      letter-spacing: 0.18rem

.imagen_wrapper
  position: relative
  width: 100%
  height: 220px
  overflow: hidden
  background: #F2EDE5

  .imagen
    width: 100%
    height: 100%
    object-fit: contain
    padding: 0px
    transition: transform 0.5s ease

  .badge_nuevo
    position: absolute
    top: 0
    left: 0
    background: #1a1a1a
    color: #FAF8F5
    font-size: 0.55rem
    font-weight: 600
    letter-spacing: 0.2rem
    text-transform: uppercase
    padding: 5px 10px

  .btn_fav
    position: absolute
    bottom: 10px
    right: 10px
    width: 28px
    height: 28px
    background: rgba(250,248,245,0.9)
    border: 0.5px solid #E8E2D9
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    color: #9A8E80
    transition: all 0.25s ease

    &:hover
      background: #1a1a1a
      color: #FAF8F5
      border-color: #1a1a1a

    &.activo
      background: #1a1a1a
      border-color: #1a1a1a
      color: #FAF8F5

      svg
        fill: #FAF8F5

.contenido
  padding: 16px 16px 18px
  border-top: 0.5px solid #E8E2D9
  display: flex
  flex-direction: column
  gap: 8px

.categoria
  font-size: 0.6rem
  letter-spacing: 0.2rem
  text-transform: uppercase
  color: #9A8E80
  margin: 0

.nombre
  font-size: 1rem
  font-weight: 400
  font-family: 'Playfair Display', serif
  color: #1a1a1a
  line-height: 1.35
  margin: 0

.footer_card
  display: flex
  align-items: center
  justify-content: space-between
  margin-top: 10px
  padding-top: 12px
  border-top: 0.5px solid #E8E2D9

.material
  font-size: 0.62rem
  letter-spacing: 0.1rem
  text-transform: uppercase
  color: #9A8E80

.btn
  font-size: 0.62rem
  letter-spacing: 0.12rem
  text-transform: uppercase
  color: #1a1a1a
  background: none
  border: none
  cursor: pointer
  transition: letter-spacing 0.3s ease

@media (max-width: 480px)
  .card-joya
    width: 100%

  .imagen_wrapper
    height: 180px

  .nombre
    font-size: 0.9rem
</style>