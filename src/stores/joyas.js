// src/stores/joyasPublicas.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db, storage } from '@/firebase/main'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'

export const useJoyasPublicasStore = defineStore('joyasPublicas', () => {
    // Estado
    const todas = ref([])
    const disponibles = ref([])
    const destacadas = ref([])
    

    // Acción para cargar joyas
    const obtener_joya = async () => {
        
        try {
        const favRef = collection(db, "joyas")
        const snap = await getDocs(favRef)

        const todasJoyas = await Promise.all(
            snap.docs.map(async (docu) => {
            const data = docu.data()

            const urls = await Promise.all(
                (data.imagenes || []).map(async (ruta) => {
                if (!ruta) return ""
                return await getDownloadURL(storageRef(storage, ruta))
                })
            )

            return {
                id: docu.id,
                ...data,
                imagenes: urls // Lista de URLS del STORAGE
            }
            })
        )

        // Asignar listas
        todas.value = todasJoyas
        disponibles.value = todasJoyas.filter(j => j.disponible)
        destacadas.value = todasJoyas.filter(j => j.disponible && j.destacado)

        } catch (error) {
        console.error('Error al cargar joyas:', error)
        }

    }

    

    return { todas, disponibles, destacadas, obtener_joya }
})