import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoritosStore = defineStore('favoritos', () => {
  const ids = ref(
    import.meta.env.SSR
      ? []
      : JSON.parse(localStorage.getItem('favoritos') || '[]').filter(Boolean)
  )

  watch(ids, (nuevos) => {
    if (!import.meta.env.SSR) {
      localStorage.setItem('favoritos', JSON.stringify(nuevos))
    }
  }, { deep: true })

  const esFavorito = (id) => ids.value.includes(id)

  const toggleFavorito = (id) => {
    if (!id) return
    if (esFavorito(id)) {
      ids.value = ids.value.filter(i => i !== id)
    } else {
      ids.value = [...ids.value, id]
    }
  }

  return { ids, esFavorito, toggleFavorito }
})