<template>
  <div class="pagina">
    <header_all />
    <div class="contenido">

      <div class="cabecera">
        <p class="cabecera_etiqueta">✦ Material premium</p>
        <h1>Oro</h1>
        <p class="cabecera_sub">
          Descubre nuestra selección de joyas de oro en Joyería Mercè, Puerto de Sagunto.
          Anillos, pendientes, pulseras, cadenas y colgantes de oro con diseño exclusivo y acabados de alta calidad.
        </p>
      </div>

      <div class="controles">
        <input v-model="busqueda" class="buscador" placeholder="Buscar joya de oro..." />
        <select v-model="orden" class="selector">
          <option value="az">A → Z</option>
          <option value="precio_asc">Precio ↑</option>
          <option value="precio_desc">Precio ↓</option>
        </select>
        <select v-model="tipoFiltro" class="selector">
          <option value="">Todos los tipos</option>
          <option value="anillos">Anillos</option>
          <option value="pendientes">Pendientes</option>
          <option value="pulseras">Pulseras</option>
          <option value="cadenas">Cadenas</option>
          <option value="colgantes">Colgantes</option>
        </select>
      </div>

      <p class="resultado_info">{{ joyasFiltradas.length }} piezas encontradas</p>

      <div class="rejilla" v-if="joyasPaginadas.length">
        <div
          v-for="joya in joyasPaginadas"
          :key="joya.id"
          class="tarjeta"
          @click="router.push(`/joya/${joya.slug}`)"
        >
          <div class="tarjeta_imagen">
            <img :src="joya.imagenes[0]" :alt="joya.nombre" />
            <span v-if="esNovedad(joya.fecha_creacion)" class="etiqueta etiqueta_nuevo">Nuevo</span>
            <span v-if="!joya.disponible" class="etiqueta etiqueta_agotado">Agotado</span>
          </div>
          <div class="tarjeta_cuerpo">
            <p class="tarjeta_tipo">{{ joya.tipo }}</p>
            <h3 class="tarjeta_nombre">{{ joya.nombre }}</h3>
            <p class="tarjeta_desc">{{ joya.descripcion }}</p>
            <div class="tarjeta_pie">
              <span class="precio">{{ joya.precio }} €</span>
              <span class="disponibilidad" :class="joya.disponible ? 'disponible' : 'no_disponible'">
                <span class="punto" />
                {{ joya.disponible ? 'Disponible' : 'No disponible' }}
              </span>
              <button
                class="btn_favorito"
                :class="{ activo: favoritos.esFavorito(joya.id) }"
                @click.stop="favoritos.toggleFavorito(joya.id)"
              >
                {{ favoritos.esFavorito(joya.id) ? '♥' : '♡' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="vacio" v-if="!joyasFiltradas.length">
        <p>✦</p>
        <p>No se encontraron joyas de oro con esos filtros</p>
      </div>

    </div>

    <div class="paginacion" v-if="totalPaginas > 1">
      <button class="pag_btn" @click="paginaActual--" :disabled="paginaActual === 1">‹</button>
      <button
        v-for="n in totalPaginas"
        :key="n"
        class="pag_btn"
        :class="{ activo: paginaActual === n }"
        @click="cambiarPagina(n)"
      >{{ n }}</button>
      <button class="pag_btn" @click="paginaActual++" :disabled="paginaActual === totalPaginas">›</button>
    </div>

    <footer_component />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useJoyasPublicasStore } from '@/stores/joyas'
import { useFavoritosStore } from '@/stores/favoritos'
import { useHead } from '@vueuse/head'
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'

const router = useRouter()
const store = useJoyasPublicasStore()
const favoritos = useFavoritosStore()

useHead({
  title: 'Joyas de Oro | Joyería Mercè — Puerto de Sagunto',
  meta: [
    { name: 'description', content: 'Explora nuestra colección de joyas de oro en Joyería Mercè, Puerto de Sagunto. Anillos, pendientes, pulseras, cadenas y colgantes de oro. Ven a vernos o consulta online.' },
    { name: 'robots', content: 'index, follow' },
    { name: 'keywords', content: 'joyas oro Puerto de Sagunto, anillos oro, pendientes oro, pulseras oro, cadenas oro, colgantes oro, joyería Puerto de Sagunto, Joyería Mercè, comprar oro Sagunto' },
    { property: 'og:title', content: 'Joyas de Oro — Joyería Mercè Puerto de Sagunto' },
    { property: 'og:description', content: 'Descubre joyas de oro en Joyería Mercè. Anillos, pendientes, pulseras, cadenas y colgantes con envío o recogida en tienda.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://joyeriamerce.es/joyas/oro' },
    { property: 'og:image', content: 'https://joyeriamerce.es/og/oro.jpg' },
    { property: 'og:image:alt', content: 'Colección de joyas de oro de Joyería Mercè Puerto de Sagunto' },
    { property: 'og:locale', content: 'es_ES' },
    { property: 'og:site_name', content: 'Joyería Mercè' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Joyas de Oro — Joyería Mercè' },
    { name: 'twitter:description', content: 'Joyas de oro en Puerto de Sagunto. Anillos, pendientes, pulseras, cadenas y colgantes.' },
    { name: 'twitter:image', content: 'https://joyeriamerce.es/og/oro.jpg' },
  ],
  link: [{ rel: 'canonical', href: 'https://joyeriamerce.es/joyas/oro' }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Joyas de Oro — Joyería Mercè',
      description: 'Colección de joyas de oro en Joyería Mercè, Puerto de Sagunto.',
      url: 'https://joyeriamerce.es/joyas/oro',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://joyeriamerce.es' },
        { '@type': 'ListItem', position: 2, name: 'Oro', item: 'https://joyeriamerce.es/joyas/oro' }
      ]},
      mainEntity: { '@type': 'ItemList', name: 'Colección de joyas de oro', description: 'Anillos, pendientes, pulseras, cadenas y colgantes de oro' },
      publisher: { '@type': 'JewelryStore', name: 'Joyería Mercè', url: 'https://joyeriamerce.es', address: { '@type': 'PostalAddress', addressLocality: 'Puerto de Sagunto', addressRegion: 'Valencia', addressCountry: 'ES' } }
    })
  }]
})

