<template>
  <div class="pagina">

    <aside class="sidebar">
        <div class="sidebar-brand">
            <span class="sidebar-gem">✦</span>
            <div>
            <p class="sidebar-title">Joyería Mercè</p>
            <p class="sidebar-role">Administración</p>
            </div>
            <button class="btn-menu-toggle" @click="menuAbierto = !menuAbierto">
            {{ menuAbierto ? '✕' : '☰' }}
            </button>
        </div>
        <nav class="sidebar-nav" :class="{ abierto: menuAbierto }">
            <router-link class="nav-item" to="/admin" @click="menuAbierto = false">
            <span class="nav-icon">◈</span> Colección
            </router-link>
            <router-link class="nav-item" to="/admin/estadisticas" @click="menuAbierto = false">
            <span class="nav-icon">◇</span> Estadísticas
            </router-link>
            <router-link class="nav-item" to="/admin/subs" @click="menuAbierto = false">
            <span class="nav-icon">✉</span> Suscriptores
            </router-link>
        </nav>
    </aside>

    <main class="main-content">

      <!-- KPIs -->
      <section class="stats-row">
        <div class="stat-pill">
          <span class="stat-val">{{ total_joyas }}</span>
          <span class="stat-lbl">Total joyas</span>
        </div>
        <div class="stat-pill">
          <span class="stat-val">{{ total_disponibles }}</span>
          <span class="stat-lbl">Disponibles</span>
        </div>
        <div class="stat-pill">
          <span class="stat-val">{{ total_destacadas }}</span>
          <span class="stat-lbl">Destacadas</span>
        </div>
        <div class="stat-pill accent">
          <span class="stat-val">{{ total_suscriptores }}</span>
          <span class="stat-lbl">Suscriptores</span>
        </div>
      </section>

      <!-- Gráficas -->
      <div class="charts-grid">

        <!-- Por tipo -->
        <div class="chart-card">
          <div class="chart-head">
            <h3>Por tipo</h3>
            <p>Distribución de la colección</p>
          </div>
          <div class="chart-wrap">
            <Doughnut v-if="tipoData" :data="tipoData" :options="doughnutOpts" />
          </div>
        </div>

        <!-- Por material -->
        <div class="chart-card">
          <div class="chart-head">
            <h3>Por material</h3>
            <p>Oro, plata y acero</p>
          </div>
          <div class="chart-wrap">
            <Bar v-if="materialData" :data="materialData" :options="barOpts" />
          </div>
        </div>

        <!-- Disponibilidad -->
        <div class="chart-card">
          <div class="chart-head">
            <h3>Disponibilidad</h3>
            <p>Stock actual</p>
          </div>
          <div class="chart-wrap">
            <Doughnut v-if="disponibilidadData" :data="disponibilidadData" :options="doughnutOpts" />
          </div>
        </div>

        <!-- Joyas por mes -->
        <div class="chart-card chart-card-wide">
          <div class="chart-head">
            <h3>Joyas añadidas por mes</h3>
            <p>Últimos 6 meses</p>
          </div>
          <div class="chart-wrap chart-wrap-tall">
            <Line v-if="mesData" :data="mesData" :options="lineOpts" />
          </div>
        </div>

      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Doughnut, Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js'
import { obtener_joya } from '@/functions_firebase/profile'
import { useCorreosStore } from '@/stores/correos'
import { auth } from '@/firebase/main'
import { useRouter } from 'vue-router'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler)

const router = useRouter()
const store_correos = useCorreosStore()
const joyas = ref([])

//menu movile 
const menuAbierto = ref(false)

// Solo para admins
auth.onAuthStateChanged((user) => {
  if (!user || !user.emailVerified) router.push('/admin')
})

onMounted(async () => {
  const resultado = await obtener_joya()
  joyas.value = resultado.favs || []
  await store_correos.obtener_correos()
})

// Contadores
const total_joyas = computed(() => joyas.value.length)
const total_disponibles = computed(() => joyas.value.filter(j => j.disponible).length)
const total_destacadas = computed(() => joyas.value.filter(j => j.destacado).length)
const total_suscriptores = computed(() => store_correos.correos.length)

// Colores utilizados
const GOLD   = '#B8860B'
const GOLD2  = '#D4A017'
const GOLD3  = '#E8C882'
const GOLD4  = '#F2D590'
const DARK   = '#1C1917'
const MUTED  = '#A8A29E'
const GREEN  = '#166534'
const RED    = '#991B1B'

