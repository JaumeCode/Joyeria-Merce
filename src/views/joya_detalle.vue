<template>
  <div class="pagina">
    <header_all />

    <!-- LOADER FULLSCREEN -->
    <transition name="fade_loader">
      <div class="loader_fullscreen" v-if="!joya || cargandoJoya">
        <div class="loader_content">
          <h2 class="loader_logo">MERCÈ</h2>
          <div class="loader_line_container">
            <div class="loader_line_fill"></div>
          </div>
          <p class="loader_tagline">Alta Joyería Contemporánea</p>
        </div>
      </div>
    </transition>

    <transition name="fade_page" mode="out-in">
      <div class="contenido" v-if="joya && !cargandoJoya" :key="joya.id">
        
        <!-- Breadcrumb -->
        <nav class="breadcrumb">
          <span @click="router.push('/')">Inicio</span> / 
          <span @click="router.push(`/${joya.tipo.toLowerCase()}`)">{{ joya.tipo }}</span> /
          <span class="active">{{ joya.nombre }}</span>
        </nav>
  
        <div class="joya_layout">
          <!-- GALERÍA -->
          <div class="galeria_wrapper">
            <div class="main_img_container">
              <transition name="fade_img" mode="out-in">
                <img :key="imagenActiva" :src="imagenActiva" :alt="joya.nombre" class="img_display" />
              </transition>
            </div>
            
            <div class="thumbs_strip" v-if="joya.imagenes && joya.imagenes.length > 1">
              <div
                v-for="(img, i) in joya.imagenes"
                :key="i"
                class="thumb_box"
                :class="{ activa: imagenActiva === (joya.imagenesDetalle?.[i] || img) }"
                @click="imagenActiva = (joya.imagenesDetalle?.[i] || img)"
              >
                <img :src="img" />
              </div>
            </div>
          </div>
  
          <!-- INFO PRODUCTO -->
          <div class="info_panel">
            <div class="info_header">
              <div class="material_tag">{{ joya.material }}</div>
              <h1 class="product_title">{{ joya.nombre }}</h1>
              <div class="price_tag">{{ joya.precio }}<span>€</span></div>
              <p class="sku_ref">REF: #{{ joya.id.toString().slice(-6).toUpperCase() }}</p>
            </div>

            <div class="luxury_divider"></div>

            <div class="product_description">
              <p class="main_text">{{ joya.descripcion }}</p>
              
              <div class="especificaciones_list" v-if="joya.medidas">
                <div class="spec_item">
                  <strong>Dimensiones:</strong> {{ joya.medidas }}
                </div>
              </div>
            </div>

            <!-- DISPONIBILIDAD -->
            <div class="status_box" :class="statusClass">
              <div class="status_inner">
                <div class="pulse_dot"></div>
                <div class="status_text">
                  <strong>{{ statusTextTitle }}</strong>
                  <p>{{ statusSubtext }}</p>
                </div>
              </div>
            </div>

            <!-- ACCIONES -->
            <div class="purchase_zone">
              <a class="btn_main_action" :href="'https://wa.me/34666238158?text=Hola! Estoy interesado en: ' + joya.nombre" target="_blank">
                {{ joya.disponible === false ? 'CONSULTAR REPOSICIÓN' : 'RESERVAR PIEZA' }}
              </a>
              
              <button class="btn_sec_action" @click="favStore.toggleFavorito(joya.id)" :class="{ active: favStore.esFavorito(joya.id) }">
                <svg viewBox="0 0 24 24" :fill="favStore.esFavorito(joya.id) ? 'currentColor' : 'none'" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                FAVORITOS
              </button>
            </div>
          </div>
        </div>

        <!-- RELACIONADOS (COLUMNA EN MÓVIL) -->
        <div class="related_section" v-if="similares.length">
          <div class="related_header">
            <span class="line"></span>
            <h2>TAMBIÉN TE PUEDE GUSTAR</h2>
            <span class="line"></span>
          </div>
          
          <div class="related_grid">
            <card_jewlery
              v-for="s in similares"
              :key="s.id"
              :id="s.id"
              :imagen="s.imagenes[0]"
              :nombre="s.nombre"
              :slug="s.slug"
              :medidas="s.medidas"
            />
          </div>
        </div>
      </div>
    </transition>

    <footer_component />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJoyasPublicasStore } from '@/stores/joyas'
import { useFavoritosStore } from '@/stores/favoritos'
import { useHead } from '@vueuse/head'
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'
import card_jewlery from '@/components/card_jewlery.vue'

const route = useRoute()
const router = useRouter()
const joyasStore = useJoyasPublicasStore()
const favStore = useFavoritosStore()
const cargandoJoya = ref(false)
const imagenActiva = ref('')

onMounted(async () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  if (joyasStore.todas.length === 0) await joyasStore.obtener_joya()
})

const joya = computed(() => joyasStore.todas.find(j => j.slug === route.params.slug))

