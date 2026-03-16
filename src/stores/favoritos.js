import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoritosStore = defineStore('favoritos', () => {
  // Carga inicial desde localStorage
    const ids = ref(
        JSON.parse(localStorage.getItem('favoritos') || '[]').filter(Boolean)
    )

  // Sincroniza automáticamente cada vez que cambia ids
    watch(ids, (nuevos) => {
        localStorage.setItem('favoritos', JSON.stringify(nuevos))
    }, { deep: true })

    const esFavorito = (id) => ids.value.includes(id)

    const toggleFavorito = (id) => {
        if (!id) return  // ← ignora clicks sin id
        console.log('toggle id:', id)
        if (esFavorito(id)) {
            ids.value = ids.value.filter(i => i !== id)
        } else {
            ids.value = [...ids.value, id]
        }
    }

    return { ids, esFavorito, toggleFavorito }
})