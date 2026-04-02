// IMPORTACIONES DE FIRESTORE
import { db } from "@/firebase/main"
import {
    doc,
    getDocs,
    getDoc,
    addDoc,
    collection,
    deleteDoc,
    updateDoc,
    query,
    where,
    limit
} from "firebase/firestore"

// IMPORTACIONES DEL STORAGE DE IMAGENES
import { storage } from "@/firebase/main"
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"

// ─────────────────────────────────────────────
// UTILIDAD: Comprimir imagen a WebP antes de subir
// Instala la dependencia: npm install browser-image-compression
// ─────────────────────────────────────────────
import imageCompression from 'browser-image-compression'

// ─────────────────────────────────────────────
// UTILIDAD: Generar Slug Único Autoincremental
// ─────────────────────────────────────────────
const generarSlug = (joya) => {
  const limpiarTexto = (texto) => {
    return texto
      .toString()
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  }

  const slugBase = limpiarTexto(`${joya.nombre} ${joya.material}`);
  const sufijo = Math.random().toString(36).slice(2, 6); // 4 chars: ej. "k3xq"
  return `${slugBase}-${sufijo}`;
}

//Comprimir Images y tema de Subirlas al Bucket

const comprimirImagen = async (file, maxSize) => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: maxSize,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.92,
  }
  return await imageCompression(file, options)
}

export const subir_imagenes = async (files) => {
  const urls = []
  const urlsDetalle = []

  for (const file of files) {
    const pequeña = await comprimirImagen(file, 500)
    const grande = await comprimirImagen(file, 1000)

    // subir pequeña
    const refPequeña = storageRef(storage, `joyas/thumb_${file.name}.webp`)
    await uploadBytes(refPequeña, pequeña, { contentType: 'image/webp', cacheControl: 'public, max-age=31536000' })
    urls.push(await getDownloadURL(refPequeña))

    // subir grande
    const refGrande = storageRef(storage, `joyas/full_${file.name}.webp`)
    await uploadBytes(refGrande, grande, { contentType: 'image/webp', cacheControl: 'public, max-age=31536000' })
    urlsDetalle.push(await getDownloadURL(refGrande))
  }

  return { ok: true, urls, urlsDetalle }
}


// ─────────────────────────────────────────────
// Añadir Joya
// Guarda URLs directas en Firestore (no rutas)
// ─────────────────────────────────────────────
export const agregar_joya = async (joya, files) => {
  const subida = await subir_imagenes(files)
  if (!subida.ok) return { ok: false }

  const favoritosRef = collection(db, "joyas")
  const slug = generarSlug(joya); // ✅ Generar slug único

  await addDoc(favoritosRef, {
    nombre: joya.nombre,
    descripcion: joya.descripcion,
    slug: slug,               // ✅ Guardar slug
    precio: joya.precio,
    material: joya.material,
    tipo: joya.tipo,
    destacado: joya.destacado,
    disponible: joya.disponible,
    imagenes: subida.urls,   // ✅ URLs directas, no rutas
    imagenesDetalle: subida.urlsDetalle,
    fecha_creacion: Date.now(),
    fecha_disponible: joya.fecha_disponibilidad,
    medidas: joya.medidas,
    seccion: joya.seccion

  })

  return { ok: true, urls: subida.urls }
}


// ─────────────────────────────────────────────
// Obtener Joyas
// Sin getDownloadURL — las URLs ya están en Firestore
// ─────────────────────────────────────────────
export const obtener_joya = async () => {
  try {
    const snap = await getDocs(collection(db, "joyas"))

    const favoritos = snap.docs.map((docu) => ({
      id: docu.id,
      ...docu.data()
      // ✅ imagenes ya son URLs directas, sin ninguna petición extra
    }))

    return { ok: true, favs: favoritos }
  } catch (error) {
    console.log(error)
    return { ok: false, favs: [] }
  }
}