const busqueda = ref('')
const orden = ref('az')
const tipoFiltro = ref('')
const cargando = ref(false)

onMounted(async () => {
  cargando.value = true
  await store.cargarJoyasPorFiltro(null, 'oro', 1, 12)
  cargando.value = false
})

const esNovedad = (fecha) => Date.now() - fecha < 14 * 24 * 60 * 60 * 1000

const joyasFiltradas = computed(() => {
  let resultado = store.todas

  if (busqueda.value) {
    resultado = resultado.filter(j =>
      j.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
    )
  }

  if (tipoFiltro.value) {
    resultado = resultado.filter(j => j.tipo === tipoFiltro.value)
  }

  if (orden.value === 'az') resultado.sort((a, b) => a.nombre.localeCompare(b.nombre))
  if (orden.value === 'precio_asc') resultado.sort((a, b) => a.precio - b.precio)
  if (orden.value === 'precio_desc') resultado.sort((a, b) => b.precio - a.precio)

  return resultado
})

const paginaActual = ref(1)
const porPagina = 12

const joyasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return joyasFiltradas.value.slice(inicio, inicio + porPagina)
})

const totalPaginas = computed(() =>
  Math.ceil(joyasFiltradas.value.length / porPagina)
)

const cambiarPagina = (n) => {
  paginaActual.value = n
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch([busqueda, orden, tipoFiltro], () => { paginaActual.value = 1 })
</script>

<style lang="sass" scoped>
.pagina
  min-height: 100vh
  background: #FDFCF8

.contenido
  max-width: 1200px
  margin: 0 auto
  padding: 6rem 2rem 3rem

.cabecera
  text-align: center
  margin-bottom: 3rem

.cabecera_etiqueta
  font-size: 0.65rem
  letter-spacing: 0.25rem
  text-transform: uppercase
  color: #C9A55A
  margin-bottom: 0.75rem

.cabecera h1
  font-family: 'Playfair Display', serif
  font-size: clamp(2rem, 5vw, 3rem)
  font-weight: 700
  color: #1a1a1a
  margin-bottom: 0.75rem

.cabecera_sub
  font-size: 0.85rem
  color: #7a6e5f
  line-height: 1.6
  max-width: 600px
  margin: 0 auto

.controles
  display: flex
  gap: 10px
  align-items: center
  flex-wrap: wrap
  margin-bottom: 1.5rem
  padding-bottom: 1.5rem
  border-bottom: 1px solid rgba(0,0,0,0.07)

.buscador
  border: 1px solid rgba(0,0,0,0.12)
  background: transparent
  padding: 7px 16px
  border-radius: 20px
  font-size: 0.8rem
  outline: none
  color: #1a1a1a
  width: 220px
  font-family: inherit
  transition: border-color 0.2s
  &::placeholder
    color: #bbb
  &:focus
    border-color: rgba(0,0,0,0.3)

.selector
  border: 1px solid rgba(0,0,0,0.12)
  background: transparent
  padding: 7px 12px
  border-radius: 20px
  font-size: 0.8rem
  color: #1a1a1a
  cursor: pointer
  outline: none
  font-family: inherit

.resultado_info
  font-size: 0.78rem
  color: #9a8f7f
  letter-spacing: 0.06rem
  margin: 0 0 1.5rem

.rejilla
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))
  gap: 1.5rem

