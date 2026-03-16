<template>
  <div class="pagina">
    <header_all />
    <div class="contenido">
      <!-- Cabecera -->
      <div class="cat_header">
        <h1>Catálogo</h1>
        <p class="sub">Colección completa · Hecho a mano</p>
      </div>

      <!-- Controles -->
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

      <p class="resultado_info">{{ joyasFiltradas.length }} piezas encontradas</p>

      <!-- Grid -->
      <div class="grid" v-if="joyasPaginadas">
        <div
          v-for="joya in joyasPaginadas"
          :key="joya.id"
          class="card"
          @click="router.push(`/joya/${joya.id}`)"
        >
          <div class="card_img">
            <img :src="joya.imagenes[0]" :alt="joya.nombre" />
            <span v-if="esNovedad(joya.fecha_creacion)" class="badge badge_nov">Nuevo</span>
            <span v-if="!joya.disponible" class="badge badge_ago">Agotado</span>
          </div>
          <div class="card_body">
            <p class="cat_label">{{ joya.tipo }}</p>
            <h3 class="nombre">{{ joya.nombre }}</h3>
            <p class="desc">{{ joya.descripcion }}</p>
            <div class="card_footer">
              <span class="precio">{{ joya.precio }} €</span>
              <span class="dispo" :class="joya.disponible ? 'si' : 'no'">
                <span class="dot" />
                {{ joya.disponible ? 'Disponible' : 'No disponible' }}
              </span>
              <button
                class="btn_fav"
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
        <p>No se encontraron joyas con esos filtros</p>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useJoyasPublicasStore } from '@/stores/joyas'
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'
import { useFavoritosStore } from '@/stores/favoritos'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
//Recuperamos el storage de favoritos
const favoritos=useFavoritosStore()

//Agregar a favoritos
const route=useRoute()
const router = useRouter()
const store = useJoyasPublicasStore()

const categorias = ['Todas', 'Anillos', 'Pulseras', 'Cadenas', 'Colgantes', 'Pendientes']
const catActiva = ref('Todas')
const busqueda = ref('')
const orden = ref('az')
const materialFiltro = ref('')
const filtrosAbiertos = ref(false)
onMounted(async () => {
  if (store.todas.length === 0) await store.obtener_joya()
  if (route.query.tipo) {
    catActiva.value = route.query.tipo

  }
  if (route.query.material) {
    materialFiltro.value = route.query.material
  }
})

const esNovedad = (fecha) => Date.now() - fecha < 14 * 24 * 60 * 60 * 1000

const joyasFiltradas = computed(() => {
  let resultado = []

  
  for (let joya of store.todas) {

    
    if (catActiva.value !== 'Todas' && joya.tipo !== catActiva.value.toLowerCase()) continue

    
    if (!joya.nombre.toLowerCase().includes(busqueda.value.toLowerCase())) continue

    if (materialFiltro.value && joya.material !=materialFiltro.value.toLocaleLowerCase()) continue
    
    resultado.push(joya)
  }

  if (orden.value === 'az') {
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre))
  }

  if (orden.value === 'precio_asc') {
    resultado.sort((a, b) => a.precio - b.precio)
  }

  if (orden.value === 'precio_desc') {
    resultado.sort((a, b) => b.precio - a.precio)
  }


  return resultado
})

//Paginacion de joyas 
const paginaActual = ref(1)
const porPagina = 12

const joyasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  
  return joyasFiltradas.value.slice(inicio, inicio + porPagina)
})
const cambiarPagina=(n)=>{
  paginaActual.value = n
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
const totalPaginas = computed(() => Math.floor(joyasFiltradas.value.length / porPagina) + 1)
watch(paginaActual, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}, { flush: 'post' })
watch([catActiva, busqueda, orden, materialFiltro], () => { paginaActual.value = 1 })

</script>
<style lang="sass" scoped>
.pagina
  min-height: 100vh
  background: #FDFCF8

.contenido
  max-width: 1200px
  margin: 0 auto
  padding: 8rem 2rem 0rem

