<template>
  <div class="pagina">
    <header_all />

    <!-- Cargando -->
    <div class="cargando" v-if="!joya || cargandoJoya">
      <div class="loader-inner">
        <div class="loader-ring"></div>
        <span>✦</span>
      </div>
    </div>

    <!-- Contenido -->
    <transition name="fade_page" mode="out-in">
      
      <div class="contenido" v-if="joya && !cargandoJoya" :key="joya.id">
  
        <button class="volver" @click="router.back()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Volver
        </button>
  
        <div class="joya_layout">

          <div class="galeria">
            <div class="imagen_principal">
              
              <transition name="fade_img" mode="out-in">
                <img :key="imagenActiva" :src="imagenActiva" :alt="joya.nombre" />
              </transition>
            </div>
            <div class="miniaturas" v-if="joya.imagenes.length > 1">
              <div
                v-for="(img, i) in joya.imagenes"
                :key="i"
                class="miniatura"
                :class="{ activa: imagenActiva === img }"
                @click="imagenActiva = img"
              >
                <img :src="img" :alt="`${joya.nombre} ${i + 1}`" />
              </div>
            </div>
          </div>
  
          
          <div class="info">
            <div class="chip_row">
              <span class="chip">✦ Exclusivo</span>
              <span class="chip">Unidades Limitadas</span>
            </div>
  
            <h1 class="nombre">{{ joya.nombre }}</h1>
            <p class="precio">{{ joya.precio }} €</p>
            <p class="material">✦ {{ joya.material.charAt(0).toUpperCase() + joya.material.slice(1) }}</p>
            <p class="medidas" v-if="joya.medidas">📐 {{ joya.medidas }}</p>
            <p class="descripcion">{{ joya.descripcion }}</p>
            <span class="disponibilidad" :class="{
              'disponible': joya.disponible === true,
              'agotado':    joya.disponible === false,
              'pedido':     joya.disponible === 'pedido'
            }">
              <span class="dot" />
              {{ joya.disponible === true ? 'Recoge en tienda' : joya.disponible === 'pedido' ? 'Bajo pedido en tienda' : 'No disponible' }}
            </span>
            <p class="fecha_disponibilidad" v-if="!joya.disponible && joya.fecha_disponibilidad">
              📅 Disponible a partir del {{ formatearFecha(joya.fecha_disponibilidad) }}
            </p>
            
  
  
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
    </transition>
    
    <div class="similares" v-if="similares.length">
      <div class="similares-header">
        <div class="sim-line"></div>
        <h2 class="sim-titulo">También te puede gustar</h2>
        <div class="sim-line"></div>
      </div>
      <div class="similares-grid">
        <card_jewlery
          v-for="s in similares"
          :key="s.id"
          :id="s.id"
          :imagen="s.imagenes[0] || '/default.jpg'"
          :nombre="s.nombre"
          :descripcion="s.descripcion"
          textoBoton="Ver detalles"
          :novedad="false"
        />
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
import { useHead } from '@vueuse/head'
import card_jewlery from '@/components/card_jewlery.vue'



const route = useRoute()
const router = useRouter()
const joyasStore = useJoyasPublicasStore()
const favStore = useFavoritosStore()

//Loader de joyas
const cargandoJoya = ref(false)

onMounted(async () => {

  window.scrollTo({ top: 0, behavior: 'instant' })
  if (joyasStore.todas.length === 0) {
    await joyasStore.obtener_joya()
  }
})
const formatearFecha = (fecha) => {
  if (!fecha) return ''
  const [anio, mes, dia] = fecha.split('-')
  return `${dia}/${mes}/${anio}`
}
// Busca la joya por el ID de la URL
const joya = computed(() =>
  joyasStore.todas.find(j => j.id === route.params.id)
)

//Galeria de imagenes
const imagenActiva = ref('')

watch(joya, (nueva) => {
  if (nueva?.imagenes?.length) {
    imagenActiva.value = nueva.imagenes[0]
  }
}, { immediate: true })