const similares = computed(() => {
  if (!joya.value) return []
  return joyasStore.todas
    .filter(j => j.id !== joya.value.id && j.tipo === joya.value.tipo)
    .slice(0, 4)
})
// SEO y Datos Estructurados
useHead(computed(() => {
  if (!joya.value) {
    return {
      title: 'Cargando Pieza... — Joyería Mercè',
      meta: [{ name: 'robots', content: 'noindex' }]
    }
  }

  const urlActual = `https://joyeriamerce.es/joya/${route.params.slug}`
  const tituloCompleto = `${joya.value.nombre} — Joyería Mercè`
  const descripcionCorta = `${joya.value.nombre} de ${joya.value.material}. ${joya.value.descripcion?.slice(0, 140)}... En Joyería Mercè, Puerto de Sagunto.`

  return {
    title: tituloCompleto,
    link: [
      { rel: 'canonical', href: urlActual }
    ],
    meta: [
      { name: 'description', content: descripcionCorta },
      // Open Graph (Facebook, WhatsApp, Instagram)
      { property: 'og:title', content: tituloCompleto },
      { property: 'og:description', content: descripcionCorta },
      { property: 'og:image', content: joya.value.imagenes?.[0] || '' },
      { property: 'og:url', content: urlActual },
      { property: 'og:type', content: 'product' },
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: tituloCompleto },
      { name: 'twitter:description', content: descripcionCorta },
    ],
    script: [
      {
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
          "sku": joya.value.id.toString(),
          "offers": {
            "@type": "Offer",
            "url": urlActual,
            "price": joya.value.precio.toString().replace(/[^\d.]/g, ''), // Asegura que solo haya números
            "priceCurrency": "EUR",
            "availability": joya.value.disponible 
              ? "https://schema.org/InStock" 
              : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition",
            "seller": {
              "@type": "Organization",
              "name": "Joyería Mercè"
            }
          }
        })
      }
    ]
  }
}))
const statusClass = computed(() => {
  if (joya.value?.disponible === true) return 'status-available'
  if (joya.value?.disponible === 'pedido') return 'status-order'
  return 'status-out'
})

const statusTextTitle = computed(() => {
  if (joya.value?.disponible === true) return 'Disponible en tienda'
  if (joya.value?.disponible === 'pedido') return 'Disponible bajo pedido'
  return 'Agotado temporalmente'
})

const statusSubtext = computed(() => {
  if (joya.value?.disponible === true) return 'Puedes venir a probártelo hoy mismo.'
  if (joya.value?.disponible === 'pedido') return 'Lo fabricamos para ti. Consúltanos.'
  return 'Pregúntanos por WhatsApp cuándo volverá.'
})

const actualizarImagen = () => {
  if (!joya.value) return
  imagenActiva.value = joya.value.imagenesDetalle?.[0] || joya.value.imagenes?.[0] || ''
}

watch(joya, (nueva) => { if (nueva) actualizarImagen() }, { immediate: true })

watch(() => route.params.slug, () => {
  cargandoJoya.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
  setTimeout(() => { cargandoJoya.value = false }, 800)
})

useHead(computed(() => ({
  title: joya.value ? `${joya.value.nombre} — Joyería Mercè` : 'Joyería Mercè'
})))
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;600&display=swap')

// --- RESET & ANTI-SCROLL ---
.pagina
  background: #FFFFFF
  width: 100%
  min-height: 100vh
  overflow-x: hidden // Evita el scroll lateral
  position: relative

// --- ANIMACIONES ---
@keyframes loading_anim
  0%
    transform: translateX(-150%)
  100%
    transform: translateX(250%)

@keyframes pulse-green
  0%
    box-shadow: 0 0 0 0 rgba(45, 122, 79, 0.5)
  70%
    box-shadow: 0 0 0 10px rgba(45, 122, 79, 0)
  100%
    box-shadow: 0 0 0 0 rgba(45, 122, 79, 0)

@keyframes pulse-blue
  0%
    box-shadow: 0 0 0 0 rgba(45, 90, 122, 0.5)
  70%
    box-shadow: 0 0 0 10px rgba(45, 90, 122, 0)
  100%
    box-shadow: 0 0 0 0 rgba(45, 90, 122, 0)

@keyframes pulse-red
  0%
    box-shadow: 0 0 0 0 rgba(122, 45, 45, 0.5)
  70%
    box-shadow: 0 0 0 10px rgba(122, 45, 45, 0)
  100%
    box-shadow: 0 0 0 0 rgba(122, 45, 45, 0)

// --- LOADER ---
.loader_fullscreen
  position: fixed
  inset: 0
  background: #FFF
  z-index: 9999
  display: flex
  align-items: center
  justify-content: center
.loader_content
  text-align: center
  .loader_logo
    font-family: 'Playfair Display', serif
    font-size: 2.8rem
    letter-spacing: 0.6rem
  .loader_line_container
    width: 200px
    height: 1px
    background: #F0F0F0
    margin: 1.5rem auto
    overflow: hidden
    .loader_line_fill
      height: 100%
      background: #C9A55A
      width: 50%
      animation: loading_anim 1.2s infinite ease-in-out

// --- CONTENIDO ESTRUCTURA ---
.contenido
  max-width: 1200px
  margin: 0 auto
  padding: 130px 1.5rem 8rem // Espacio para Desktop
  @media (max-width: 768px)
    padding: 80px 1.2rem 5rem // Menos espacio en móvil entre header y breadcrumb

