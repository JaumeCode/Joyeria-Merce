<!-- views/Ubicacion.vue -->
<template>
  <div class="pagina">
    <header_all />

    <section class="ubicacion">

      <div class="ubicacion-header">
        <div class="deco-line"></div>
        <p class="eyebrow">Encuéntranos</p>
        <h2 class="titulo">Visítanos</h2>
        <div class="deco-line"></div>
      </div>

      <div class="ubicacion-body">

        <div class="mapa-wrapper">
          <iframe
            class="mapa-iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3083.2!2d-0.2180415!3d39.6591293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6057408e0%3A0xc0e49448!2sJoyer%C3%ADa%20Merc%C3%A9%2C%20Carrer%20del%20Trovador%2C%2067%2C%2046520%20Puerto%20de%20Sagunto!5e0!3m2!1ses!2ses"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div class="mapa-overlay">
            <button class="btn-abrir-mapa" @click="abrirMapa">
              <span class="btn-icon">↗</span>
              Abrir en Google Maps
            </button>
          </div>
        </div>

        <div class="info-panel">

          <div class="info-card">
            <div class="info-gem">✦</div>
            <h3 class="info-nombre">Joyería Mercè</h3>
            <p class="info-rating">
              <span class="estrellas">★★★★★</span>
              <span class="rating-num">5.0</span>
              <span class="rating-count">(21 reseñas)</span>
            </p>
          </div>

          <div class="info-bloque">

            <div class="info-fila">
              <span class="info-icono">📍</span>
              <div>
                <p class="info-label">Dirección</p>
                <p class="info-valor">Carrer del Trovador, 67</p>
                <p class="info-valor">46520 Puerto de Sagunto, Valencia</p>
              </div>
            </div>

            <div class="separador-fila"></div>

            <div class="info-fila">
              <span class="info-icono">📞</span>
              <div>
                <p class="info-label">Teléfono</p>
                <p class="info-valor info-link" @click="llamar">+34 962 67 87 34</p>
              </div>
            </div>

            <div class="separador-fila"></div>

            <div class="info-fila">
              <span class="info-icono">🕐</span>
              <div class="horario-wrap">
                <p class="info-label">Horario</p>
                <div class="horario-grid">
                  <div
                    v-for="dia in horario"
                    :key="dia.nombre"
                    class="horario-fila"
                    :class="{ hoy: dia.esHoy, cerrado: dia.cerrado }"
                  >
                    <span class="dia-nombre">{{ dia.nombre }}</span>
                    <span class="dia-horas">{{ dia.horas }}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <button class="btn-como-llegar" @click="abrirMapa">
            Cómo llegar
          </button>

        </div>
      </div>
    </section>

    <footer_component />
  </div>
</template>

<script setup>
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'
import { useHead } from '@vueuse/head'
//Para Seo
useHead({
  title: 'Dónde Estamos — Joyería Mercè · Puerto de Sagunto',
  meta: [
    { name: 'description', content: 'Visítanos en Carrer del Trovador 67, Puerto de Sagunto, Valencia. Abierto de lunes a viernes de 10:00 a 13:30 y de 17:30 a 20:00. Sábados de 10:00 a 14:00. Tel: 962 67 87 34.' },
    { property: 'og:title', content: 'Dónde Estamos — Joyería Mercè' },
    { property: 'og:description', content: 'Carrer del Trovador 67, Puerto de Sagunto, Valencia. Tel: 962678734.' },
    { property: 'og:type', content: 'website' },
  ]
})

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const hoyIndex = new Date().getDay()

const horario = [
  { nombre: 'Lunes',     horas: '10:00 – 13:30 / 17:30 – 20:00', cerrado: false },
  { nombre: 'Martes',    horas: '10:00 – 13:30 / 17:30 – 20:00', cerrado: false },
  { nombre: 'Miércoles', horas: '10:00 – 13:30 / 17:30 – 20:00', cerrado: false },
  { nombre: 'Jueves',    horas: '10:00 – 13:30 / 17:30 – 20:00', cerrado: false },
  { nombre: 'Viernes',   horas: '10:00 – 13:30 / 17:30 – 20:00', cerrado: false },
  { nombre: 'Sábado',    horas: '10:00 – 14:00',                  cerrado: false },
  { nombre: 'Domingo',   horas: 'Cerrado',                         cerrado: true  },
].map(dia => ({
  ...dia,
  esHoy: diasSemana[hoyIndex] === dia.nombre
}))

const abrirMapa = () => {
  window.open('https://maps.app.goo.gl/657WkNQ8XZuNJeYX8', '_blank')
}