.tarjeta
  background: #fff
  border-radius: 16px
  overflow: hidden
  border: 1px solid rgba(0,0,0,0.07)
  cursor: pointer
  transition: transform 0.3s ease, box-shadow 0.3s ease
  &:hover
    transform: translateY(-5px)
    box-shadow: 0 16px 40px rgba(0,0,0,0.09)
    .tarjeta_imagen img
      transform: scale(1.04)

.tarjeta_imagen
  background: linear-gradient(145deg, #f5f0e8, #ede9d8)
  height: 220px
  overflow: hidden
  position: relative
  display: flex
  align-items: center
  justify-content: center
  img
    width: 100%
    height: 100%
    object-fit: contain
    padding: 1.5rem
    transition: transform 0.4s ease

.etiqueta
  position: absolute
  top: 12px
  font-size: 0.62rem
  letter-spacing: 0.07rem
  padding: 3px 10px
  border-radius: 20px
  font-weight: 600
  text-transform: uppercase

.etiqueta_nuevo
  left: 12px
  background: #1a1a1a
  color: #EDE9D8

.etiqueta_agotado
  right: 12px
  background: rgba(255,255,255,0.85)
  color: #aaa
  border: 1px solid rgba(0,0,0,0.08)

.tarjeta_cuerpo
  padding: 1.2rem

.tarjeta_tipo
  font-size: 0.65rem
  letter-spacing: 0.15rem
  color: #9a8f7f
  text-transform: uppercase
  margin: 0 0 6px

.tarjeta_nombre
  font-family: 'Playfair Display', serif
  font-size: 1.05rem
  font-weight: 700
  color: #1a1a1a
  margin: 0 0 8px
  line-height: 1.3

.tarjeta_desc
  font-size: 0.8rem
  color: #7a6e5f
  margin: 0 0 14px
  line-height: 1.6
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden

.tarjeta_pie
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: 10px
  border-top: 1px solid rgba(0,0,0,0.06)

.precio
  font-size: 1rem
  font-weight: 700
  color: #1a1a1a

.disponibilidad
  display: flex
  align-items: center
  gap: 5px
  font-size: 0.68rem
  font-weight: 600
  letter-spacing: 0.04rem
  .punto
    width: 6px
    height: 6px
    border-radius: 50%
    flex-shrink: 0
  &.disponible
    color: #2d7a4f
    .punto
      background: #2d7a4f
      animation: pulso 1.8s infinite
  &.no_disponible
    color: #bbb
    .punto
      background: #ccc

.btn_favorito
  background: transparent
  border: none
  cursor: pointer
  font-size: 1.2rem
  color: #ccc
  transition: all 0.2s
  padding: 0
  &:hover
    color: #e07070
  &.activo
    color: #e07070

.vacio
  text-align: center
  padding: 6rem 2rem
  color: #9a8f7f
  p:first-child
    font-size: 2rem
    opacity: 0.3
    margin: 0 0 1rem
  p:last-child
    font-size: 0.9rem
    letter-spacing: 0.05rem

.paginacion
  display: flex
  justify-content: center
  align-items: center
  gap: 6px
  margin: 3rem auto 2rem
  padding: 0 2rem

.pag_btn
  min-width: 38px
  height: 38px
  padding: 0 12px
  border-radius: 10px
  border: 1px solid rgba(0,0,0,0.1)
  background: #fff
  font-size: 0.82rem
  cursor: pointer
  color: #1a1a1a
  transition: all 0.2s
  font-family: inherit
  display: flex
  align-items: center
  justify-content: center
  &:hover:not(:disabled)
    background: #f5f0e8
    border-color: rgba(0,0,0,0.2)
  &:disabled
    opacity: 0.3
    cursor: not-allowed
  &.activo
    background: #1a1a1a
    color: #EDE9D8
    border-color: #1a1a1a
    font-weight: 500

@keyframes pulso
  0%, 100%
    opacity: 1
    transform: scale(1)
  50%
    opacity: 0.3
    transform: scale(0.6)

@media (max-width: 768px)
  .contenido
    padding: 4rem 1rem 3rem
  .controles
    flex-direction: column
    align-items: stretch
  .buscador, .selector
    width: 100%
    box-sizing: border-box
  .rejilla
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
    gap: 1rem
  .tarjeta_imagen
    height: 160px
  .tarjeta_nombre
    font-size: 0.9rem
  .tarjeta_desc
    display: none
  .paginacion
    gap: 4px
    margin: 2rem auto 1.5rem
    flex-wrap: wrap
  .pag_btn
    min-width: 34px
    height: 34px
    font-size: 0.78rem
    border-radius: 8px
</style>