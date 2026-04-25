<template>
  <img
    :src="optimizedSrc"
    :srcset="srcset"
    :sizes="computedSizes"
    :alt="alt"
    :loading="loading"
    :width="width"
    :height="height"
    class="optimized-image"
    decoding="async"
    @load="$emit('load')"
    @error="$emit('error')"
  />
</template>

<script>
export default {
  name: 'OptimizedImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Imagen'
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    loading: {
      type: String,
      default: 'lazy'
    },
    sizes: {
      type: String,
      default: null
    }
  },
  emits: ['load', 'error'],
  computed: {
    isFirebaseUrl() {
      return this.src && this.src.includes('firebasestorage')
    },
    
    optimizedSrc() {
      if (!this.isFirebaseUrl) {
        return this.src
      }
      const separator = this.src.includes('?') ? '&' : '?'
      return `${this.src}${separator}w=800&q=80`
    },
    
    srcset() {
      if (!this.isFirebaseUrl) {
        return null
      }
      const separator = this.src.includes('?') ? '&' : '?'
      return [
        `${this.src}${separator}w=400&q=75 400w`,
        `${this.src}${separator}w=800&q=80 800w`,
        `${this.src}${separator}w=1200&q=85 1200w`,
        `${this.src}${separator}w=1600&q=90 1600w`
      ].join(', ')
    },
    
    computedSizes() {
      // Si el usuario proporciona sizes, usa eso
      if (this.sizes) {
        return this.sizes
      }
      
      // Si no proporciona sizes, calcula automáticamente según width
      if (this.width) {
        const w = parseInt(this.width)
        
        // Para imágenes grandes (categorías, banners)
        if (w >= 500) {
          return '(max-width: 768px) 100vw, 580px'
        }
        // Para imágenes medianas (cards)
        if (w >= 280 && w < 500) {
          return '(max-width: 768px) 85vw, 315px'
        }
        // Para imágenes pequeñas (thumbnails)
        if (w < 280) {
          return '(max-width: 768px) 100vw, 228px'
        }
      }
      
      // Default responsive
      return '(max-width: 768px) 100vw, 50vw'
    }
  }
}
</script>

<style scoped>
.optimized-image {
  display: block;
  width: 100%;
  height: auto;
}
</style>