const llamar = () => {
  window.location.href = 'tel:+34962678734'
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500&display=swap')

$cream:      #faf8f5
$white:      #ffffff
$gold:       #c9a84c
$gold-dark:  #a07c30
$text:       #2a2520
$text-mid:   #5a5550
$text-muted: #7a7570
$text-soft:  #b8b0a8
$line:       #e8e2d8
$line-soft:  #f0ece4
$serif:      'Cormorant Garamond', serif
$sans:       'Montserrat', sans-serif

.pagina
  min-height: 100vh
  background: $cream

.ubicacion
  padding: 8rem 2rem 5rem

.ubicacion-header
  text-align: center
  display: flex
  flex-direction: column
  align-items: center
  gap: 0.8rem
  margin-bottom: 3.5rem

.deco-line
  width: 80px
  height: 1px
  background: linear-gradient(90deg, transparent, $gold, transparent)

.eyebrow
  font-family: $sans
  font-size: 0.65rem
  letter-spacing: 0.35em
  text-transform: uppercase
  color: $gold-dark
  margin: 0

.titulo
  font-family: $serif
  font-size: clamp(2rem, 4vw, 2.8rem)
  font-weight: 300
  color: $text
  margin: 0
  letter-spacing: 0.05em

// ── Layout ──────────────────────────────────────────────
.ubicacion-body
  max-width: 1100px
  margin: 0 auto
  display: grid
  grid-template-columns: 1fr 400px
  gap: 2rem
  align-items: start

// ── Mapa ────────────────────────────────────────────────
.mapa-wrapper
  position: relative
  border-radius: 20px
  overflow: hidden
  box-shadow: 0 12px 48px rgba(0,0,0,0.1)
  height: 540px

.mapa-iframe
  width: 100%
  height: 100%
  border: none
  display: block

.mapa-overlay
  position: absolute
  bottom: 1.2rem
  left: 50%
  transform: translateX(-50%)

.btn-abrir-mapa
  display: flex
  align-items: center
  gap: 0.5rem
  background: rgba(255,255,255,0.95)
  color: $text
  border: none
  cursor: pointer
  padding: 0.65rem 1.4rem
  border-radius: 999px
  font-family: $sans
  font-size: 0.72rem
  font-weight: 500
  letter-spacing: 0.08em
  box-shadow: 0 4px 20px rgba(0,0,0,0.15)
  transition: all 0.25s ease
  white-space: nowrap

  &:hover
    background: $white
    box-shadow: 0 6px 28px rgba(0,0,0,0.2)
    transform: translateY(-1px)

  .btn-icon
    color: $gold-dark

// ── Panel info ──────────────────────────────────────────
.info-panel
  display: flex
  flex-direction: column
  gap: 1.2rem

.info-card
  background: $white
  border: 1px solid $line
  border-radius: 16px
  padding: 1.8rem
  text-align: center

.info-gem
  color: $gold
  font-size: 1rem
  margin-bottom: 0.5rem
  opacity: 0.7

.info-nombre
  font-family: $serif
  font-size: 1.7rem
  font-weight: 400
  color: $text
  margin: 0 0 0.6rem
  letter-spacing: 0.03em

.info-rating
  display: flex
  align-items: center
  justify-content: center
  gap: 0.4rem
  margin: 0

.estrellas
  color: $gold
  font-size: 0.85rem
  letter-spacing: 0.05em

.rating-num
  font-family: $sans
  font-size: 0.82rem
  font-weight: 500
  color: $text

.rating-count
  font-family: $sans
  font-size: 0.75rem
  color: $text-soft

// ── Bloque datos ────────────────────────────────────────
.info-bloque
  background: $white
  border: 1px solid $line
  border-radius: 16px
  padding: 1.8rem
  display: flex
  flex-direction: column
  gap: 1.2rem

.separador-fila
  height: 1px
  background: $line-soft

.info-fila
  display: flex
  gap: 1rem
  align-items: flex-start

.info-icono
  font-size: 1rem
  flex-shrink: 0
  margin-top: 0.1rem

.info-label
  font-family: $sans
  font-size: 0.6rem
  letter-spacing: 0.18em
  text-transform: uppercase
  color: $gold-dark
  margin: 0 0 0.35rem

.info-valor
  font-family: $sans
  font-size: 0.8rem
  color: $text-mid
  margin: 0
  line-height: 1.7

.info-link
  cursor: pointer
  border-bottom: 1px solid rgba(160,124,48,0.3)
  display: inline-block
  transition: color 0.2s, border-color 0.2s

  &:hover
    color: $gold-dark
    border-color: $gold-dark

// ── Horario ─────────────────────────────────────────────
.horario-wrap
  flex: 1

.horario-grid
  display: flex
  flex-direction: column
  gap: 0.2rem
  margin-top: 0.2rem

.horario-fila
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0.32rem 0.6rem
  border-radius: 6px
  transition: background 0.15s

  &.hoy
    background: rgba(201,168,76,0.1)

    .dia-nombre,
    .dia-horas
      color: $gold-dark
      font-weight: 500

  &.cerrado
    .dia-nombre,
    .dia-horas
      color: $text-soft

.dia-nombre
  font-family: $sans
  font-size: 0.73rem
  color: $text-muted
  min-width: 85px

.dia-horas
  font-family: $sans
  font-size: 0.7rem
  color: $text-mid
  text-align: right

// ── Botón llegar ────────────────────────────────────────
.btn-como-llegar
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  padding: 0.9rem 2rem
  background: $text
  color: $cream
  border: none
  cursor: pointer
  border-radius: 8px
  font-family: $sans
  font-size: 0.72rem
  font-weight: 500
  letter-spacing: 0.18em
  text-transform: uppercase
  transition: background 0.2s, transform 0.2s

  &:hover
    background: #3a3530
    transform: translateY(-1px)

// ── Mobile ──────────────────────────────────────────────
@media (max-width: 768px)
  .ubicacion
    padding: 6rem 1rem 3rem

  .ubicacion-body
    grid-template-columns: 1fr

  .mapa-wrapper
    height: 300px
    border-radius: 14px

  .info-bloque
    padding: 1.4rem

  .info-card
    padding: 1.4rem

  .dia-nombre
    min-width: 70px

  .dia-horas
    font-size: 0.65rem
</style>