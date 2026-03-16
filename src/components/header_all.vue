<template>
  <header class="header">

    <button class="btn_favoritos" @click="favStore.drawerAbierto = true">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      <span class="badge" v-if="totalFavoritos > 0">{{ totalFavoritos }}</span>
    </button>
    <!-- 🍔 Botón hamburguesa (solo móvil) -->
    <button class="burger" @click="menuAbierto = !menuAbierto">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <!-- Menú (desktop y mobile) -->
    <div class="menus" :class="{ abierto: menuAbierto }">
      
      <nav class="nav">
        <a href="/home">Inicio</a>
        <a href="/ubicacion">Ubicación  /  Horarios</a>
        
      </nav>

      <nav class="nav">
        <a @click="router.push('/catalogo?material=oro')">Oro</a>
        <a @click="router.push('/catalogo?material=plata')">Plata</a>
        <a @click="router.push('/catalogo?material=acero')">Acero</a>
      </nav>
    </div>

    <!-- Logo -->
    <div class="logo">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2FLogo%20Tienda.png?alt=media&token=bce2532e-a646-4570-92a5-fb00a541fc79"
        alt="Logo Joyería"
      >
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useFavoritosStore } from '@/stores/favoritos'
import { computed } from 'vue';
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

$color-fondo: #F4F0E8
$color-texto: black
$color-oro: #d4af37
$fuente-principal: 'Segoe UI', sans-serif

.header
  position: relative
  display: flex
  justify-content: center
  align-items: center
  padding: 20px 40px
  background-color: $color-fondo
  font-family: $fuente-principal
  
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
  color: black
  transition: all 0.25s ease
  z-index: 1000000

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
.menus
  display: flex
  gap: 16rem

.nav
  display: flex
  gap: 3rem
  cursor: pointer

  a
    text-decoration: none
    color: $color-texto
    font-size: 1rem
    position: relative

    &:hover
      color: $color-oro

    &::after
      content: ''
      position: absolute
      left: 0
      bottom: -4px
      width: 0%
      height: 2px
      background-color: $color-oro
      transition: width 0.3s ease

    &:hover::after
      width: 100%

.logo
  position: absolute
  left: 50%
  bottom: -42px
  transform: translateX(-50%)
  background-color: $color-fondo
  border-radius: 100%
  z-index: 3

  img
    height: 7rem
    display: block

/* 🍔 BOTÓN HAMBURGUESA */
.burger
  display: none
  position: absolute
  top: 20px
  right: 20px
  background: none
  border: none
  cursor: pointer
  z-index: 5

  span
    display: block
    width: 25px
    height: 3px
    background-color: $color-texto
    margin: 5px 0

/* 📱 MOBILE */
/* 📱 MOBILE */
@media (max-width: 768px)
  .header
    padding: 30px 40px

  .burger
    display: block

  .menus
    position: absolute
    top: 110%
    right: 20px
    width: 220px
    background-color: $color-fondo
    flex-direction: column
    align-items: center
    gap: 25px
    padding: 25px 20px
    border-radius: 16px
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15)
    opacity: 0
    transform: translateY(-10px)
    pointer-events: none
    transition: all 0.35s ease
    z-index: 4

    &.abierto
      opacity: 1
      transform: translateY(0)
      pointer-events: auto

  .nav
    flex-direction: column
    align-items: center
    gap: 18px

    a
      font-size: 1.05rem
      font-weight: 500
      padding: 6px 0
      width: 100%
      text-align: center

      &:hover
        color: $color-oro

  

</style>