<template>
  <img
    :src="optimizedSrc"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :loading="loading"
    :width="width"
    :height="height"
    class="optimized-image"
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
    optimizedSrc() {
      if (!this.src.includes('firebasestorage')) {
        return this.src
      }
      // Optimiza tamaño: 800px ancho + calidad 80
      const separator = this.src.includes('?') ? '&' : '?'
      return `${this.src}${separator}w=800&q=80`
    },
    srcset() {
      if (!this.src.includes('firebasestorage')) {
        return null
      }
      // Múltiples resoluciones
      const separator = this.src.includes('?') ? '&' : '?'
      return [
        `${this.src}${separator}w=400&q=80 400w`,
        `${this.src}${separator}w=800&q=80 800w`,
        `${this.src}${separator}w=1200&q=80 1200w`
      ].join(', ')
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