// Grafica de tipos
const tipoData = computed(() => {
  const tipos = ['anillos', 'pulseras', 'cadenas', 'colgantes', 'pendientes']
  const counts = tipos.map(t => joyas.value.filter(j => j.tipo === t).length)
  return {
    labels: ['Anillos', 'Pulseras', 'Cadenas', 'Colgantes', 'Pendientes'],
    datasets: [{
      data: counts,
      backgroundColor: [GOLD, GOLD2, GOLD3, GOLD4, '#A07840'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  }
})

//Materiales Grafico
const materialData = computed(() => {
  const materiales = ['oro', 'plata', 'acero']
  const counts = materiales.map(m => joyas.value.filter(j => j.material === m).length)
  return {
    labels: ['Oro', 'Plata', 'Acero'],
    datasets: [{
      data: counts,
      backgroundColor: [GOLD, '#C0C0C0', '#708090'],
      borderRadius: 6,
      borderWidth: 0
    }]
  }
})

//Grafica de disponibilidad
const disponibilidadData = computed(() => {
  const disp = joyas.value.filter(j => j.disponible).length
  const noDisp = joyas.value.filter(j => !j.disponible).length
  return {
    labels: ['Disponible', 'No disponible'],
    datasets: [{
      data: [disp, noDisp],
      backgroundColor: ['#166534', '#991B1B'],
      borderWidth: 0,
      hoverOffset: 6
    }]
  }
})

// ── Gráfica por mes ───────────────────────────────────────
const mesData = computed(() => {
  const ahora = new Date()
  const meses = []
  const labels = []

  for (let i = 5; i >= 0; i--) {
    const d = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1)
    meses.push({ year: d.getFullYear(), month: d.getMonth() })
    labels.push(d.toLocaleString('es', { month: 'short', year: '2-digit' }))
  }

  const counts = meses.map(({ year, month }) =>
    joyas.value.filter(j => {
      const d = new Date(j.fecha_creacion)
      return d.getFullYear() === year && d.getMonth() === month
    }).length
  )

  return {
    labels,
    datasets: [{
      label: 'Joyas añadidas',
      data: counts,
      borderColor: GOLD,
      backgroundColor: 'rgba(184,134,11,0.08)',
      borderWidth: 2,
      pointBackgroundColor: GOLD,
      pointRadius: 4,
      tension: 0.4,
      fill: true
    }]
  }
})

// ── Opciones Chart.js ─────────────────────────────────────
const doughnutOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        font: { family: "'DM Sans', sans-serif", size: 12 },
        color: '#57534E',
        padding: 16,
        usePointStyle: true
      }
    }
  }
}

const barOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: "'DM Sans', sans-serif" }, color: '#57534E' }
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { font: { family: "'DM Sans', sans-serif" }, color: '#57534E', stepSize: 1 },
      beginAtZero: true
    }
  }
}

const lineOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: "'DM Sans', sans-serif" }, color: '#57534E' }
    },
    y: {
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { font: { family: "'DM Sans', sans-serif" }, color: '#57534E', stepSize: 1 },
      beginAtZero: true
    }
  }
}
</script>

<style lang="sass" scoped>

$white:      #FFFFFF
$off-white:  #F9F8F6
$bg:         #F4F2EE
$line:       #E8E4DE
$line-soft:  #F0EDE8
$text:       #1C1917
$text-mid:   #57534E
$text-muted: #A8A29E
$gold:       #B8860B
$gold-soft:  #D4A017
$red:        #991B1B
$red-bg:     #FEE2E2
$shadow-sm:  0 1px 3px rgba(28,25,23,0.06)
$shadow-md:  0 4px 16px rgba(28,25,23,0.08)
$serif: 'Playfair Display', Georgia, serif
$sans:  'DM Sans', sans-serif

*
  box-sizing: border-box
  margin: 0
  padding: 0

.pagina
  display: flex
  min-height: 100vh
  background: $bg

.sidebar
  width: 260px
  flex-shrink: 0
  background: $white
  border-right: 1px solid $line
  display: flex
  flex-direction: column
  padding: 2rem 1.5rem
  position: sticky
  top: 0
  height: 100vh

.sidebar-brand
  display: flex
  align-items: center
  gap: 1rem
  padding-bottom: 2rem
  border-bottom: 1px solid $line-soft
  margin-bottom: 2rem

.sidebar-gem
  font-size: 1.4rem
  color: $gold

