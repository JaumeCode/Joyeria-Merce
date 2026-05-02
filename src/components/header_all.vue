<template>
  <header class="header">

    <button class="btn_favoritos" @click="favStore.drawerAbierto = !favStore.drawerAbierto">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      <span class="badge" v-if="totalFavoritos > 0">{{ totalFavoritos }}</span>
    </button>

    <!-- Botón hamburguesa (solo móvil) -->
    <button class="burger" :class="{ open: menuAbierto }" @click="menuAbierto = !menuAbierto">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Menú desktop -->
    <div class="menus">

      <nav class="nav">
        <a href="/">Inicio</a>
        <a href="/joyas/anillos">Anillos</a>
        <a href="/joyas/pendientes">Pendientes</a>
        <a href="/joyas/pulseras">Pulseras</a>
        
      </nav>

      <nav class="nav">
        <a href="/joyas/cadenas">Cadenas</a>
        <div class="dropdown">
          <span class="dropdown-trigger">Material</span>

          <div class="dropdown-menu">
            <a href="/joyas/oro">Oro</a>
            <a href="/joyas/plata">Plata</a>
            <a href="/joyas/acero">Acero</a>
          </div>
        </div>
        <div class="dropdown">
          <span class="dropdown-trigger">Ubicacion y Nostros</span>

          <div class="dropdown-menu">
            <a href="/ubicacion">Ubicación / Horarios</a>
            <a href="/sobre-nosotros">Sobre Nosotros</a>
          </div>
        </div>
        
      </nav>

    </div>

    <!-- Menú mobile -->
    <div class="mobile-menu" :class="{ open: menuAbierto }">
      <div class="mobile-menu-inner">
        <div class="mobile-ornament">✦</div>
        <a href="/"           class="mobile-link" @click="menuAbierto = false">Inicio</a>
        <a href="/joyas/anillos"    class="mobile-link" @click="menuAbierto = false">Anillos</a>
        <a href="/joyas/pendientes" class="mobile-link" @click="menuAbierto = false">Pendientes</a>
        <a href="/joyas/pulseras"   class="mobile-link" @click="menuAbierto = false">Pulseras</a>
        <a href="/joyas/colgantes"  class="mobile-link" @click="menuAbierto = false">Colgantes</a>
        <a href="/joyas/cadenas"    class="mobile-link" @click="menuAbierto = false">Cadenas</a>
        <a href="/ubicacion"  class="mobile-link" @click="menuAbierto = false">Ubicación / Horarios</a>
        <a href="/sobre-nosotros" class="mobile-link" @click="menuAbierto = false">Sobre Nosotros</a>
        <div class="mobile-materials-label">✦ MATERIALES</div>
        <a href="/joyas/oro"   class="mobile-link mobile-link--material" @click="menuAbierto = false">Oro</a>
        <a href="/joyas/plata" class="mobile-link mobile-link--material" @click="menuAbierto = false">Plata</a>
        <a href="/joyas/acero" class="mobile-link mobile-link--material" @click="menuAbierto = false">Acero</a>
      </div>
    </div>

    <!-- Logo -->
    <div class="logo" @click="router.push('/')">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2FLogo-Tienda.webp?alt=media&token=d4af9462-6814-4dbf-ad5d-50aa35ef4cef"
        alt="Logo Joyería"
        fetchpriority="high"
      >
    </div>

  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useFavoritosStore } from '@/stores/favoritos'
import { computed } from 'vue'
import { useJoyasPublicasStore } from '@/stores/joyas'
import { useRouter } from 'vue-router'

const router = useRouter()
const joyasStore = useJoyasPublicasStore()
const menuAbierto = ref(false)
const favStore = useFavoritosStore()

const totalFavoritos = computed(() =>
  favStore.ids.filter(id => joyasStore.todas.some(j => j.id === id)).length
)
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Playfair+Display:ital,wght@0,400;1,400&display=swap')

$color-fondo:     #F4F0E8
$color-texto:     #1A1A1A
$color-oro:       #C9A55A
$serif: 'Playfair Display', Georgia, serif
$sans:  'DM Sans', sans-serif

// ── Header ────────────────────────────────────────────────
.header
  position: relative
  display: flex
  justify-content: center
  align-items: center
  padding: 20px 40px
  background-color: $color-fondo
  font-family: $sans

// ── Favoritos ─────────────────────────────────────────────
.btn_favoritos
  position: absolute
  left: 20px
  top: 55%
  transform: translateY(-50%)
  width: 38px
  height: 38px
  border-radius: 50%
  border: 1px solid rgba(0,0,0,0.12)
  background: transparent
  display: flex
  align-items: center
  justify-content: center
  cursor: pointer
  color: $color-texto
  transition: all 0.25s ease
  z-index: 100

  &:hover
    background: rgba(0,0,0,0.05)

  .badge
    position: absolute
    top: -4px
    right: -4px
    background: #1a1a1a
    color: #EDE9D8
    font-size: 0.6rem
    font-weight: 600
    width: 16px
    height: 16px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center

// ── Menú desktop ──────────────────────────────────────────
.menus
  display: flex
  gap: 16rem

.nav
  display: flex
  gap: 2.2rem
  cursor: pointer
  align-items: center 

  a
    text-decoration: none
    color: $color-texto
    font-family: $sans
    font-size: 0.7rem
    font-weight: 500
    letter-spacing: 0.12rem
    text-transform: uppercase
    position: relative
    transition: color 0.25s ease

    &:hover
      color: $color-oro

    &::after
      content: ''
      position: absolute
      left: 0
      bottom: -4px
      width: 0%
      height: 1px
      background-color: $color-oro
      transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1)

    &:hover::after
      width: 100%
