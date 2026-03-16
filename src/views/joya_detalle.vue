<template>
  <div class="pagina">
    <header_all />

    <!-- Cargando -->
    <div class="cargando" v-if="!joya">
      <p>Cargando joya...</p>
    </div>

    <!-- Contenido -->
    <div class="contenido" v-else>

      <button class="volver" @click="router.back()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Volver
      </button>

      <div class="joya_layout">

        <!-- Imagen -->
        <div class="imagen_wrapper">
          <img :src="joya.imagenes[0]" :alt="joya.nombre" />
        </div>

        <!-- Info -->
        <div class="info">
          <div class="chip_row">
            <span class="chip">✦ Exclusivo</span>
            <span class="chip">Hecho a mano</span>
          </div>

          <h1 class="nombre">{{ joya.nombre }}</h1>
          <p class="precio">{{ joya.precio }} €</p>
          <p class="material">✦ {{ joya.material.charAt(0).toUpperCase() + joya.material.slice(1) }}</p>
          <p class="descripcion">{{ joya.descripcion }}</p>
          <span class="disponibilidad" :class="joya.disponible ? 'disponible' : 'agotado'">
            <span class="dot" />
            {{ joya.disponible ? 'Recoge en tienda' : 'No disponible' }}
          </span>


          <div class="acciones">
            <button
              class="btn_fav"
              @click="favStore.toggleFavorito(joya.id)"
              :class="{ activo: favStore.esFavorito(joya.id) }"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {{ favStore.esFavorito(joya.id) ? 'Guardado' : 'Guardar' }}
            </button>

            <a class="btn_contacto" href="https://wa.me/34666238158" target="_blank">
              Consultar por WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>

    <footer_component />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJoyasPublicasStore } from '@/stores/joyas'
import { useFavoritosStore } from '@/stores/favoritos'
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'
import { ref } from 'vue'
import { watch } from 'vue'
import { onMounted } from 'vue'


const route = useRoute()
const router = useRouter()
const joyasStore = useJoyasPublicasStore()
const favStore = useFavoritosStore()

onMounted(async () => {
  if (joyasStore.todas.length === 0) {
    await joyasStore.obtener_joya()
  }
})

// Busca la joya por el ID de la URL
const joya = computed(() =>
  joyasStore.todas.find(j => j.id === route.params.id)
)

//Control de disponibilidad 

const disponibilidad=ref("")

const handle_dispo=async()=>{

  if(joya.value.disponible){
    disponibilidad.value="Recoge en tienda"
  }else{

    disponibilidad.value="No disponible"
  }



}

watch(joya, (nuevaJoya) => {
  if (nuevaJoya) handle_dispo()
}, { immediate: true })

</script>

<style lang="sass" scoped>
.pagina
  min-height: 100vh
  background: #FDFCF8

.cargando
  display: flex
  justify-content: center
  align-items: center
  height: 60vh
  color: #7a6e5f
  font-size: 0.95rem

.contenido
  max-width: 1100px
  margin: 0 auto
  padding: 4rem 2rem 4rem

.volver
  display: flex
  align-items: center
  gap: 8px
  background: transparent
  border: 1px solid rgba(0,0,0,0.12)
  border-radius: 20px
  padding: 8px 16px
  font-size: 0.85rem
  cursor: pointer
  color: #1a1a1a
  margin-bottom: 3rem
  transition: all 0.2s ease

  &:hover
    background: rgba(0,0,0,0.04)

.joya_layout
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 4rem
  align-items: start

  @media (max-width: 768px)
    grid-template-columns: 1fr
    gap: 2rem

.imagen_wrapper
  background: linear-gradient(145deg, #f5f0e8, #ede9d8)
  border-radius: 20px
  overflow: hidden
  aspect-ratio: 1
  display: flex
  align-items: center
  justify-content: center
  padding: 2rem

  img
    width: 100%
    height: 100%
    object-fit: contain

.info
  display: flex
  flex-direction: column
  gap: 1.25rem
  padding-top: 1rem

.chip_row
  display: flex
  gap: 6px

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
  font-family: 'Playfair Display', serif
  font-size: 2rem
  font-weight: 700
  color: #1a1a1a
  line-height: 1.2
  margin: 0

.precio
  font-size: 1.5rem
  font-weight: 600
  color: #1a1a1a
  margin: 0

.material
  font-size: 0.72rem
  font-weight: 600
  letter-spacing: 0.25rem
  text-transform: uppercase
  color: #C9A55A
  
.descripcion
  font-size: 0.95rem
  color: #7a6e5f
  line-height: 1.7
  margin: 0

.disponibilidad
  display: inline-flex
  align-items: center
  gap: 7px
  font-size: 0.8rem
  font-weight: 600
  letter-spacing: 0.06rem
  padding: 6px 14px
  border-radius: 20px

  &.disponible
    background: #edf7f0
    color: #2d7a4f
    border: 1px solid #b6e2c8
  &.agotado
    background: #f7eded
    color: #7a2d2d
    border: 1px solid #e2b6b6

  .dot
    width: 7px
    height: 7px
    border-radius: 50%
    background: currentColor

.acciones
  display: flex
  flex-direction: column
  gap: 12px
  margin-top: 1rem

.btn_fav
  display: flex
  align-items: center
  justify-content: center
  gap: 8px
  padding: 12px
  border-radius: 12px
  border: 1px solid rgba(0,0,0,0.12)
  background: transparent
  font-size: 0.88rem
  font-weight: 600
  cursor: pointer
  color: #1a1a1a
  transition: all 0.25s ease
  letter-spacing: 0.05rem

  &:hover
    background: rgba(0,0,0,0.04)

  &.activo
    background: #1a1a1a
    border-color: #1a1a1a
    color: #EDE9D8

    svg
      fill: #EDE9D8

.btn_contacto
  display: flex
  align-items: center
  justify-content: center
  padding: 14px
  border-radius: 12px
  background: #1a1a1a
  color: #EDE9D8
  font-size: 0.88rem
  font-weight: 600
  letter-spacing: 0.08rem
  text-decoration: none
  transition: all 0.3s ease

  &:hover
    background: #2a2a2a
</style>