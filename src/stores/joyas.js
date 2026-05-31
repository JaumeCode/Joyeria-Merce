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
    const destacadas        = ref([])

    const novedades         = ref([])

    const todas             = ref([])

    const todasLasJoyas     = ref([])

    const joyasPorFiltro    = ref({})

    const filtroActual      = ref({ tipo: null, material: null })

    const paginaActual      = ref({})

    const cargandoFiltro    = ref(false)

    const cargadasTodas            = ref(false)

    const cargadasTodasSinLimite   = ref(false)

    let   fetchEnCurso             = null

    const mapDocs = (snap) =>
        snap.docs.map(d => ({ id: d.id, ...d.data() }))

    const generarClaveCache = (tipo, material) =>
        `${tipo || '*'}_${material || '*'}`

    const fetchTodasSiNecesario = async () => {
        if (cargadasTodasSinLimite.value && todasLasJoyas.value.length > 0) {
            return { ok: true, favs: todasLasJoyas.value }
        }
        if (fetchEnCurso) return fetchEnCurso
        fetchEnCurso = obtenerJoyasFirebase().then(resultado => {
            if (resultado.ok) {
                todasLasJoyas.value          = resultado.favs || []
                cargadasTodasSinLimite.value = true
            }
            fetchEnCurso = null
            return resultado
        }).catch(e => {
            fetchEnCurso = null
            throw e
        })

        return fetchEnCurso
    }

    const cargarHome = async () => {
        await Promise.all([cargarDestacadas(), cargarNovedades()])
    }

    const cargarDestacadas = async () => {
        if (destacadas.value.length > 0) return

        const q    = query(collection(db, "joyas"), where("destacado", "==", true), limit(6))

        const snap = await getDocs(q)
        destacadas.value = mapDocs(snap)
    }

    const cargarNovedades = async () => {
        if (novedades.value.length > 0) return

        const q    = query(collection(db, "joyas"), orderBy("fecha_creacion", "desc"), limit(6))

        const snap = await getDocs(q)
        novedades.value = mapDocs(snap)
    }

    const cargarTodas20 = async () => {
        if (cargadasTodas.value) return
        if (todasLasJoyas.value.length > 0) {
            todas.value      = todasLasJoyas.value.slice(0, 20)
            cargadasTodas.value = true
            return
        }

        const q    = query(collection(db, "joyas"), orderBy("fecha_creacion", "desc"), limit(20))

        const snap = await getDocs(q)
        todas.value         = mapDocs(snap)
        cargadasTodas.value = true
    }

    const cargarTodas = cargarTodas20

    const obtener_joya = async () => {
        return fetchTodasSiNecesario()
    }

    const cargarJoyasPorFiltro = async (tipo = null, material = null, pagina = 1, itemsPorPagina = 12) => {
        try {
            cargandoFiltro.value = true
            filtroActual.value   = { tipo, material }

            const clave  = generarClaveCache(tipo, material)

            const offset = (pagina - 1) * itemsPorPagina
            if (!joyasPorFiltro.value[clave]) {
                const resultado = await fetchTodasSiNecesario()
                if (!resultado.ok) {
                    console.error('Error al obtener joyas')
                    return
                }

                let joyas = [...(resultado.favs || [])]
                if (tipo)     joyas = joyas.filter(j => j.tipo?.toLowerCase()     === tipo.toLowerCase())
                if (material) joyas = joyas.filter(j => j.material?.toLowerCase() === material.toLowerCase())
                joyas.sort((a, b) => (b.fecha_creacion || 0) - (a.fecha_creacion || 0))
                joyasPorFiltro.value[clave] = joyas
            }

            const joyas = joyasPorFiltro.value[clave]
            todas.value                = joyas.slice(offset, offset + itemsPorPagina)
            paginaActual.value[clave]  = pagina
        } catch (error) {
            console.error('Error cargando con filtros:', error)
        } finally {
            cargandoFiltro.value = false
        }
    }

    const cargarMasConFiltro = async (tipo = null, material = null) => {
        const clave          = generarClaveCache(tipo, material)

        const paginaActualVal = paginaActual.value[clave] || 1
        await cargarJoyasPorFiltro(tipo, material, paginaActualVal + 1)
    }

    const obtenerTotal = (tipo = null, material = null) => {
        const clave = generarClaveCache(tipo, material)
        return joyasPorFiltro.value[clave]?.length || 0
    }

    const cargarJoyasPorIds = async (ids) => {
        if (!ids?.length) return []
        if (todasLasJoyas.value.length > 0) {
            const set = new Set(ids.map(String))
            return todasLasJoyas.value.filter(j => set.has(String(j.id)))
        }
        try {
            const snaps = await Promise.all(
                ids.map(id => getDoc(doc(db, "joyas", String(id))))
            )
            return snaps
                .filter(snap => snap.exists())
                .map(snap => ({ id: snap.id, ...snap.data() }))
        } catch (error) {
            console.error('Error cargando joyas por IDs:', error)
            return []
        }
    }

    const invalidarCache = () => {
        todasLasJoyas.value          = []
        destacadas.value             = []
        novedades.value              = []
        todas.value                  = []
        joyasPorFiltro.value         = {}
        paginaActual.value           = {}
        cargadasTodas.value          = false
        cargadasTodasSinLimite.value = false
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
        cargarTodas20,
        cargarJoyasPorFiltro,
        cargarMasConFiltro,
        obtenerTotal,
        generarClaveCache,
        obtener_joya,
        cargarJoyasPorIds,
        invalidarCache,
    }
})