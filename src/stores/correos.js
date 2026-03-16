import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { db } from "@/firebase/main"

export const useCorreosStore = defineStore('correos', () => {

    const correos = ref([])
    const correo = ref("")

    const guardar_correo = async () => {
        try {
            const ref_correos = collection(db, "correos")
            
            // Comprobar si ya existe
            const q = query(ref_correos, where("correo", "==", correo.value))
            const snap = await getDocs(q)

            if (!snap.empty) {
                return { ok: false, motivo: "ya_existe" }
            }

            await addDoc(ref_correos, {
                correo: correo.value,
                fecha_creacion: Date.now()
            })
            return { ok: true }

        } catch (error) {
            console.error('Error guardando correo:', error)
            return { ok: false, motivo: "error" }
        }
    }
    const eliminar_correo = async (id) => {
        try {
            await deleteDoc(doc(db, "correos", id))
            return { ok: true }
        } catch (error) {
            console.error('Error eliminando correo:', error)
            return { ok: false }
        }
    }
    const obtener_correos = async () => {
        try {
            const favRef = collection(db, "correos")
            const snap = await getDocs(favRef)
            correos.value = snap.docs.map((docu) => ({
                id: docu.id,
                ...docu.data()
            }))
            return { ok: true }
        } catch (error) {
            console.error('Error obteniendo correos:', error)
            return { ok: false }
        }
    }

    return { correo, correos, guardar_correo, obtener_correos, eliminar_correo }
})