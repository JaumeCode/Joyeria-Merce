<template>
  <div class="pagina">
    <header_all />
    <div class="contenido">

      <!-- Cabecera -->
      <div class="cat_header">
        <h1>Catálogo</h1>
        <p class="sub">
          Explora nuestra colección completa de joyas en Puerto de Sagunto. Descubre anillos, pulseras,
          colgantes y pendientes de oro, plata y acero, con diseño exclusivo y acabados de alta calidad,
          perfectos para cualquier ocasión.
        </p>
      </div>

      <!-- Controles -->
      <div class="controles">
        <div class="filtros_header">
          <div class="filtros" :class="{ abierto: filtrosAbiertos }">
            <button
              v-for="cat in categorias"
              :key="cat"
              class="chip"
              :class="{ activo: catActiva === cat }"
              @click="catActiva = cat; filtrosAbiertos = false"
            >
              {{ cat }}
            </button>
          </div>
          <button class="btn_filtros" @click="filtrosAbiertos = !filtrosAbiertos">
            {{ filtrosAbiertos ? '✕ Cerrar' : '⊞ Categorías' }}
          </button>
        </div>

        <div class="derecha">
          <input v-model="busqueda" class="buscar" placeholder="Buscar joya..." />
          <select v-model="orden" class="ordenar">
            <option value="az">A → Z</option>
            <option value="precio_asc">Precio ↑</option>
            <option value="precio_desc">Precio ↓</option>
          </select>
          <select v-model="materialFiltro" class="ordenar">
            <option value="">Todos los materiales</option>
            <option value="oro">Oro</option>
            <option value="plata">Plata</option>
            <option value="acero">Acero</option>
          </select>
        </div>
      </div>

      <!-- Estado de carga -->
      <div class="cargando" v-if="cargando">
        <span class="spinner" />
        <p>Cargando joyas…</p>
      </div>

      <!-- Error -->
      <div class="vacio" v-else-if="error">
        <p>⚠️</p>
        <p>Error al cargar las joyas. Inténtalo de nuevo.</p>
        <button class="chip activo" @click="cargar()">Reintentar</button>
      </div>

      <template v-else>
        <p class="resultado_info">{{ joyasFiltradas.length }} piezas encontradas</p>

        <!-- Grid -->
        <div class="grid" v-if="joyasPaginadas.length">
          <PremiumJewelryCard
            v-for="joya in joyasPaginadas"
            :key="joya.id"
            :id="joya.id"
            :imagen="joya.imagenes[0]"
            :nombre="joya.nombre"
            :descripcion="joya.descripcion"
            :tipo="joya.tipo"
            :material="joya.material"
            :medidas="joya.medidas"
            :precio="joya.precio"
            :disponible="joya.disponible"
            :slug="joya.slug"
            :esNuevo="esNovedad(joya.fecha_creacion)"
          />
        </div>

        <!-- Sin resultados -->
        <div class="vacio" v-else>
          <p>✦</p>
          <p>No se encontraron joyas con esos filtros</p>
        </div>

        <!-- Paginación -->
        <div class="paginacion" v-if="totalPaginas > 1">
          <button class="pag_btn" @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1">‹</button>
          <button
            v-for="n in totalPaginas"
            :key="n"
            class="pag_btn"
            :class="{ activo: paginaActual === n }"
            @click="cambiarPagina(n)"
          >{{ n }}</button>
          <button class="pag_btn" @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas">›</button>
        </div>
      </template>

    </div>
    <footer_component />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { useJoyasPublicasStore } from '@/stores/joyas'
import { useFavoritosStore } from '@/stores/favoritos'
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'
import PremiumJewelryCard from '@/components/PremiumJewelryCard.vue'

// ── Stores ────────────────────────────────────────────────────────────────────
const store     = useJoyasPublicasStore()
const favoritos = useFavoritosStore()
const route     = useRoute()

// ── Estado local de carga ─────────────────────────────────────────────────────
// obtener_joya() guarda los datos en store.todasLasJoyas (NO en store.todas).
// Gestionamos cargando/error localmente para mostrar feedback correcto.
const cargando = ref(false)
const error    = ref(false)

// ── Filtros / orden ───────────────────────────────────────────────────────────
const categorias      = ['Todas', 'Anillos', 'Pulseras', 'Cadenas', 'Colgantes', 'Pendientes']
const catActiva       = ref('Todas')
const busqueda        = ref('')
const orden           = ref('az')
const materialFiltro  = ref('')
const filtrosAbiertos = ref(false)

// ── Paginación ────────────────────────────────────────────────────────────────
const paginaActual = ref(1)
const POR_PAGINA   = 12