// ── Cabecera ──────────────────────────────────────────────────────────────────
.cat_header
  text-align: center
  margin-bottom: 3rem

  h1
    font-family: 'Playfair Display', serif
    font-size: clamp(2rem, 5vw, 3.2rem)
    font-weight: 700
    color: #1a1a1a
    letter-spacing: 0.08rem
    margin: 0 0 0.5rem

  .sub
    font-size: 0.78rem
    letter-spacing: 0.35rem
    color: #9a8f7f
    text-transform: uppercase
    margin: 0

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

// ── Info resultados ───────────────────────────────────────────────────────────
.resultado_info
  font-size: 0.78rem
  color: #9a8f7f
  letter-spacing: 0.06rem
  margin: 0 0 1.5rem

// ── Grid ──────────────────────────────────────────────────────────────────────
.grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))
  gap: 1.5rem

// ── Card ──────────────────────────────────────────────────────────────────────
.card
  background: #fff
  border-radius: 16px
  overflow: hidden
  border: 1px solid rgba(0,0,0,0.07)
  cursor: pointer
  transition: transform 0.3s ease, box-shadow 0.3s ease

  &:hover
    transform: translateY(-5px)
    box-shadow: 0 16px 40px rgba(0,0,0,0.09)

    .card_img img
      transform: scale(1.04)

.card_img
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

.badge
  position: absolute
  top: 12px
  font-size: 0.62rem
  letter-spacing: 0.07rem
  padding: 3px 10px
  border-radius: 20px
  font-weight: 600
  text-transform: uppercase

  &.badge_nov
    left: 12px
    background: #1a1a1a
    color: #EDE9D8

  &.badge_ago
    right: 12px
    background: rgba(255,255,255,0.85)
    color: #aaa
    border: 1px solid rgba(0,0,0,0.08)

.card_body
  padding: 1.2rem

.cat_label
  font-size: 0.65rem
  letter-spacing: 0.15rem
  color: #9a8f7f
  text-transform: uppercase
  margin: 0 0 6px

.nombre
  font-family: 'Playfair Display', serif
  font-size: 1.05rem
  font-weight: 700
  color: #1a1a1a
  margin: 0 0 8px
  line-height: 1.3

.desc
  font-size: 0.8rem
  color: #7a6e5f
  margin: 0 0 14px
  line-height: 1.6
  display: -webkit-box
  -webkit-line-clamp: 2
  -webkit-box-orient: vertical
  overflow: hidden

.card_footer
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: 10px
  border-top: 1px solid rgba(0,0,0,0.06)

.btn_fav
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

.precio
  font-size: 1rem
  font-weight: 700
  color: #1a1a1a

.dispo
  display: flex
  align-items: center
  gap: 5px
  font-size: 0.68rem
  font-weight: 600
  letter-spacing: 0.04rem

  .dot
    width: 6px
    height: 6px
    border-radius: 50%
    flex-shrink: 0

  &.si
    color: #2d7a4f
    .dot
      background: #2d7a4f
      animation: pulso 1.8s infinite

  &.no
    color: #bbb
    .dot
      background: #ccc

// ── Vacío ─────────────────────────────────────────────────────────────────────
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

// ── Animaciones ───────────────────────────────────────────────────────────────
@keyframes pulso
  0%, 100%
    opacity: 1
    transform: scale(1)
  50%
    opacity: 0.3
    transform: scale(0.6)

// ── Mobile ────────────────────────────────────────────────────────────────────
.btn_filtros
  display: none

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

  // Chips ocultos por defecto en móvil
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

  // Botón visible solo en móvil
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
    display: flex
    flex-direction: column
    gap: 8px
    width: 100%

  .buscar
    width: 100%
    box-sizing: border-box

  .ordenar
    width: 100%
    box-sizing: border-box

  .grid
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
    gap: 1rem

  .card_img
    height: 160px

  .nombre
    font-size: 0.9rem

  .desc
    display: none

  .precio
    font-size: 0.9rem
</style>