// ─────────────────────────────────────────────
// Borrar Joya
// Las imagenes ahora son URLs, usamos la URL para borrar
// ─────────────────────────────────────────────
export const delete_joya = async (id) => {
  try {
    const docRef = doc(db, "joyas", id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) return { ok: false }
    const joya = docSnap.data()

    const todasLasUrls = [
      ...(joya.imagenes || []),
      ...(joya.imagenesDetalle || [])
    ]

    // ✅ Borrar todas en paralelo
    await Promise.all(todasLasUrls.map(async (imagen) => {
      if (!imagen) return
      try {
        let imagenRef
        if (imagen.startsWith('https://')) {
          const url = new URL(imagen)
          const rutaCodificada = url.pathname.split('/o/')[1]
          const ruta = decodeURIComponent(rutaCodificada)
          imagenRef = storageRef(storage, ruta)
        } else {
          imagenRef = storageRef(storage, imagen)
        }
        await deleteObject(imagenRef)
      } catch (e) {
        console.warn('No se pudo borrar imagen:', imagen, e)
      }
    }))

    await deleteDoc(docRef)
    return { ok: true }

  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}
// ─────────────────────────────────────────────
// Actualizar Joya (con compresión WebP en nuevas imágenes)
// ─────────────────────────────────────────────
export const update_joya = async (id, datosActualizados, nuevasImagenes) => {
  try {
    const docRef = doc(db, "joyas", id)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) return { ok: false }
    const joyaActual = docSnap.data()

    // Lógica de actualización de Slug
    let nuevoSlug = joyaActual.slug;
    if (datosActualizados.nombre !== joyaActual.nombre || datosActualizados.material !== joyaActual.material) {
      nuevoSlug = generarSlug(datosActualizados);
    }

    // Si no hay imágenes nuevas, solo actualizar datos
    if (!nuevasImagenes || nuevasImagenes.length === 0) {
      await updateDoc(docRef, {
        ...datosActualizados,
        slug: nuevoSlug,
        imagenes: joyaActual.imagenes,
        imagenesDetalle: joyaActual.imagenesDetalle  // ✅ Conservar las detalle
      })
      return { ok: true }
    }

    // ✅ Borrar TODAS las imágenes antiguas (thumb + detalle)
    const todasLasUrls = [
      ...(joyaActual.imagenes || []),
      ...(joyaActual.imagenesDetalle || [])
    ]
    for (const url of todasLasUrls) {
      if (!url) continue
      try {
        const rutaDecodificada = decodeURIComponent(url.split('/o/')[1].split('?')[0])
        const imagenRef = storageRef(storage, rutaDecodificada)
        await deleteObject(imagenRef).catch(() => {})
      } catch {
        // Continuar aunque falle el borrado
      }
    }

    // Subir nuevas imágenes comprimidas
    const subida = await subir_imagenes(nuevasImagenes)
    if (!subida.ok) return { ok: false }

    // ✅ Guardar ambas URLs
    await updateDoc(docRef, {
      ...datosActualizados,
      slug: nuevoSlug,
      imagenes: subida.urls,
      imagenesDetalle: subida.urlsDetalle
    })

    return { ok: true }

  } catch (error) {
    console.log(error)
    return { ok: false }
  }
}


// ─────────────────────────────────────────────
// Guardar Correos Newsletter
// ─────────────────────────────────────────────
export const guardar_correo = async (correo) => {
  try {
    const favoritosRef = collection(db, "correos")
    await addDoc(favoritosRef, {
      correo: correo,
      fecha_creacion: Date.now()
    })
    return { ok: true }
  } catch (error) {
    console.error('Error guardando correo:', error)
    return { ok: false }
  }
}


// ─────────────────────────────────────────────
// Obtener Todos los Correos
// ─────────────────────────────────────────────
export const obtener_correos = async () => {
  try {
    const snap = await getDocs(collection(db, "correos"))
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