// ── SEO ───────────────────────────────────────────────────────────────────────
useHead({
  title: 'Catálogo de Joyas en Puerto de Sagunto — Joyería Mercè',
  link: [{ rel: 'canonical', href: 'https://joyeriamerce.es/catalogo' }],
  meta: [
    { name: 'description',        content: 'Explora la colección de joyas únicas de oro, plata y acero en Joyería Mercè, Puerto de Sagunto. Anillos, pulseras, colgantes y pendientes con diseño exclusivo y acabados de calidad.' },
    { property: 'og:title',       content: 'Catálogo de Joyas en Puerto de Sagunto — Joyería Mercè' },
    { property: 'og:description', content: 'Descubre anillos, pulseras, colgantes y pendientes de oro, plata y acero en Joyería Mercè. Diseño exclusivo y acabados de alta calidad en Puerto de Sagunto.' },
    { property: 'og:type',        content: 'website' },
    { name: 'keywords',           content: 'joyas, joyería, Puerto de Sagunto, anillos, pulseras, colgantes, pendientes, oro, plata, acero, diseño exclusivo, calidad' },
  ],
})

// ── Carga ─────────────────────────────────────────────────────────────────────
// FIX PRINCIPAL: obtener_joya() llena store.todasLasJoyas, no store.todas.
// El computed joyasFiltradas lee store.todasLasJoyas.
const cargar = async () => {
  if (store.todasLasJoyas?.length) return  // ya en caché, no repetir fetch
  cargando.value = true
  error.value    = false
  try {
    await store.obtener_joya()
  } catch (e) {
    console.error('Error cargando joyas:', e)
    error.value = true
  } finally {
    cargando.value = false
  }
}

onMounted(async () => {
  if (route.query.tipo)     catActiva.value      = route.query.tipo
  if (route.query.material) materialFiltro.value = route.query.material
  await cargar()
})

// Sincronizar filtros si cambia la URL
watch(
  () => route.query,
  (query) => {
    if (query.tipo)     catActiva.value      = query.tipo
    if (query.material) materialFiltro.value = query.material
  }
)

// ── Helpers ───────────────────────────────────────────────────────────────────
const esNovedad = (fecha) => Boolean(fecha) && Date.now() - fecha < 14 * 24 * 60 * 60 * 1000

// ── Computed: filtrado + ordenación ──────────────────────────────────────────
// FIX: lee store.todasLasJoyas (donde obtener_joya() guarda los datos)
const joyasFiltradas = computed(() => {
  const term     = busqueda.value.trim().toLowerCase()
  const material = materialFiltro.value.toLowerCase()
  const tipo     = catActiva.value === 'Todas' ? '' : catActiva.value.toLowerCase()

  const resultado = (store.todasLasJoyas ?? []).filter((joya) => {
    if (tipo     && joya.tipo?.toLowerCase()     !== tipo)     return false
    if (material && joya.material?.toLowerCase() !== material) return false
    if (term     && !joya.nombre?.toLowerCase().includes(term)) return false
    return true
  })

  const ordenadores = {
    az:          (a, b) => a.nombre.localeCompare(b.nombre),
    precio_asc:  (a, b) => a.precio - b.precio,
    precio_desc: (a, b) => b.precio - a.precio,
  }

  return resultado.sort(ordenadores[orden.value] ?? ordenadores.az)
})

// ── Computed: paginación ──────────────────────────────────────────────────────
const totalPaginas = computed(() => Math.ceil(joyasFiltradas.value.length / POR_PAGINA) || 1)

const joyasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * POR_PAGINA
  return joyasFiltradas.value.slice(inicio, inicio + POR_PAGINA)
})

// Volver a página 1 cuando cambia cualquier filtro
watch([catActiva, busqueda, orden, materialFiltro], () => { paginaActual.value = 1 })