.sidebar-title
  font-family: $serif
  font-size: 1rem
  font-weight: 500
  color: $text

.sidebar-role
  font-family: $sans
  font-size: .72rem
  color: $text-muted
  letter-spacing: .08rem
  text-transform: uppercase

.sidebar-nav
  display: flex
  flex-direction: column
  gap: .3rem

.nav-item
  display: flex
  align-items: center
  gap: .8rem
  padding: .7rem 1rem
  border-radius: 8px
  font-family: $sans
  font-size: .88rem
  color: $text-muted
  cursor: pointer
  text-decoration: none
  transition: background .15s, color .15s

  .nav-icon
    font-size: .9rem

  &:hover
    background: $off-white
    color: $text

  &.router-link-active
    background: $off-white
    color: $text
    font-weight: 500


.main-content
  flex: 1
  padding: 2.5rem 3rem
  overflow-y: auto
  min-width: 0


.stats-row
  display: flex
  gap: 1rem
  margin-bottom: 2.5rem

.stat-pill
  flex: 1
  background: $white
  border: 1px solid $line
  border-radius: 12px
  padding: 1.5rem 1.8rem
  display: flex
  flex-direction: column
  gap: .3rem
  transition: box-shadow .2s

  &:hover
    box-shadow: $shadow-md

  &.accent
    background: $text
    border-color: $text

    .stat-val
      color: $white

    .stat-lbl
      color: rgba(255,255,255,0.45)

.stat-val
  font-family: $serif
  font-size: 2.4rem
  font-weight: 400
  color: $text
  line-height: 1

.stat-lbl
  font-family: $sans
  font-size: .72rem
  font-weight: 500
  letter-spacing: .1rem
  text-transform: uppercase
  color: $text-muted


.charts-grid
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  gap: 1.5rem

.chart-card
  background: $white
  border: 1px solid $line
  border-radius: 16px
  padding: 1.8rem
  transition: box-shadow .2s

  &:hover
    box-shadow: $shadow-md

  &.chart-card-wide
    grid-column: span 3

.chart-head
  margin-bottom: 1.5rem

  h3
    font-family: $serif
    font-size: 1.1rem
    font-weight: 400
    color: $text
    margin-bottom: .2rem

  p
    font-family: $sans
    font-size: .78rem
    color: $text-muted

.chart-wrap
  height: 220px
  position: relative

.chart-wrap-tall
  height: 240px


@media (max-width: 1024px)
  .charts-grid
    grid-template-columns: 1fr 1fr

  .chart-card-wide
    grid-column: span 2

  .main-content
    padding: 2rem 1.5rem

*
  box-sizing: border-box
  margin: 0
  padding: 0
  max-width: 100%

.pagina
  overflow-x: hidden

.btn-menu-toggle
  display: none

@media (max-width: 768px)
  .pagina
    flex-direction: column
    overflow-x: hidden

  .sidebar
    width: 100%
    height: auto
    position: sticky
    top: 0
    z-index: 100
    background: $white
    border-right: none
    border-bottom: 1px solid $line
    padding: 1rem 1.5rem

  .sidebar-brand
    padding-bottom: 0
    border-bottom: none
    margin-bottom: 0

  .btn-menu-toggle
    display: flex
    align-items: center
    justify-content: center
    margin-left: auto
    width: 36px
    height: 36px
    background: $off-white
    border: 1px solid $line
    border-radius: 8px
    font-size: 1rem
    color: $text-mid
    cursor: pointer
    transition: all .2s
    flex-shrink: 0

    &:hover
      background: $bg
      border-color: $text-mid

  .sidebar-nav
    display: none
    flex-direction: column
    gap: .3rem
    padding-top: 1rem
    margin-top: 1rem
    border-top: 1px solid $line-soft

    &.abierto
      display: flex

  .main-content
    padding: 1rem
    width: 100%
    overflow-x: hidden

  .stats-row
    display: grid
    grid-template-columns: 1fr 1fr
    gap: .8rem
    margin-bottom: 1.5rem

  .stat-pill
    padding: 1rem 1.2rem

  .stat-val
    font-size: 1.8rem

  .charts-grid
    display: flex
    flex-direction: column
    gap: 1rem

  .chart-card
    width: 100%
    padding: 1.2rem

    &.chart-card-wide
      grid-column: unset
      width: 100%

  .chart-wrap
    height: 200px

  .chart-wrap-tall
    height: 200px
</style>