watch(() => route.params.id, () => {
  cargandoJoya.value = true
  window.scrollTo({ top: 0, behavior: 'instant' })
  setTimeout(() => {
    cargandoJoya.value = false
  }, 600)

})


//Consultar Disponibilidad
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

//Porductos relacionados
const similares = computed(() => {
  if (!joya.value) return []
  return joyasStore.todas
    .filter(j =>j.id !== joya.value.id &&(j.tipo === joya.value.tipo || j.material === joya.value.material))
    .slice(0, 4)
})
//Para Seo , detecta cada joya y su respectivo nombre 
useHead(computed(() => ({
  title: joya.value
    ? `${joya.value.nombre} — Joyería Mercè`
    : 'Joyería Mercè',
  link: [
    {
      rel: 'canonical',
      href: joya.value
        ? `https://joyeriamerce.es/joya/${route.params.id}`
        : 'https://joyeriamerce.es'
    }
  ],
  meta: [
    {
      name: 'description',
      content: joya.value
        ? `${joya.value.nombre} de ${joya.value.material}. ${joya.value.descripcion?.slice(0, 140)}. En Joyería Mercè, Puerto de Sagunto.`
        : 'Joyería Mercè, Puerto de Sagunto.'
    },
    {
      property: 'og:title',
      content: joya.value ? `${joya.value.nombre} — Joyería Mercè` : 'Joyería Mercè'
    },
    {
      property: 'og:description',
      content: joya.value ? joya.value.descripcion?.slice(0, 140) : ''
    },
    {
      property: 'og:image',
      content: joya.value?.imagenes?.[0] || ''
    },
    {
      property: 'og:type',
      content: 'product'
    }
  ],
  script: joya.value ? [{
    type: 'application/ld+json',
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": joya.value.nombre,
      "image": joya.value.imagenes,
      "description": joya.value.descripcion,
      "brand": {
        "@type": "Brand",
        "name": "Joyería Mercè"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://joyeriamerce.es/joya/${route.params.id}`,
        "price": joya.value.precio,
        "priceCurrency": "EUR",
        "availability": joya.value.disponible
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "Joyería Mercè"
        }
      }
    })
  }] : []
})))


</script>

<style lang="sass" scoped>
.fade_img-enter-active,
.fade_img-leave-active
  transition: opacity 0.25s ease

.fade_img-enter-from,
.fade_img-leave-to
  opacity: 0
.fade_page-enter-active,
.fade_page-leave-active
  transition: opacity 0.35s ease

.fade_page-enter-from,
.fade_page-leave-to
  opacity: 0
.pagina
  min-height: 100vh
  background: #FDFCF8
.cargando
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  background: #FDFCF8
  z-index: 999
.loader-inner
  position: relative
  width: 60px
  height: 60px
  display: flex
  align-items: center
  justify-content: center

.loader-ring
  width: 60px
  height: 60px
  border: 3px solid rgba(0,0,0,0.1)
  border-top: 3px solid #C9A55A
  border-radius: 50%
  animation: spin 1s linear infinite

.loader-inner span
  position: absolute
  font-size: 18px
  color: #C9A55A

@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

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
.galeria
  display: flex
  flex-direction: column
  gap: 1rem

