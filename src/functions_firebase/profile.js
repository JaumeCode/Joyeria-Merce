//IMPORTACIONES DE FIRESTORE
import { db } from "@/firebase/main"
import {
    doc,
    getDocs,
    getDoc,
    addDoc,
    collection,
    deleteDoc,
    updateDoc
} from "firebase/firestore"

//IMPORTACIONES DEL STORAGE DE IMAGENES
import { storage } from "@/firebase/main"
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"


//Subir Imagenes
export const subir_imagenes = async (files) => {
  try {
    if (!files || files.length === 0) {
      return { ok: true, rutas: [] }
    }

    const rutas = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      const nombreUnico = `joyas/${crypto.randomUUID()}_${file.name}`

      const referencia = storageRef(storage, nombreUnico)

      await uploadBytes(referencia, file)

      rutas.push(nombreUnico)
    }

    return {
      ok: true,
      rutas
    }

  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}




//Añadir Joyas
export const agregar_joya = async (joya, files) => {

  const subida = await subir_imagenes(files)

  if (!subida.ok) return { ok: false }

  const urls = await Promise.all(
    subida.rutas.map(async (ruta) => {
      return await getDownloadURL(storageRef(storage, ruta))
    })
  )

  const favoritosRef = collection(db, "joyas")

  await addDoc(favoritosRef, {

    nombre: joya.nombre,
    descripcion: joya.descripcion,
    precio: joya.precio,
    material: joya.material,
    tipo: joya.tipo,
    destacado: joya.destacado,
    disponible: joya.disponible,
    imagenes: subida.rutas,
    fecha_creacion: Date.now()
    
  })

  return { ok: true ,urls}
}


//Obtener joyas
export const obtener_joya = async () => {

  const favRef = collection(db, "joyas")
  const snap = await getDocs(favRef)

  const favoritos = await Promise.all(
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

  return { ok: true, favs: favoritos }
}

//Borramos documento de cada joya
export const delete_joya = async (id) => {
  try {
    // Obtener joya
    const docRef = doc(db, "joyas", id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) return { ok: false }

    const joya = docSnap.data()

    // Borrar Imagenes si Existen en el Documento
    if (joya.imagenes && joya.imagenes.length > 0) {
      for (const ruta of joya.imagenes) {
        if (!ruta) continue
        const imagenRef = storageRef(storage, ruta)
        await deleteObject(imagenRef).catch(() => {})
      }
    }

    // Borrar Todo el documento
    await deleteDoc(docRef)

    return { ok: true }

  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}


//Guardar Correos Newsletter

export const guardar_correo = async () => {

  if (!subida.ok) return { ok: false }
  try {
    const favoritosRef = collection(db, "correos")
    await addDoc(favoritosRef, {
      correo: correo.value,
      fecha_creacion: Date.now()
    })
    return { ok: true }
  } catch (error) {
    console.error('Error guardando correo:', error)
    return { ok: false }
  }

}

//Obtener Todos los correos

export const obtener_correos = async () => {
  try {
    const favRef = collection(db, "correos")
    const snap = await getDocs(favRef)
    const correos = snap.docs.map((docu) => ({
      id: docu.id,
      ...docu.data()
    }))
    return { ok: true, correos }
  } catch (error) {
    console.error('Error obteniendo correos:', error)
    return { ok: false, correos: [] }
  }
}


//Actualizar Joya
export const update_joya = async (id, datosActualizados, nuevasImagenes) => {
  try {

    const docRef = doc(db, "joyas", id)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) {
      return { ok: false }
    }

    const joya = docSnap.data()

    // Si no hay imagenes nuevas
    if (!nuevasImagenes || nuevasImagenes.length === 0) {
        await updateDoc(docRef, {
            ...datosActualizados,
            imagenes: joya.imagenes
        })
        
        return { ok: true }

    }

    // Si hay imagenes nuevas borramos las antiguas
    if (joya.imagenes) {
      for (const url of joya.imagenes) {
        if (url) {
          const imagenRef = storageRef(storage, url)
          await deleteObject(imagenRef).catch(() => {})
        }
      }
    }

    //Subimos las nuevas urls recorriendo la lista
    const nuevasUrls = []

    for (let i = 0; i < nuevasImagenes.length; i++) {

      const file = nuevasImagenes[i]

      const nombre = `joyas/${Date.now()}_${i}_${file.name}`
      const refNueva = storageRef(storage, nombre)

      await uploadBytes(refNueva, file)

      const url = await getDownloadURL(refNueva)

      nuevasUrls.push(url)
    }

    // Actualizamos datos nuevos con imagenes nuevas
    await updateDoc(docRef, {
      ...datosActualizados,
      imagenes: nuevasUrls
    })

    return { ok: true }

  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}