.breadcrumb
  font-size: 0.65rem
  letter-spacing: 0.15rem
  text-transform: uppercase
  color: #BBB
  margin-bottom: 2rem
  span
    cursor: pointer
    &.active
      color: #000

.joya_layout
  display: grid
  grid-template-columns: 1.1fr 0.9fr
  gap: 5rem
  @media (max-width: 950px)
    grid-template-columns: 1fr
    gap: 2.5rem

// --- GALERÍA ---
.main_img_container
  background: #FBFBFB
  aspect-ratio: 1
  display: flex
  align-items: center
  justify-content: center
  .img_display
    max-width: 100%
    max-height: 100%
    object-fit: contain
    padding: 2rem

.thumbs_strip
  display: flex
  justify-content: center
  gap: 0.8rem
  margin-top: 1.2rem
  .thumb_box
    width: 65px
    height: 65px
    background: #FBFBFB
    cursor: pointer
    opacity: 0.4
    transition: opacity 0.3s
    &.activa
      opacity: 1
    img
      width: 100%
      height: 100%
      object-fit: contain

// --- INFO ---
.material_tag
  font-size: 0.7rem
  text-transform: uppercase
  letter-spacing: 0.2rem
  color: #C9A55A
  font-weight: 600
  margin-bottom: 0.5rem

.product_title
  font-family: 'Playfair Display', serif
  font-size: 2.4rem
  margin: 0
  line-height: 1.1

.price_tag
  font-size: 1.8rem
  font-weight: 300
  margin: 0.8rem 0

.sku_ref
  font-size: 0.6rem
  color: #CCC
  letter-spacing: 0.1rem

.luxury_divider
  height: 1px
  background: linear-gradient(to right, #EEE, transparent)
  margin: 1.8rem 0

.main_text
  font-size: 0.95rem
  line-height: 1.8
  color: #444
  margin-bottom: 1.5rem

.spec_item
  font-size: 0.8rem
  color: #333
  border-left: 1px solid #C9A55A
  padding-left: 1rem

// --- ESTADOS ---
.status_box
  padding: 1rem
  margin: 2rem 0
  .status_inner
    display: flex
    align-items: center
    gap: 0.8rem
  .pulse_dot
    width: 9px
    height: 9px
    border-radius: 50%
  .status_text
    strong
      display: block
      font-size: 0.8rem
    p
      font-size: 0.7rem
      margin: 0
      color: #777

.status-available
  background: #F8FAF9
  .pulse_dot
    background: #2D7A4F
    animation: pulse-green 2s infinite
.status-order
  background: #F8F9FA
  .pulse_dot
    background: #2D5A7A
    animation: pulse-blue 2s infinite
.status-out
  background: #FAF8F8
  .pulse_dot
    background: #7A2D2D
    animation: pulse-red 2s infinite

// --- BOTONES ---
.purchase_zone
  display: flex
  flex-direction: column
  gap: 0.8rem

.btn_main_action
  background: #1A1A1A
  color: #FFF
  text-align: center
  padding: 1.1rem
  text-decoration: none
  font-size: 0.75rem
  letter-spacing: 0.15rem
  font-weight: 600
  &:hover
    background: #000

.btn_sec_action
  background: none
  border: 1px solid #EEE
  padding: 0.9rem
  font-size: 0.7rem
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  gap: 8px
  svg
    width: 14px

// --- RELACIONADOS (COLUMNA MÓVIL) ---
// --- RELACIONADOS (CENTRADOS EN PC Y COLUMNA EN MÓVIL) ---
// --- RELACIONADOS (FILA DE 4 CENTRADA EN PC, COLUMNA EN MÓVIL) ---
.related_section
  margin-top: 6rem
  display: flex
  flex-direction: column
  align-items: center

.related_header
  display: flex
  align-items: center
  gap: 1.5rem
  margin-bottom: 3.5rem
  width: 100%
  .line
    flex: 1
    height: 1px
    background: #F0F0F0
  h2
    font-size: 0.75rem
    letter-spacing: 0.2rem
    color: #AAA
    text-align: center
    white-space: nowrap

.related_grid
  display: grid
  // En PC: Forzamos 4 columnas de igual tamaño
  grid-template-columns: repeat(4, 1fr)
  justify-content: center 
  gap: 2rem
  width: 100%
  max-width: 1200px // Para que no se dispersen demasiado en pantallas ultra anchas
  margin: 0 auto

  @media (max-width: 1024px)
    grid-template-columns: repeat(2, 1fr) // En tablets ponemos 2x2
    gap: 1.5rem

  @media (max-width: 768px)
    grid-template-columns: 1fr // En móvil: una sola columna bien centrada
    padding: 0 1rem
    gap: 2.5rem

// --- TRANSICIONES ---
.fade_loader-leave-active
  transition: opacity 0.8s ease
.fade_loader-leave-to
  opacity: 0
.fade_page-enter-active
  transition: opacity 0.6s ease 0.4s
.fade_page-enter-from
  opacity: 0
</style>