.imagen_principal
  background: linear-gradient(145deg, #f5f0e8, #ede9d8)
  border-radius: 20px
  overflow: hidden
  aspect-ratio: 1
  max-height: 480px
  display: flex
  align-items: center
  justify-content: center
  padding: 2rem

  img
    width: 100%
    height: 100%
    object-fit: contain
    transition: opacity 0.2s ease

.miniaturas
  display: flex
  gap: 0.75rem

.miniatura
  width: 72px
  height: 72px
  border-radius: 10px
  overflow: hidden
  cursor: pointer
  border: 2px solid transparent
  background: linear-gradient(145deg, #f5f0e8, #ede9d8)
  transition: border-color 0.2s, transform 0.2s
  flex-shrink: 0

  img
    width: 100%
    height: 100%
    object-fit: contain
    padding: 6px

  &:hover
    transform: translateY(-2px)

  &.activa
    border-color: #1a1a1a

@media (max-width: 768px)
  .miniaturas
    gap: 0.5rem

  .miniatura
    width: 58px
    height: 58px
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
  word-break: break-word   
  overflow-wrap: anywhere 

.medidas
  font-size: 0.72rem
  font-weight: 500
  letter-spacing: 0.15rem
  text-transform: uppercase
  color: #9a8f7f


.fecha_disponibilidad
  font-size: 0.78rem
  color: #7a6e5f
  margin: 0
  letter-spacing: 0.02rem
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

  &.pedido
    background: #EFF6FF
    color: #1D4ED8
    border: 1px solid #BFDBFE

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


.similares
  display: flex
  justify-content: center
  flex-direction: column
  max-width: 1100px
  margin: 1rem auto 2rem
  padding: 0 2rem

.similares-header
  display: flex
  align-items: center
  gap: 1.5rem
  margin-bottom: 2.5rem

.sim-line
  flex: 1
  height: 1px
  background: rgba(0,0,0,0.08)

.sim-titulo
  font-family: 'Playfair Display', serif
  font-size: 1.2rem
  font-weight: 600
  color: #1a1a1a
  white-space: nowrap
  margin: 0

.similares-grid
  display: grid
  grid-template-columns: repeat(4, 1fr)
  gap: 1.2rem




.sim-card
  background: #fff
  border-radius: 14px
  overflow: hidden
  border: 1px solid rgba(0,0,0,0.07)
  cursor: pointer
  transition: transform 0.3s ease, box-shadow 0.3s ease

  &:hover
    transform: translateY(-4px)
    box-shadow: 0 12px 32px rgba(0,0,0,0.09)

    .sim-img img
      transform: scale(1.04)

.sim-img
  background: linear-gradient(145deg, #f5f0e8, #ede9d8)
  height: 160px
  overflow: hidden
  display: flex
  align-items: center
  justify-content: center
  padding: 1rem

  img
    width: 100%
    height: 100%
    object-fit: contain
    transition: transform 0.4s ease

.sim-info
  padding: 0.9rem 1rem

.sim-tipo
  font-size: 0.6rem
  letter-spacing: 0.15rem
  color: #9a8f7f
  text-transform: uppercase
  margin: 0 0 4px

.sim-nombre
  font-family: 'Playfair Display', serif
  font-size: 0.9rem
  font-weight: 700
  color: #1a1a1a
  margin: 0 0 6px
  line-height: 1.3
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden

.sim-precio
  font-size: 0.88rem
  font-weight: 600
  color: #1a1a1a
  margin: 0

@media (max-width: 768px)
  .contenido
    padding: 5rem 1rem 2rem

  .volver
    margin-bottom: 1.5rem

  .joya_layout
    grid-template-columns: 1fr
    gap: 1.5rem

  .imagen_principal
    aspect-ratio: 1
    max-height: 320px
    padding: 1.2rem

  .miniaturas
    gap: 0.5rem

  .miniatura
    width: 58px
    height: 58px

  .info
    padding-top: 0

  .nombre
    font-size: 1.5rem

  .precio
    font-size: 1.2rem

  .descripcion
    font-size: 0.88rem

  .acciones
    margin-top: 0.5rem

  .btn_fav, .btn_contacto
    padding: 12px

  .similares
    padding: 0 1rem
    margin: 2rem auto 1rem

  .similares-header
    margin-bottom: 1.5rem

  .sim-titulo
    font-size: 1rem

  .similares-grid
    grid-template-columns: 1fr
    gap: 1rem

  .disponibilidad
    width: 100%
    justify-content: center
    box-sizing: border-box

  .acciones
    margin-top: 0.5rem

  .btn_fav
    width: 100%
    box-sizing: border-box
    padding: 14px

  .btn_contacto
    width: 100%
    box-sizing: border-box
    padding: 14px
    text-align: center
</style>