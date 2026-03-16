<template>
  <RouterView></RouterView>
  <FavoritosDrawer />
  
    
  <cookie /> 
  
</template>

<script setup>
import { RouterView } from 'vue-router'
import FavoritosDrawer from '@/components/FavoritosDrawer.vue'
import cookie from './components/cookie.vue';
</script>

<style lang="sass">
*
  margin: 0
  box-sizing: border-box
  padding: 0
  font-family: 'Montserrat', sans-serif
</style>