// ── Dropdown ─────────────────────────────────────────────
.dropdown
  position: relative

.dropdown-trigger
  display: inline-block
  text-decoration: none
  color: $color-texto
  font-family: $sans
  font-size: 0.7rem
  font-weight: 500
  letter-spacing: 0.12rem
  text-transform: uppercase
  position: relative
  cursor: pointer
  transition: color 0.25s ease
  

  &:hover
    color: $color-oro

  &::after
    content: ''
    position: absolute
    left: 0
    bottom: -4px
    width: 0%
    height: 1px
    background-color: $color-oro
    transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1)

  &:hover::after
    width: 100%

.dropdown-menu
  position: absolute
  top: 120%
  left: 50%
  transform: translateX(-50%) translateY(10px)
  background: white
  border-radius: 12px
  box-shadow: 0 10px 30px rgba(0,0,0,0.08)
  padding: 0.8rem 0
  display: flex
  flex-direction: column
  min-width: 140px
  opacity: 0
  pointer-events: none
  transition: all 0.25s ease

  a
    padding: 0.6rem 1rem
    text-decoration: none
    color: $color-texto
    font-size: 0.7rem
    letter-spacing: 0.1rem
    text-transform: uppercase
    transition: background 0.2s, color 0.2s

    &:hover
      background: rgba(201, 165, 90, 0.08)
      color: $color-oro

// Hover effect
.dropdown:hover .dropdown-menu
  opacity: 1
  pointer-events: auto
  transform: translateX(-50%) translateY(0)
// ── Logo ──────────────────────────────────────────────────
.logo
  position: absolute
  left: 50%
  bottom: -42px
  transform: translateX(-50%)
  background-color: $color-fondo
  border-radius: 100%
  z-index: 3
  cursor: pointer
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)

  &:hover
    transform: translateX(-50%) translateY(-4px)

  img
    height: 7rem
    display: block

// ── Burger ────────────────────────────────────────────────
.burger
  display: none
  position: absolute
  top: 50%
  right: 20px
  transform: translateY(-50%)
  background: none
  border: none
  cursor: pointer
  z-index: 200
  width: 36px
  height: 36px
  flex-direction: column
  justify-content: center
  align-items: center
  gap: 5px
  padding: 0

  span
    display: block
    width: 22px
    height: 1.5px
    background-color: $color-texto
    border-radius: 2px
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease
    transform-origin: center

    &:nth-child(2)
      width: 15px
      margin-left: auto

  &.open
    span:nth-child(1)
      transform: translateY(6.5px) rotate(45deg)
      width: 22px

    span:nth-child(2)
      opacity: 0
      transform: scaleX(0)

    span:nth-child(3)
      transform: translateY(-6.5px) rotate(-45deg)
      width: 22px

// ── Mobile menu ───────────────────────────────────────────
.mobile-menu
  display: none
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(244, 240, 232, 0.98)
  backdrop-filter: blur(20px)
  -webkit-backdrop-filter: blur(20px)
  z-index: 150
  transform: translateX(100%)
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)

  &.open
    transform: translateX(0)

    .mobile-link
      animation: mobileLinkIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both

      @for $i from 1 through 10
        &:nth-child(#{$i + 1})
          animation-delay: #{$i * 0.05}s

.mobile-menu-inner
  height: 100%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 0.2rem
  padding: 4rem 2rem

.mobile-ornament
  font-size: 0.9rem
  color: $color-oro
  margin-bottom: 1rem
  animation: ornamentPulse 3s ease-in-out infinite

.mobile-materials-label
  width: 100%
  text-align: center
  font-size: 0.65rem
  letter-spacing: 0.2rem
  text-transform: uppercase
  color: $color-oro
  font-weight: 600
  margin: 1.2rem 0 0.8rem 0
  padding-top: 1rem
  border-top: 1px solid rgba(201, 165, 90, 0.2)
  opacity: 0
  animation: mobileLinkIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both
  animation-delay: 0.5s

.mobile-link
  width: 100%
  max-width: 280px
  padding: 0.9rem 1.5rem
  text-align: center
  font-family: $sans
  font-size: 0.7rem
  font-weight: 500
  letter-spacing: 0.16rem
  text-transform: uppercase
  color: $color-texto
  text-decoration: none
  border-radius: 8px
  transition: background 0.2s, color 0.2s, letter-spacing 0.2s
  opacity: 0

  &:hover
    background: rgba(201, 165, 90, 0.08)
    color: $color-oro
    letter-spacing: 0.2rem

  &--material
    font-family: $sans
    font-size: 0.8rem
    letter-spacing: 0.12rem
    text-transform: uppercase
    font-weight: 600
    color: $color-oro
    padding: 0.75rem 1.5rem
    border: 1px solid rgba(201, 165, 90, 0.3)
    border-radius: 6px
    background: rgba(201, 165, 90, 0.05)
    margin-top: 0.5rem

    &:hover
      background: rgba(201, 165, 90, 0.15)
      border-color: rgba(201, 165, 90, 0.6)

// ── Keyframes ─────────────────────────────────────────────
@keyframes mobileLinkIn
  from
    opacity: 0
    transform: translateY(10px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes ornamentPulse
  0%, 100%
    opacity: 0.5
    transform: scale(1)
  50%
    opacity: 1
    transform: scale(1.2)

// ── Responsive ────────────────────────────────────────────
@media (max-width: 768px)
  .header
    padding: 30px 40px

  .burger
    display: flex

  .menus
    display: none

  .mobile-menu
    display: block
</style>