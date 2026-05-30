// src/stores/joyasPublicas.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  getDoc
} from 'firebase/firestore'
import { db } from '@/firebase/main'
import { obtener_joya as obtenerJoyasFirebase } from '@/functions_firebase/profile'

export const useJoyasPublicasStore = defineStore('joyasPublicas', () => {

    const destacadas = ref([])
    const novedades = ref([])
    const todas = ref([])
    const todasLasJoyas = ref([]) // NEW: Todas sin límite
    
    // Por sección y material (caché combinada)
    const joyasPorFiltro = ref({})
    const filtroActual = ref({ tipo: null, material: null })
    const paginaActual = ref({})
    const cargandoFiltro = ref(false)

    const cargadasTodas = ref(false)
    const cargadasTodasSinLimite = ref(false) // NEW

    const mapDocs = (snap) =>
        snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

    // Generar clave de caché para filtros
    const generarClaveCache = (tipo, material) => {
        const t = tipo || '*'
        const m = material || '*'
        return `${t}_${m}`
    }

    // HOME: solo lo necesario
    const cargarHome = async () => {
        await Promise.all([
            cargarDestacadas(),
            cargarNovedades()
        ])
    }

    // DESTACADAS
    const cargarDestacadas = async () => {
        const q = query(
            collection(db, "joyas"),
            where("destacado", "==", true),
            limit(6)
        )

        const snap = await getDocs(q)
        destacadas.value = mapDocs(snap)
    }

    // NOVEDADES
    const cargarNovedades = async () => {
        const q = query(
            collection(db, "joyas"),
            orderBy("fecha_creacion", "desc"),
            limit(6)
        )

        const snap = await getDocs(q)
        novedades.value = mapDocs(snap)
    }

    //  TODAS (lazy load + límite)
    const cargarTodas = async () => {

        // evita recargar cada vez
        if (cargadasTodas.value) return

        const q = query(
            collection(db, "joyas"),
            orderBy("fecha_creacion", "desc"),
            limit(20) // 🔥 importante: NO todo
        )

        const snap = await getDocs(q)
        todas.value = mapDocs(snap)

        cargadasTodas.value = true
    }

    // OBTENER TODAS LAS JOYAS (para catálogo)
    const obtener_joya = async () => {
        if (cargadasTodasSinLimite.value && todasLasJoyas.value.length > 0) return { ok: true, favs: todasLasJoyas.value }
        
        const resultado = await obtenerJoyasFirebase()
        if (resultado.ok) {
            todasLasJoyas.value = resultado.favs || []
            cargadasTodasSinLimite.value = true
        }
        return resultado
    }

    // CARGAR CON FILTROS (tipo y/o material) + PAGINACIÓN
    const cargarJoyasPorFiltro = async (tipo = null, material = null, pagina = 1, itemsPorPagina = 12) => {
        try {
            cargandoFiltro.value = true
            filtroActual.value = { tipo, material }

            const clave = generarClaveCache(tipo, material)
            const offset = (pagina - 1) * itemsPorPagina

            // Primera carga: obtener todas y guardar en caché
            if (!joyasPorFiltro.value[clave]) {
                const resultado = await obtenerJoyasFirebase()
                
                if (!resultado.ok) {
                    console.error('Error al obtener joyas')
                    cargandoFiltro.value = false
                    return
                }

                let joyas = resultado.favs || []

                // Filtrar por tipo si está especificado
                if (tipo) {
                    joyas = joyas.filter(j => j.tipo?.toLowerCase() === tipo.toLowerCase())
                }

                // Filtrar por material si está especificado
                if (material) {
                    joyas = joyas.filter(j => j.material?.toLowerCase() === material.toLowerCase())
                }

                // Ordenar por fecha de creación (más recientes primero)
                joyas.sort((a, b) => {
                    const fechaA = a.fecha_creacion || 0
                    const fechaB = b.fecha_creacion || 0
                    return fechaB - fechaA
                })

                joyasPorFiltro.value[clave] = joyas
            }

            // Aplicar paginación
            const joyas = joyasPorFiltro.value[clave]
            todas.value = joyas.slice(offset, offset + itemsPorPagina)
            paginaActual.value[clave] = pagina

        } catch (error) {
            console.error('Error cargando con filtros:', error)
        } finally {
            cargandoFiltro.value = false
        }
    }

    // CARGAR MÁS (Infinite Scroll)
    const cargarMasConFiltro = async (tipo = null, material = null) => {
        const clave = generarClaveCache(tipo, material)
        const paginaActualVal = paginaActual.value[clave] || 1
        await cargarJoyasPorFiltro(tipo, material, paginaActualVal + 1)
    }

    // OBTENER TOTAL CON FILTROS
    const obtenerTotal = (tipo = null, material = null) => {
        const clave = generarClaveCache(tipo, material)
        return joyasPorFiltro.value[clave]?.length || 0
    }

    // CARGAR JOYAS EN FAVORITOS (solo por IDs)
    const cargarJoyasPorIds = async (ids) => {
        if (!ids || ids.length === 0) return []
        
        try {
            const joyas = []
            
            // Usar getDoc para cada ID (el ID es el document ID, no un campo)
            for (const id of ids) {
                try {
                    const docRef = doc(db, "joyas", String(id))
                    const docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        joyas.push({
                            id: docSnap.id,
                            ...docSnap.data()
                        })
                    }
                } catch (e) {
                    console.error(`Error cargando joya con ID ${id}:`, e)
                }
            }
            
            return joyas
        } catch (error) {
            console.error('Error cargando joyas por IDs:', error)
            return []
        }
    }



    return {
        destacadas,
        novedades,
        todas,
        todasLasJoyas,
        joyasPorFiltro,
        filtroActual,
        cargandoFiltro,
        paginaActual,

        cargarHome,
        cargarDestacadas,
        cargarNovedades,
        cargarTodas,
        cargarJoyasPorFiltro,
        cargarMasConFiltro,
        obtenerTotal,
        generarClaveCache,
        obtener_joya,
        cargarJoyasPorIds
    }
})