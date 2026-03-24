<template>
  <div class="pagina">
    <header_all />

    <div class="contenido">

      <!-- CABECERA -->
      <div class="cabecera">
        <p class="cabecera_etiqueta">✦ Colección exclusiva</p>
        <h1>Anillos de compromiso</h1>
        <p class="cabecera_sub">
          Encuentra el anillo de compromiso perfecto en Joyería Mercè, Puerto de Sagunto.
          Diseños elegantes en oro y plata, con diamantes y gemas de alta calidad. 
          Sorprende a tu pareja con una joya única.
        </p>
      </div>

      <!-- CONTROLES -->
      <div class="controles">
        <input v-model="busqueda" class="buscador" placeholder="Buscar anillo de compromiso..." />
        <select v-model="orden" class="selector">
          <option value="az">A → Z</option>
          <option value="precio_asc">Precio ↑</option>
          <option value="precio_desc">Precio ↓</option>
        </select>
        <select v-model="tipoFiltro" class="selector">
          <option value="">Todos los tipos</option>
          <option value="solitarios">Solitarios</option>
          <option value="alianzas">Alianzas</option>
          <option value="gemstone">Con piedras</option>
        </select>
      </div>

      <p class="resultado_info">{{ joyasFiltradas.length }} piezas encontradas</p>

      <!-- REJILLA DE JOYAS -->
      <div class="rejilla" v-if="joyasPaginadas.length">
        <div
          v-for="joya in joyasPaginadas"
          :key="joya.id"
          class="tarjeta"
          @click="router.push(`/joya/${joya.id}`)"
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

      <!-- VACIO -->
      <div class="vacio" v-if="!joyasFiltradas.length">
        <p>✦</p>
        <p>No se encontraron anillos de compromiso con esos filtros</p>
      </div>

    </div>

    <!-- PAGINACIÓN -->
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
  title: 'Anillos de compromiso | Joyería Mercè — Puerto de Sagunto',
  meta: [
    { name: 'description', content: 'Explora nuestra colección de anillos de compromiso en Joyería Mercè, Puerto de Sagunto. Solitarios, alianzas y anillos con piedras preciosas para el momento más especial.' },
    { name: 'robots', content: 'index, follow' },
    { name: 'keywords', content: 'anillos de compromiso, solitarios, alianzas, joyería Puerto de Sagunto, anillos con diamantes, Joyería Mercè, comprar anillos Puerto de Sagunto' },
    { property: 'og:title', content: 'Anillos de compromiso — Joyería Mercè Puerto de Sagunto' },
    { property: 'og:description', content: 'Encuentra el anillo de compromiso perfecto en Joyería Mercè. Solitarios, alianzas y gemas de alta calidad.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://joyeriamerce.es/anillos-compromiso' },
    { property: 'og:image', content: 'https://joyeriamerce.es/og/anillos-compromiso.jpg' },
    { property: 'og:image:alt', content: 'Colección de anillos de compromiso de Joyería Mercè' },
    { property: 'og:locale', content: 'es_ES' },
    { property: 'og:site_name', content: 'Joyería Mercè' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Anillos de compromiso — Joyería Mercè' },
    { name: 'twitter:description', content: 'Solitarios, alianzas y anillos con piedras preciosas en Puerto de Sagunto.' },
    { name: 'twitter:image', content: 'https://joyeriamerce.es/og/anillos-compromiso.jpg' },
  ],
  link: [{ rel: 'canonical', href: 'https://joyeriamerce.es/anillos-compromiso' }]
})

const busqueda = ref('')
const orden = ref('az')
const tipoFiltro = ref('')

onMounted(async () => {
  if (store.todas.length === 0) await store.obtener_joya()
})

const esNovedad = (fecha) => Date.now() - fecha < 14 * 24 * 60 * 60 * 1000

const joyasFiltradas = computed(() => {
  let resultado = store.todas.filter(j => j.seccion === 'pedidas')

  if (busqueda.value) resultado = resultado.filter(j => j.nombre.toLowerCase().includes(busqueda.value.toLowerCase()))
  if (tipoFiltro.value) resultado = resultado.filter(j => j.tipo === tipoFiltro.value)

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

const totalPaginas = computed(() => Math.ceil(joyasFiltradas.value.length / porPagina))

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
  font-family: 'Inter', sans-serif

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
  flex-wrap: wrap
  margin-bottom: 1.5rem
  border-bottom: 1px solid rgba(0,0,0,0.07)
  padding-bottom: 1.5rem

.buscador
  border: 1px solid rgba(0,0,0,0.12)
  padding: 7px 16px
  border-radius: 20px
  font-size: 0.8rem
  width: 220px
  outline: none
  transition: 0.2s
  &:focus
    border-color: rgba(0,0,0,0.3)

.selector
  border: 1px solid rgba(0,0,0,0.12)
  padding: 7px 12px
  border-radius: 20px
  font-size: 0.8rem
  cursor: pointer

.resultado_info
  font-size: 0.78rem
  color: #9a8f7f
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
  transition: 0.3s
  &:hover
    transform: translateY(-5px)
    box-shadow: 0 16px 40px rgba(0,0,0,0.09)
    img
      transform: scale(1.04)

.tarjeta_imagen
  background: linear-gradient(145deg, #f5f0e8, #ede9d8)
  height: 220px
  display: flex
  justify-content: center
  align-items: center
  position: relative
  img
    width: 100%
    height: 100%
    object-fit: contain
    padding: 1.5rem
    transition: 0.4s

.etiqueta
  position: absolute
  top: 12px
  font-size: 0.62rem
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
  color: #9a8f7f
  text-transform: uppercase
  margin-bottom: 6px

.tarjeta_nombre
  font-family: 'Playfair Display', serif
  font-weight: 700
  font-size: 1.05rem
  margin-bottom: 8px

.tarjeta_desc
  font-size: 0.8rem
  color: #7a6e5f
  margin-bottom: 14px
  line-height: 1.5
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden

.tarjeta_pie
  display: flex
  justify-content: space-between
  align-items: center
  border-top: 1px solid rgba(0,0,0,0.06)
  padding-top: 10px

.precio
  font-weight: 700

.disponibilidad
  display: flex
  align-items: center
  gap: 5px
  font-size: 0.68rem
  .punto
    width: 6px
    height: 6px
    border-radius: 50%
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
    margin-bottom: 1rem

.paginacion
  display: flex
  justify-content: center
  gap: 6px
  margin: 3rem auto 2rem

.pag_btn
  min-width: 38px
  height: 38px
  border-radius: 10px
  border: 1px solid rgba(0,0,0,0.1)
  background: #fff
  cursor: pointer
  &.activo
    background: #1a1a1a
    color: #EDE9D8
    border-color: #1a1a1a

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
  .buscador, .selector
    width: 100%
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
</style>