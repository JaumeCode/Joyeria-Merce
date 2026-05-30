import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritosStore = defineStore('favoritos', () => {
  
  // 1. Cargar favoritos desde localStorage de forma segura
  const cargarFavoritos = () => {
    if (import.meta.env.SSR) return []
    try {
      const datos = localStorage.getItem('favoritos')
      if (!datos) return []
      const parsed = JSON.parse(datos)
      
      // Devolvemos siempre un array limpio de strings válidos
      return Array.isArray(parsed) 
        ? parsed.map(id => String(id)).filter(id => id && id !== 'undefined') 
        : []
    } catch (e) {
      console.error('Error cargando favoritos desde localStorage:', e)
      return []
    }
  }

  // Estado reactivo global
  const ids = ref(cargarFavoritos())
  const drawerAbierto = ref(false) // Control del estado del panel

  // 2. Función interna para guardar en localStorage de forma directa
  const guardarEnLocalStorage = () => {
    if (!import.meta.env.SSR) {
      try {
        localStorage.setItem('favoritos', JSON.stringify(ids.value))
      } catch (e) {
        console.error('Error guardando favoritos en localStorage:', e)
      }
    }
  }

  // 3. Comprobación rápida convirtiendo a string
  const esFavorito = (id) => {
    if (!id || id === 'undefined') return false
    return ids.value.includes(String(id))
  }

  // 4. Activar/desactivar favoritos de forma directa e instantánea
  const toggleFavorito = (id) => {
    const idStr = String(id)
    if (!idStr || idStr === 'undefined') return
    
    if (esFavorito(idStr)) {
      // Si ya existe, lo filtramos para eliminarlo
      ids.value = ids.value.filter(i => i !== idStr)
    } else {
      // Si no existe, lo añadimos
      ids.value.push(idStr)
    }
    
    // Guardamos inmediatamente los cambios
    guardarEnLocalStorage()
  }

  return { ids, drawerAbierto, esFavorito, toggleFavorito }
})