const cambiarPagina = (n) => {
  if (n < 1 || n > totalPaginas.value) return
  paginaActual.value = n
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style lang="sass" scoped>
.pagina
  min-height: 100vh
  background: #FDFCF8

.contenido
  max-width: 1200px
  margin: 0 auto
  padding: 6rem 2rem 3rem

// ── Cabecera ──────────────────────────────────────────────────────────────────
.cat_header
  text-align: center
  margin-bottom: 3rem

  h1
    font-family: 'Playfair Display', serif
    font-size: clamp(2rem, 5vw, 3rem)
    font-weight: 700
    color: #1a1a1a
    margin-bottom: 0.75rem

  .sub
    font-size: 0.85rem
    color: #7a6e5f
    letter-spacing: 0.05rem
    line-height: 1.5
    margin-bottom: 3rem

// ── Controles ─────────────────────────────────────────────────────────────────
.controles
  display: flex
  flex-wrap: wrap
  gap: 1rem
  align-items: center
  justify-content: space-between
  margin-bottom: 1.5rem
  padding-bottom: 1.5rem
  border-bottom: 1px solid rgba(0,0,0,0.07)

.filtros
  display: flex
  gap: 8px
  flex-wrap: wrap

.chip
  font-size: 0.72rem
  letter-spacing: 0.08rem
  border: 1px solid rgba(0,0,0,0.14)
  background: transparent
  padding: 6px 16px
  border-radius: 20px
  cursor: pointer
  color: #1a1a1a
  transition: all 0.2s ease
  font-family: inherit

  &:hover
    background: rgba(0,0,0,0.04)

  &.activo
    background: #1a1a1a
    color: #EDE9D8
    border-color: #1a1a1a

.derecha
  display: flex
  gap: 10px
  align-items: center
  flex-wrap: wrap

.buscar
  border: 1px solid rgba(0,0,0,0.12)
  background: transparent
  padding: 7px 16px
  border-radius: 20px
  font-size: 0.8rem
  outline: none
  color: #1a1a1a
  width: 200px
  font-family: inherit
  transition: border-color 0.2s

  &::placeholder
    color: #bbb

  &:focus
    border-color: rgba(0,0,0,0.3)

.ordenar
  border: 1px solid rgba(0,0,0,0.12)
  background: transparent
  padding: 7px 12px
  border-radius: 20px
  font-size: 0.8rem
  color: #1a1a1a
  cursor: pointer
  outline: none
  font-family: inherit

// ── Info ──────────────────────────────────────────────────────────────────────
.resultado_info
  font-size: 0.78rem
  color: #9a8f7f
  letter-spacing: 0.06rem
  margin: 0 0 1.5rem

// ── Cargando ──────────────────────────────────────────────────────────────────
.cargando
  display: flex
  flex-direction: column
  align-items: center
  gap: 1rem
  padding: 6rem 2rem
  color: #9a8f7f
  font-size: 0.9rem

.spinner
  width: 32px
  height: 32px
  border: 2px solid rgba(0,0,0,0.1)
  border-top-color: #1a1a1a
  border-radius: 50%
  animation: girar 0.8s linear infinite

@keyframes girar
  to
    transform: rotate(360deg)

// ── Grid ──────────────────────────────────────────────────────────────────────
.grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))
  gap: 1.5rem

// ── Vacío / Error ─────────────────────────────────────────────────────────────
.vacio
  text-align: center
  padding: 6rem 2rem
  color: #9a8f7f
  display: flex
  flex-direction: column
  align-items: center
  gap: 1rem

  p:first-child
    font-size: 2rem
    opacity: 0.3
    margin: 0

  p:last-child
    font-size: 0.9rem
    letter-spacing: 0.05rem
    margin: 0

// ── Paginación ────────────────────────────────────────────────────────────────
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

// ── Responsive ────────────────────────────────────────────────────────────────
@media (max-width: 768px)
  .contenido
    padding: 4rem 1rem 3rem

  .controles
    flex-direction: column
    align-items: stretch
    gap: 0.75rem
    padding-bottom: 1rem

  .filtros_header
    display: flex
    flex-direction: column
    gap: 8px

  .filtros
    display: none
    grid-template-columns: repeat(3, 1fr)
    gap: 6px

    &.abierto
      display: grid

  .chip
    font-size: 0.68rem
    padding: 8px 14px
    text-align: center
    border-radius: 10px

  .btn_filtros
    display: flex
    align-items: center
    justify-content: center
    gap: 6px
    width: 100%
    padding: 9px 16px
    border: 1px solid rgba(0,0,0,0.14)
    border-radius: 20px
    background: transparent
    font-family: inherit
    font-size: 0.75rem
    letter-spacing: 0.08rem
    color: #1a1a1a
    cursor: pointer
    transition: all 0.2s

    &:hover
      background: rgba(0,0,0,0.04)

  .derecha
    flex-direction: column
    gap: 8px
    width: 100%

  .buscar,
  .ordenar
    width: 100%
    box-sizing: border-box

  .grid
    grid-template-columns: 1fr
    gap: 1rem

  .paginacion
    gap: 4px
    margin: 2rem auto 1.5rem
    flex-wrap: wrap

  .pag_btn
    min-width: 34px
    height: 34px
    font-size: 0.78rem
    border-radius: 8px

// Ocultar en desktop
.btn_filtros
  display: none
</style>
