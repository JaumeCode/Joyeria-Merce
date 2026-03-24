<template>
  <div class="cargador" v-if="cargando">
    <div class="loader-inner">
      <div class="loader-ring"></div>
      <span>✦</span>
    </div>
  </div>

  <div v-else-if="!logueado" class="auth">
    <div class="auth-left">
      <div class="auth-brand">
        <p class="brand-sub">Administración</p>
        <h1 class="brand-name">Joyería<br>Mercè</h1>
        <div class="brand-line"></div>
        <p class="brand-desc">Panel exclusivo de gestión de colección</p>
      </div>
    </div>
    <div class="auth-right">
      <div class="auth-card">
        <h2>Iniciar sesión</h2>
        <p class="auth-sub">Acceso restringido a administradores</p>
        <form @submit.prevent="iniciar_sesion" class="auth-form">
          <div class="field">
            <label>Correo electrónico</label>
            <input v-model="correo" type="email" placeholder="ejemplo@email.com" />
          </div>
          <div class="field">
            <label>Contraseña</label>
            <input v-model="password" type="password" placeholder="••••••••" />
          </div>
          <button type="submit" class="btn-main">Entrar</button>
          <p class="auth-foot">¿Problemas? <a href="#">Contacta con soporte</a></p>
        </form>
      </div>
    </div>
  </div>

  <div v-else class="admin-panel">

    <aside class="sidebar">
      <div class="sidebar-brand">
        <span class="sidebar-gem">✦</span>
        <div>
          <p class="sidebar-title">Joyería Mercè</p>
          <p class="sidebar-role">Administración</p>
        </div>
        <button class="btn-menu-toggle" @click="menuAbierto = !menuAbierto">
          {{ menuAbierto ? '✕' : '☰' }}
        </button>
      </div>
      <nav class="sidebar-nav" :class="{ abierto: menuAbierto }">
        <a class="nav-item active" @click="menuAbierto = false">
          <span class="nav-icon">◈</span> Colección
        </a>
        <a class="nav-item" href="/admin/estadisticas" @click="menuAbierto = false">
          <span class="nav-icon">◇</span> Estadísticas
        </a>
        <a class="nav-item" href="/admin/subs" @click="menuAbierto = false">
          <span class="nav-icon">✉</span> Suscriptores
        </a>
        <div class="nav-footer-mobile">
          <p class="sidebar-user">{{ correo }}</p>
          <button @click="cerrar_sesion" class="btn-logout">Cerrar sesión</button>
        </div>
      </nav>
      <div class="sidebar-footer">
        <p class="sidebar-user">{{ correo }}</p>
        <button @click="cerrar_sesion" class="btn-logout">Cerrar sesión</button>
      </div>
    </aside>
    <main class="main-content">

      <!-- Estadísticas -->
      <section class="stats-row">
        <div class="stat-pill">
          <span class="stat-val">{{ total_joyas }}</span>
          <span class="stat-lbl">Total joyas</span>
        </div>
        <div class="stat-pill">
          <span class="stat-val">{{ total_disponibles }}</span>
          <span class="stat-lbl">Disponibles</span>
        </div>
        <div class="stat-pill accent">
          <span class="stat-val">{{ total_destacadas }}</span>
          <span class="stat-lbl">Destacadas</span>
        </div>
      </section>

      <!-- Formulario Agregar Joya -->
      <section class="panel-section">
        <div class="panel-head">
          <h2>Nueva joya</h2>
          <p>Añade una pieza a la colección</p>
        </div>
        <form @submit.prevent="add_joya" class="form-grid">
          <div class="field span-1">
            <label>Nombre</label>
            <input type="text" placeholder="Ej. Anillo solitario" v-model="nombre" />
          </div>
          <div class="field span-1">
            <label>Precio (€)</label>
            <input type="number" placeholder="0.00" v-model="precio"/>
          </div>
          <div class="field span-1">
            <label>Material</label>
            <select v-model="material">
              <option disabled value="">Seleccionar</option>
              <option value="oro">Oro</option>
              <option value="plata">Plata</option>
              <option value="acero">Acero</option>
            </select>
          </div>
          <div class="field span-1">
            <label>Tipo</label>
            <select v-model="tipo">
              <option disabled value="">Seleccionar</option>
              <option value="anillos">Anillos</option>
              <option value="colgantes">Colgantes</option>
              <option value="pulseras">Pulseras</option>
              <option value="pendientes">Pendientes</option>
              <option value="cadenas">Cadenas</option>
            </select>
          </div>
       
          <div class="field span-1">
            <label>Medidas</label>
            <input type="text" placeholder="Ej. 18mm diámetro, talla 12..." v-model="medidas" />
          </div>
          <!-- DESPUÉS -->
          <div class="field span-1">
            <label>Disponibilidad</label>
            <select v-model="disponible">
              <option :value="true">Disponible</option>
              <option :value="false">No disponible</option>
            </select>
          </div>
          <div class="field span-1" v-if="disponible === false">
            <label>Fecha de disponibilidad</label>
            <input type="date" v-model="fecha_disponibilidad" :min="hoy" />
          </div>
          <div class="field span-1">
            <label>Sección</label>
            <select v-model="seccion">
              <option disabled value="">Introduce Seccion</option>
              <option value="general">General</option>
              <option value="regalos">Regalos</option>
              <option value="pedidas">Anillos de Pedida</option>
            </select>
          </div>
          <div class="field span-1 field-checks">
            <label class="toggle-label">
              <input type="checkbox" v-model="destacado"/>
              <span class="toggle"></span>
              Destacado
            </label>
            <label class="toggle-label">
              <input type="checkbox" v-model="notificar_email"/>
              <span class="toggle"></span>
              Notificar por email
            </label>
          </div>
          <div class="field span-2">
            <label>Imágenes (máx. 3)</label>
            <div class="file-drop">
              <input type="file" multiple @change="handleFiles"/>
              <span>Arrastra o haz clic para seleccionar</span>
            </div>
          </div>
          <div class="field span-2">
            <label>Descripción</label>
            <textarea v-model="descripcion" placeholder="Describe la joya con detalle..."></textarea>
          </div>
          <div class="span-2 form-actions">
            <button type="submit" class="btn-main">Agregar joya</button>
          </div>
        </form>
      </section>

      <!-- Lista de Joyas -->
      <section class="panel-section">
        <div class="panel-head">
          <h2>Colección</h2>
          <p>Gestiona las piezas existentes</p>
        </div>
        <div class="filter-bar">
          <input class="filter-search" type="text" v-model="buscador_lista" placeholder="Buscar joya...">
          <select class="filter-select" v-model="buscador_disponibilidad">
            <option value="">Disponibilidad</option>
            <option :value="true">Disponible</option>
            <option :value="false">No disponible</option>
          </select>
          <select class="filter-select" v-model="buscador_destacado">
            <option value="">Destacado</option>
            <option :value="true">Sí</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div class="joya-list">
          <div v-for="joya in joyasPaginadas" :key="joya.id" class="joya-row">
            <div class="joya-imgs">
              <img v-for="imagen in joya.imagenes" :src="imagen" alt="" />
            </div>
            <div class="joya-info">
              <p class="joya-nombre">{{ joya.nombre }}</p>
              <p class="joya-meta">{{ joya.material }} · {{ joya.tipo }}</p>
              <p class="joya-precio">{{ joya.precio }} €</p>
            </div>
            <div class="joya-status">
              <span class="pill" :class="joya.disponible ? 'pill-green' : 'pill-gray'">
                {{ joya.disponible ? 'Disponible' : 'No disponible' }}
              </span>
              <span v-if="joya.destacado" class="pill pill-gold">★ Destacada</span>
            </div>
            <div class="joya-actions">
              <button @click="entrar_editor(joya)" class="btn-edit">Editar</button>
              <button @click="eliminar_joya(joya)" class="btn-del">Eliminar</button>
            </div>
          </div>
        </div>
        <div class="paginacion" v-if="total_paginas > 1">
          <button class="pag-btn" @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1">‹</button>
          <button
            v-for="n in total_paginas"
            :key="n"
            class="pag-btn"
            :class="{ activo: paginaActual === n }"
            @click="paginaActual = n"
          >{{ n }}</button>
          <button class="pag-btn" @click="paginaActual++" :disabled="paginaActual === total_paginas">›</button>
        </div>
      </section>

    </main>
  </div>

  <!-- Editor Modal -->
  <div v-if="editando" id="editor" class="modal-overlay" @click.self="salir_editor">
    <div class="modal-card">
      <button class="modal-close" @click="salir_editor">✕</button>
      <div class="modal-head">
        <span class="modal-gem">✦</span>
        <h2>Editar joya</h2>
      </div>
      <form @submit.prevent="guardar_edicion" class="form-grid">
        <div class="field span-1">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" v-model="nombre_editor"/>
        </div>
        <div class="field span-1">
          <label>Precio (€)</label>
          <input type="number" placeholder="Precio" v-model="precio_editor"/>
        </div>
        <div class="field span-1">
          <label>Material</label>
          <select v-model="material_editor">
            <option disabled value="">Selecciona Material</option>
            <option value="oro">Oro</option>
            <option value="plata">Plata</option>
            <option value="acero">Acero</option>
          </select>
        </div>
        <div class="field span-1">
          <label>Tipo</label>
          <select v-model="tipo_editor">
            <option disabled value="">Selecciona Tipo</option>
            <option value="anillos">Anillos</option>
            <option value="colgantes">Colgantes</option>
            <option value="pulseras">Pulseras</option>
            <option value="pendientes">Pendientes</option>
            <option value="cadenas">Cadenas</option>
          </select>
        </div>
        <div class="field span-1">
          <label>Disponibilidad</label>
          <select v-model="disponible_editor">
            <option :value="true">Disponible</option>
            <option :value="false">No disponible</option>
          </select>
        </div>
        <div class="field span-1" v-if="disponible_editor === false">
          <label for="">Fecha Disponibilidad</label>
          <input type="date" v-model="fecha_disponibilidad_editor" :min="hoy" />
        </div>
       <div class="field span-1">
            <label>Medidas</label>
            <input type="text" placeholder="Ej. 18mm diámetro, talla 12..." v-model="medidas_editor" />
          </div>
                
        <div class="field span-1 field-checks">
          <label class="toggle-label">
            <input v-model="destacado_editor" type="checkbox" />
            <span class="toggle"></span>
            Destacado
          </label>
        </div>
        <div class="field span-1">
          <label>Sección</label>
          <select v-model="seccion_editor">
            <option disabled value="">Introducce Seccion</option>
            <option value="general">General</option>
            <option value="regalos">Regalos</option>
            <option value="pedidas">Anillos de Pedida</option>
          </select>
        </div>
        <div class="field span-2">
          <label>Imágenes</label>
          <div class="file-drop">
            <input type="file" multiple @change="handleFilesEditor"/>
            <span>Arrastra o haz clic para seleccionar</span>
          </div>
        </div>
        <div class="field span-2">
          <label>Descripción</label>
          <textarea v-model="descripcion_editor" placeholder="Descripción"></textarea>
        </div>
        <div class="span-2 form-actions modal-actions">
          <button @click="salir_editor" type="button" class="btn-ghost">Cancelar</button>
          <button type="submit" class="btn-main">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>
  <div v-if="enviando_emails" class="email-overlay">
    <div class="email-popup">
      <p class="email-gem">✉</p>
      <h3>Enviando novedades</h3>
      <p class="email-count">{{ contador_emails }} de {{ total_emails }}</p>
      <div class="email-barra">
        <div class="email-relleno" :style="{ width: (contador_emails / total_emails * 100) + '%' }"></div>
      </div>
      <p class="email-sub">Por favor, no cierres la ventana</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { doLogin } from '@/functions_firebase/auth';
import { auth } from '@/firebase/main';
import { sendEmail } from '@/functions_firebase/auth';
import { agregar_joya } from '@/functions_firebase/profile';
import { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { obtener_joya } from '@/functions_firebase/profile';
import { delete_joya } from '@/functions_firebase/profile';
import { update_joya } from '@/functions_firebase/profile';
import { onAuthStateChanged } from 'firebase/auth';
import { logOut } from '@/functions_firebase/auth';
import { computed } from 'vue';
import { useCorreosStore } from '@/stores/correos';
import { useHead } from '@vueuse/head';
useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

//Servicios de Notificacion
const toast = useToast()

//Usuario
const logueado = ref(false)
const cargando = ref(true)

onAuthStateChanged(auth, async (user) => {
  if (user && user.emailVerified) {
    logueado.value = true
    correo.value = user.email
    await getdata()
    contadores()
  } else {
    logueado.value = false
  }
  setTimeout(() => {
    cargando.value = false
  }, 2000);
})

//Correos de Usuarios
const store_correos = useCorreosStore()

//Menu movile 
const menuAbierto = ref(false)

//Iniciar Sesion de Administrador
const correo = ref("")
const password = ref("")

const iniciar_sesion = async () => {
  if (!correo.value || !password.value) {
    toast.error("Faltan campos por completar")
  }
  try {
    const resultado = await doLogin(correo.value, password.value)
    if (resultado.ok) {
      if (auth.currentUser.emailVerified) {
        toast.success("Inicio de Sesion Completado con exito")
        await getdata()
        contadores()
      } else {
        toast.warning("Verifica el correo Electronico")
        sendEmail(correo.value)
      }
    }
  } catch (error) {
    toast.error("Inicio de Sesion Incorrecto")
  }
}

//Agregar Joyas
const nombre = ref("")
const precio = ref("")
const material = ref("")
const tipo = ref("")
const descripcion = ref("")
const disponible = ref(true)
const destacado = ref(false)
const imagenesFiles = ref([])
const seccion=ref("")
//Fecha de Disponibildiad
const fecha_disponibilidad = ref("")
const hoy = new Date().toISOString().split('T')[0]
//Medidas 
const medidas = ref("")

const handleFiles = (e) => {
  const files = Array.from(e.target.files)
  if (files.length > 3) {
    toast.error("Máximo 3 imágenes")
    return
  }
  imagenesFiles.value = files
}


const enviando_emails = ref(false)
const contador_emails = ref(0)
const total_emails = ref(0)


const notificar_email = ref(false)
const add_joya = async () => {
  const nombreJoya = nombre.value
  const descripcionJoya = descripcion.value

  const nuevaJoya = {
    nombre: nombre.value,
    precio: Number(precio.value),
    material: material.value,
    tipo: tipo.value,
    descripcion: descripcion.value,
    disponible: disponible.value,
    destacado: destacado.value,
    imagenes: imagenesFiles.value,
    fecha_disponibilidad: disponible.value ? null : fecha_disponibilidad.value,
    medidas: medidas.value,
    seccion: seccion.value
  }

  try {
    if (!nombre.value.trim()) {
      toast.error("El nombre es obligatorio")
      return
    }
    if (nombre.value.trim().length < 3) {
      toast.error("El nombre debe tener mínimo 3 caracteres")
      return
    }
    if (!precio.value || isNaN(precio.value) || Number(precio.value) <= 0) {
      toast.error("El precio debe ser mayor que 0")
      return
    }
    if (!material.value) {
      toast.error("Selecciona un material")
      return
    }
    if (!tipo.value) {
      toast.error("Selecciona un tipo de joya")
      return
    }
    if (!descripcion.value.trim()) {
      toast.error("La descripción es obligatoria")
      return
    }
    if (descripcion.value.trim().length < 10) {
      toast.error("La descripción debe tener mínimo 10 caracteres")
      return
    }
    if (destacado.value && total_destacadas.value >= 10) {
      toast.error("Ya tienes 10 joyas destacadas. Quita alguna antes de añadir otra.")
      return
    }
    if(!medidas.value){
      toast.error("Tienes que Indicar las medidas")
      return
    }
    if(!seccion.value){
      toast.error("Tienes que Indicar la seccion para continuar")
    }
    cargando.value = true

    const resultado = await agregar_joya(nuevaJoya, imagenesFiles.value);
    let urlFoto = null

    if (resultado.ok) {
      toast.success("Joya agregada exitosamente")
      await getdata()
      contadores()
      const joyaReciente = almacen_joyas.value.find(j => j.nombre === nombreJoya)
      urlFoto = resultado.urls?.[0] || null
      nombre.value = ""
      precio.value = ""
      material.value = ""
      tipo.value = ""
      descripcion.value = ""
      disponible.value = true
      destacado.value = false
      imagenesFiles.value = []
      medidas.value = ""
      seccion.value= ""
    }

    if (notificar_email.value && disponible.value) {
      try {
        await store_correos.obtener_correos()
        const listaCorreos = store_correos.correos.map(c => c.correo)
        enviando_emails.value = true
        contador_emails.value = 0
        total_emails.value = listaCorreos.length

        const interval = setInterval(() => {
          if (contador_emails.value < total_emails.value) {
            contador_emails.value++
          }
        }, 700)

        
        console.log(urlFoto)
        const response = await fetch(
          "https://us-central1-joyeriamerce-runing.cloudfunctions.net/notificar_novedad",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: nombreJoya,
              descripcion: descripcionJoya,
              correos: listaCorreos,
              foto: urlFoto || null
            })
          }
        )
        
        clearInterval(interval)
        contador_emails.value = total_emails.value
        enviando_emails.value = false

        const data = await response.json()
        if (data.ok) toast.success("Emails enviados correctamente")
        else toast.error(data.error || "Error al enviar")
      } catch (e) {
        console.log(e)
        toast.error("Error al enviar emails")
      }
      notificar_email.value = false
    }
  } catch (error) {
    console.log(error)
  }

  cargando.value = false
}

//Estadisticas
const total_joyas = ref(0)
const total_disponibles = ref(0)
const total_destacadas = ref(0)

const contadores = () => {
  total_joyas.value = almacen_joyas.value.length
  total_disponibles.value = almacen_joyas.value.filter(joya => joya.disponible === true).length
  total_destacadas.value = almacen_joyas.value.filter(joya => joya.destacado === true).length
}

//Obtener Joyas
const almacen_joyas = ref([])

const getdata = async () => {
  try {
    const resultado = await obtener_joya()
    almacen_joyas.value = resultado.favs
    console.log(almacen_joyas.value)
  } catch (error) {
    console.log(error)
  }
}

//Controlador del editor
const editando = ref(false)
const id_editor = ref(null)
const nombre_editor = ref("")
const precio_editor = ref("")
const material_editor = ref("")
const tipo_editor = ref("")
const descripcion_editor = ref("")
const disponible_editor = ref(true)
const destacado_editor = ref(false)
const imagenesFiles_editor = ref([])
const fecha_disponibilidad_editor = ref("")
const medidas_editor = ref("")
const seccion_editor=ref("")

const handleFilesEditor = (e) => {
  const files = Array.from(e.target.files)
  if (files.length > 3) {
    toast.error("Máximo 3 imágenes")
    return
  }
  imagenesFiles_editor.value = files
}

//Paginacion de joyas 
const paginaActual = ref(1)
const porPagina = 5

const joyasPaginadas = computed(() => {
  const inicio = (paginaActual.value - 1) * porPagina
  return joyas_filtradas.value.slice(inicio, inicio + porPagina)
})

const total_paginas = computed(() =>
  Math.ceil(joyas_filtradas.value.length / porPagina)
)



const entrar_editor = (joya) => {
  editando.value = true
  id_editor.value = joya.id
  nombre_editor.value = joya.nombre
  precio_editor.value = joya.precio
  disponible_editor.value = joya.disponible
  material_editor.value = joya.material
  tipo_editor.value = joya.tipo
  descripcion_editor.value = joya.descripcion
  destacado_editor.value = joya.destacado
  fecha_disponibilidad_editor.value = joya.fecha_disponibilidad || ""
  medidas_editor.value = joya.medidas || ""
  seccion_editor.value= joya.seccion || ""
}

const guardar_edicion = async () => {
  const joya_actualizada = {
    nombre: nombre_editor.value,
    precio: Number(precio_editor.value),
    material: material_editor.value,
    tipo: tipo_editor.value,
    descripcion: descripcion_editor.value,
    disponible: disponible_editor.value,
    destacado: destacado_editor.value,
    fecha_disponibilidad: disponible_editor.value ? null : fecha_disponibilidad_editor.value,
    medidas: medidas_editor.value,
    seccion: seccion_editor.value
  }
  try {
    cargando.value = true
    const resultado = await update_joya(id_editor.value, joya_actualizada, imagenesFiles_editor.value)
    if (resultado.ok) {
      toast.success("Joya actualizada correctamente")
      editando.value = false
      await getdata()
      contadores()
    }
  } catch (error) {
    console.log(error)
    toast.error("Error al actualizar")
  }
  cargando.value = false
}

//Buscador De Lista de Joyas
const buscador_lista = ref("")
const buscador_disponibilidad = ref("")
const buscador_destacado = ref("")

const joyas_filtradas = computed(() => {
  return almacen_joyas.value.filter(joya => {
    const coincideNombre = !buscador_lista.value || joya.nombre.toLowerCase().includes(buscador_lista.value.toLowerCase())
    const coincideDisponibilidad = buscador_disponibilidad.value === "" || joya.disponible === buscador_disponibilidad.value
    const coincideDestacado = buscador_destacado.value === "" || joya.destacado === buscador_destacado.value
    return coincideNombre && coincideDisponibilidad && coincideDestacado
  })
})

const salir_editor = () => {
  editando.value = false
}

//Cerrar Sesion
const cerrar_sesion = async () => {
  logOut()
  toast.success("Sesion Cerrada Exitosamente")
  correo.value = ""
  password.value = ""
}

//Eliminar Joyas
const eliminar_joya = async (joya) => {
  cargando.value = true
  try {
    const resultado = await delete_joya(joya.id)
    if (resultado.ok) {
      console.log("Eliminado correctamente")
      toast.success("Joya eliminada correctamente")
      await getdata()
      contadores()
    }
  } catch (error) {
    console.log(error)
  }
  cargando.value = false
}
</script>

<style lang="sass" scoped>

// ── Tokens ───────────────────────────────────────────────
$white:      #FFFFFF
$off-white:  #F9F8F6
$bg:         #F4F2EE
$line:       #E8E4DE
$line-soft:  #F0EDE8
$text:       #1C1917
$text-mid:   #57534E
$text-muted: #A8A29E
$gold:       #B8860B
$gold-soft:  #D4A017
$green:      #166534
$green-bg:   #DCFCE7
$gray-bg:    #F3F4F6
$gray-text:  #6B7280
$red:        #991B1B
$red-bg:     #FEE2E2
$shadow-sm:  0 1px 3px rgba(28,25,23,0.06), 0 1px 2px rgba(28,25,23,0.04)
$shadow-md:  0 4px 16px rgba(28,25,23,0.08), 0 2px 6px rgba(28,25,23,0.04)
$shadow-lg:  0 20px 60px rgba(28,25,23,0.12), 0 8px 24px rgba(28,25,23,0.06)

$serif: 'Playfair Display', Georgia, serif
$sans:  'DM Sans', sans-serif

*
  box-sizing: border-box
  margin: 0
  padding: 0

// ── Loader ───────────────────────────────────────────────
.cargador
  position: fixed
  inset: 0
  background: $white
  display: flex
  align-items: center
  justify-content: center
  z-index: 9999

.loader-inner
  position: relative
  width: 56px
  height: 56px
  display: flex
  align-items: center
  justify-content: center

  span
    font-size: 1.1rem
    color: $gold
    animation: spin 3s linear infinite

.loader-ring
  position: absolute
  inset: 0
  border: 1.5px solid $line
  border-top-color: $gold
  border-radius: 50%
  animation: spin 1s linear infinite

// ── Auth ─────────────────────────────────────────────────
.auth
  display: flex
  min-height: 100vh

.auth-left
  flex: 1
  background: $off-white
  display: flex
  align-items: center
  justify-content: center
  padding: 4rem 3rem
  border-right: 1px solid $line
  position: relative
  overflow: hidden

  &::before
    content: '✦'
    position: absolute
    font-size: 40vw
    color: rgba(184,134,11,0.04)
    right: -8vw
    top: 50%
    transform: translateY(-50%)
    line-height: 1
    pointer-events: none
    user-select: none

.auth-brand
  max-width: 320px

.brand-sub
  font-family: $sans
  font-size: .7rem
  font-weight: 500
  letter-spacing: .25rem
  text-transform: uppercase
  color: $gold
  margin-bottom: 1.2rem

.brand-name
  font-family: $serif
  font-size: 4rem
  font-weight: 400
  color: $text
  line-height: 1.05
  margin-bottom: 2rem

.brand-line
  width: 40px
  height: 1px
  background: $gold
  margin-bottom: 1.5rem

.brand-desc
  font-family: $sans
  font-size: .9rem
  color: $text-muted
  line-height: 1.6

.auth-right
  width: 480px
  display: flex
  align-items: center
  justify-content: center
  padding: 3rem 2.5rem
  background: $white

.auth-card
  width: 100%
  max-width: 380px

  h2
    font-family: $serif
    font-size: 2rem
    font-weight: 400
    color: $text
    margin-bottom: .4rem

.auth-sub
  font-family: $sans
  font-size: .85rem
  color: $text-muted
  margin-bottom: 2.5rem

.auth-form
  display: flex
  flex-direction: column
  gap: 1.2rem

.auth-foot
  font-family: $sans
  font-size: .82rem
  color: $text-muted
  text-align: center
  margin-top: .4rem

  a
    color: $gold
    text-decoration: none
    &:hover
      text-decoration: underline

// ── Shared fields ────────────────────────────────────────
.field
  display: flex
  flex-direction: column
  gap: .45rem

  label
    font-family: $sans
    font-size: .72rem
    font-weight: 500
    letter-spacing: .06rem
    text-transform: uppercase
    color: $text-mid

  input, select, textarea
    font-family: $sans
    font-size: .92rem
    color: $text
    background: $white
    border: 1px solid $line
    border-radius: 8px
    padding: .75rem 1rem
    outline: none
    transition: border-color .2s, box-shadow .2s
    width: 100%
    appearance: none

    &::placeholder
      color: $text-muted

    &:focus
      border-color: $gold-soft
      box-shadow: 0 0 0 3px rgba(184,134,11,0.08)
  input[type="date"]
    font-family: $sans
    font-size: .92rem
    color: $text
    background: $white
    border: 1px solid $line
    border-radius: 8px
    padding: .75rem 1rem
    outline: none
    transition: border-color .2s, box-shadow .2s
    width: 100%
    cursor: pointer

    &:focus
      border-color: $gold-soft
      box-shadow: 0 0 0 3px rgba(184,134,11,0.08)
  select
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A8A29E' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")
    background-repeat: no-repeat
    background-position: right 1rem center
    padding-right: 2.5rem
    cursor: pointer

  textarea
    min-height: 100px
    resize: vertical
    line-height: 1.6

.field-checks
  display: flex
  flex-direction: column
  justify-content: center
  gap: .9rem
  padding-top: 1.4rem

// ── Toggle ───────────────────────────────────────────────
.toggle-label
  display: flex
  align-items: center
  gap: .8rem
  font-family: $sans
  font-size: .88rem
  color: $text-mid
  cursor: pointer
  user-select: none

  input[type="checkbox"]
    display: none

  .toggle
    width: 36px
    height: 20px
    background: $line
    border-radius: 999px
    position: relative
    transition: background .2s
    flex-shrink: 0

    &::after
      content: ''
      position: absolute
      width: 14px
      height: 14px
      border-radius: 50%
      background: $white
      top: 3px
      left: 3px
      transition: transform .2s
      box-shadow: $shadow-sm

  input[type="checkbox"]:checked + .toggle
    background: $gold

    &::after
      transform: translateX(16px)

// ── File drop ─────────────────────────────────────────────
.file-drop
  position: relative
  border: 1.5px dashed $line
  border-radius: 8px
  padding: 1.2rem
  text-align: center
  background: $off-white
  transition: border-color .2s, background .2s
  cursor: pointer

  &:hover
    border-color: $gold-soft
    background: rgba(212,160,23,0.03)

  input[type="file"]
    position: absolute
    inset: 0
    opacity: 0
    cursor: pointer
    width: 100%
    height: 100%

  span
    font-family: $sans
    font-size: .82rem
    color: $text-muted
    pointer-events: none

// ── Buttons ───────────────────────────────────────────────
.btn-main
  display: inline-flex
  align-items: center
  justify-content: center
  padding: .82rem 2rem
  background: $text
  color: $white
  border: none
  border-radius: 8px
  font-family: $sans
  font-size: .85rem
  font-weight: 500
  letter-spacing: .04rem
  cursor: pointer
  transition: background .2s, transform .15s

  &:hover
    background: #2C2825
    transform: translateY(-1px)

.btn-ghost
  padding: .82rem 1.8rem
  background: transparent
  border: 1px solid $line
  border-radius: 8px
  font-family: $sans
  font-size: .85rem
  font-weight: 500
  color: $text-mid
  cursor: pointer
  transition: border-color .2s, color .2s

  &:hover
    border-color: $text-mid
    color: $text

.form-actions
  display: flex
  justify-content: flex-end
  padding-top: .5rem

// ── Admin layout ──────────────────────────────────────────
.admin-panel
  display: flex
  min-height: 100vh
  background: $bg

// ── Sidebar ───────────────────────────────────────────────
.sidebar
  width: 260px
  flex-shrink: 0
  background: $white
  border-right: 1px solid $line
  display: flex
  flex-direction: column
  padding: 2rem 1.5rem
  position: sticky
  top: 0
  height: 100vh
  overflow-y: auto

.sidebar-brand
  display: flex
  align-items: center
  gap: 1rem
  padding-bottom: 2rem
  border-bottom: 1px solid $line-soft
  margin-bottom: 2rem

.sidebar-gem
  font-size: 1.4rem
  color: $gold

.sidebar-title
  font-family: $serif
  font-size: 1rem
  font-weight: 500
  color: $text

.sidebar-role
  font-family: $sans
  font-size: .72rem
  color: $text-muted
  letter-spacing: .08rem
  text-transform: uppercase
  margin-top: .1rem

.sidebar-nav
  flex: 1
  display: flex
  flex-direction: column
  gap: .3rem

.nav-item
  display: flex
  align-items: center
  gap: .8rem
  padding: .7rem 1rem
  border-radius: 8px
  font-family: $sans
  font-size: .88rem
  color: $text-muted
  cursor: pointer
  transition: background .15s, color .15s
  text-decoration: none

  .nav-icon
    font-size: .9rem
    width: 1.2rem
    text-align: center

  &:hover
    background: $off-white
    color: $text

  &.active
    background: $off-white
    color: $text
    font-weight: 500

.sidebar-footer
  border-top: 1px solid $line-soft
  padding-top: 1.5rem
  display: flex
  flex-direction: column
  gap: .8rem

.sidebar-user
  font-family: $sans
  font-size: .78rem
  color: $text-muted
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.nav-footer-mobile
  display: none

.btn-logout
  padding: .6rem 1.2rem
  background: transparent
  border: 1px solid $line
  border-radius: 8px
  font-family: $sans
  font-size: .78rem
  color: $text-muted
  cursor: pointer
  transition: all .2s
  text-align: center

  &:hover
    border-color: $red
    color: $red
    background: $red-bg

// ── Main content ──────────────────────────────────────────
.main-content
  flex: 1
  padding: 2.5rem 3rem
  overflow-y: auto
  min-width: 0

// ── Stats ─────────────────────────────────────────────────
.stats-row
  display: flex
  gap: 1rem
  margin-bottom: 2.5rem

.stat-pill
  flex: 1
  background: $white
  border: 1px solid $line
  border-radius: 12px
  padding: 1.5rem 1.8rem
  display: flex
  flex-direction: column
  gap: .3rem
  transition: box-shadow .2s

  &:hover
    box-shadow: $shadow-md

  &.accent
    background: $text
    border-color: $text

    .stat-val
      color: $white

    .stat-lbl
      color: rgba(255,255,255,0.45)

.stat-val
  font-family: $serif
  font-size: 2.4rem
  font-weight: 400
  color: $text
  line-height: 1

.stat-lbl
  font-family: $sans
  font-size: .72rem
  font-weight: 500
  letter-spacing: .1rem
  text-transform: uppercase
  color: $text-muted

// ── Panel sections ────────────────────────────────────────
.panel-section
  background: $white
  border: 1px solid $line
  border-radius: 16px
  padding: 2.5rem
  margin-bottom: 2rem

.panel-head
  margin-bottom: 2rem
  padding-bottom: 1.5rem
  border-bottom: 1px solid $line-soft

  h2
    font-family: $serif
    font-size: 1.5rem
    font-weight: 400
    color: $text
    margin-bottom: .3rem

  p
    font-family: $sans
    font-size: .85rem
    color: $text-muted

// ── Form grid ─────────────────────────────────────────────
.form-grid
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 1.2rem

  .span-1
    grid-column: span 1

  .span-2
    grid-column: span 2

// ── Filter bar ────────────────────────────────────────────
.filter-bar
  display: flex
  gap: .8rem
  margin-bottom: 1.5rem
  flex-wrap: wrap

.filter-search
  flex: 1
  min-width: 200px
  padding: .7rem 1rem
  font-family: $sans
  font-size: .88rem
  color: $text
  background: $off-white
  border: 1px solid $line
  border-radius: 8px
  outline: none
  transition: border-color .2s

  &::placeholder
    color: $text-muted

  &:focus
    border-color: $gold-soft
    background: $white

.filter-select
  padding: .7rem 2.2rem .7rem 1rem
  font-family: $sans
  font-size: .85rem
  color: $text
  background: $off-white
  border: 1px solid $line
  border-radius: 8px
  outline: none
  appearance: none
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23A8A29E' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")
  background-repeat: no-repeat
  background-position: right .8rem center
  cursor: pointer
  transition: border-color .2s

  &:focus
    border-color: $gold-soft
    background: $white

// ── Joya list ─────────────────────────────────────────────
.joya-list
  display: flex
  flex-direction: column
  gap: .75rem

.joya-row
  display: flex
  align-items: center
  gap: 1.5rem
  padding: 1.2rem 1.4rem
  border: 1px solid $line-soft
  border-radius: 12px
  background: $off-white
  transition: border-color .2s, box-shadow .2s, background .2s

  &:hover
    border-color: $line
    background: $white
    box-shadow: $shadow-sm

.joya-imgs
  display: flex
  gap: .4rem
  flex-shrink: 0

  img
    width: 64px
    height: 64px
    object-fit: cover
    border-radius: 8px
    border: 1px solid $line
    transition: transform .2s

    &:hover
      transform: scale(1.06)

.joya-info
  flex: 1
  min-width: 0

.joya-nombre
  font-family: $serif
  font-size: 1.05rem
  font-weight: 500
  color: $text
  margin-bottom: .2rem
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.joya-meta
  font-family: $sans
  font-size: .75rem
  letter-spacing: .08rem
  text-transform: uppercase
  color: $text-muted
  margin-bottom: .4rem

.joya-precio
  font-family: $serif
  font-size: 1rem
  color: $gold
  font-weight: 500

.joya-status
  display: flex
  flex-direction: column
  gap: .4rem
  flex-shrink: 0

.pill
  display: inline-block
  padding: .25rem .8rem
  border-radius: 999px
  font-family: $sans
  font-size: .7rem
  font-weight: 500
  letter-spacing: .04rem

  &.pill-green
    background: $green-bg
    color: $green

  &.pill-gray
    background: $gray-bg
    color: $gray-text

  &.pill-gold
    background: rgba(184,134,11,0.1)
    color: $gold

.joya-actions
  display: flex
  gap: .5rem
  flex-shrink: 0

.btn-edit
  padding: .5rem 1.1rem
  background: $white
  border: 1px solid $line
  border-radius: 8px
  font-family: $sans
  font-size: .78rem
  font-weight: 500
  color: $text-mid
  cursor: pointer
  transition: all .2s
  white-space: nowrap

  &:hover
    border-color: $text
    color: $text
    background: $off-white

.btn-del
  padding: .5rem 1.1rem
  background: $white
  border: 1px solid $line
  border-radius: 8px
  font-family: $sans
  font-size: .78rem
  font-weight: 500
  color: $text-muted
  cursor: pointer
  transition: all .2s
  white-space: nowrap

  &:hover
    border-color: $red
    color: $red
    background: $red-bg

// ── Modal ─────────────────────────────────────────────────
.modal-overlay
  position: fixed
  inset: 0
  background: rgba(28,25,23,0.45)
  backdrop-filter: blur(6px)
  display: flex
  align-items: center
  justify-content: center
  z-index: 9999
  padding: 2rem
  animation: fadeIn .2s ease

.modal-card
  width: 100%
  max-width: 580px
  background: $white
  border-radius: 20px
  padding: 2.5rem
  box-shadow: $shadow-lg
  max-height: 90vh
  overflow-y: auto
  position: relative
  animation: slideUp .25s cubic-bezier(.16,1,.3,1)

.modal-close
  position: absolute
  top: 1.5rem
  right: 1.5rem
  width: 32px
  height: 32px
  background: $off-white
  border: 1px solid $line
  border-radius: 8px
  font-size: .8rem
  color: $text-muted
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  transition: all .2s

  &:hover
    background: $red-bg
    border-color: $red
    color: $red

.modal-head
  text-align: center
  margin-bottom: 2rem

  .modal-gem
    display: block
    font-size: 1.1rem
    color: $gold
    margin-bottom: .7rem

  h2
    font-family: $serif
    font-size: 1.7rem
    font-weight: 400
    color: $text

.modal-actions
  gap: .8rem
// ── Email overlay ─────────────────────────────────────────
.email-overlay
  position: fixed
  inset: 0
  background: rgba(28,25,23,0.6)
  backdrop-filter: blur(8px)
  display: flex
  align-items: center
  justify-content: center
  z-index: 99999

.email-popup
  background: $white
  border-radius: 20px
  padding: 3rem 2.5rem
  text-align: center
  max-width: 360px
  width: 90%
  box-shadow: $shadow-lg
  display: flex
  flex-direction: column
  gap: 1rem

.email-gem
  font-size: 2rem
  margin: 0

  h3
    font-family: $serif
    font-size: 1.5rem
    font-weight: 400
    color: $text

.email-count
  font-family: $sans
  font-size: 1rem
  color: $text-mid

.email-barra
  width: 100%
  height: 4px
  background: $line
  border-radius: 999px
  overflow: hidden

.email-relleno
  height: 100%
  background: $gold
  border-radius: 999px
  transition: width 0.5s ease

.email-sub
  font-family: $sans
  font-size: .78rem
  color: $text-muted
// ── Animations ────────────────────────────────────────────
@keyframes fadeIn
  from
    opacity: 0
  to
    opacity: 1

@keyframes slideUp
  from
    opacity: 0
    transform: translateY(12px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes spin
  to
    transform: rotate(360deg)

// ── Responsive ────────────────────────────────────────────
@media (max-width: 1024px)
  .main-content
    padding: 2rem 1.5rem

@media (max-width: 768px)
  // ... tus estilos existentes ...

  .joya-row
    flex-direction: column
    align-items: flex-start
    gap: 0.75rem
    padding: 1rem

  .joya-imgs
    width: 100%
    gap: 0.5rem

    img
      width: 72px
      height: 72px
      border-radius: 8px

  .joya-info
    width: 100%

    .joya-nombre
      white-space: normal
      font-size: 1rem

    .joya-meta
      font-size: 0.72rem

    .joya-precio
      font-size: 0.95rem

  .joya-status
    flex-direction: row
    flex-wrap: wrap
    gap: 0.4rem
    width: 100%

  .joya-actions
    width: 100%
    justify-content: stretch
    gap: 0.5rem

    .btn-edit,
    .btn-del
      flex: 1
      text-align: center
      padding: 0.6rem 0
      font-size: 0.82rem

// ── Responsive ────────────────────────────────────────────
@media (max-width: 1024px)
  .main-content
    padding: 2rem 1.5rem

.btn-menu-toggle
  display: none

@media (max-width: 768px)
  .auth
    flex-direction: column

  .auth-left
    padding: 3rem 2rem
    min-height: 200px

    .brand-name
      font-size: 2.8rem

  .auth-right
    width: 100%
    padding: 2rem 1.5rem

  .admin-panel
    flex-direction: column

  .sidebar
    width: 100%
    height: auto
    position: sticky
    top: 0
    z-index: 100
    padding: 1rem 1.5rem
    border-right: none
    border-bottom: 1px solid $line
    background: $white

  .sidebar-brand
    display: flex
    align-items: center
    gap: 1rem
    padding-bottom: 0
    border-bottom: none
    margin-bottom: 0

  .btn-menu-toggle
    display: flex
    align-items: center
    justify-content: center
    margin-left: auto
    width: 36px
    height: 36px
    background: $off-white
    border: 1px solid $line
    border-radius: 8px
    font-size: 1rem
    color: $text-mid
    cursor: pointer
    transition: all .2s
    flex-shrink: 0

    &:hover
      background: $bg
      border-color: $text-mid

  .sidebar-nav
    display: none
    flex-direction: column
    gap: .3rem
    padding-top: 1rem
    margin-top: 1rem
    border-top: 1px solid $line-soft

    &.abierto
      display: flex

  .sidebar-footer
    display: none

  .nav-footer-mobile
    margin-top: .5rem
    padding-top: 1rem
    border-top: 1px solid $line-soft
    display: flex
    flex-direction: column
    gap: .8rem

    .sidebar-user
      font-family: $sans
      font-size: .78rem
      color: $text-muted
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

    .btn-logout
      padding: .6rem 1.2rem
      background: transparent
      border: 1px solid $line
      border-radius: 8px
      font-family: $sans
      font-size: .78rem
      color: $text-muted
      cursor: pointer
      transition: all .2s
      text-align: center

      &:hover
        border-color: $red
        color: $red
        background: $red-bg

  .main-content
    padding: 1.5rem 1rem

  .stats-row
    flex-direction: column

  .form-grid
    grid-template-columns: 1fr

    .span-1, .span-2
      grid-column: span 1

  .joya-row
    flex-wrap: wrap
    gap: 1rem

  .joya-actions
    width: 100%
    justify-content: flex-end

  .modal-card
    padding: 2rem 1.5rem

  // ── Paginación ────────────────────────────────────────────
.paginacion
  display: flex
  justify-content: center
  align-items: center
  gap: 6px
  margin-top: 1.5rem
  padding-top: 1.5rem
  border-top: 1px solid $line-soft

.pag-btn
  min-width: 36px
  height: 36px
  padding: 0 10px
  border-radius: 8px
  border: 1px solid $line
  background: $white
  font-family: $sans
  font-size: 0.82rem
  color: $text
  cursor: pointer
  display: flex
  align-items: center
  justify-content: center
  transition: all .2s

  &:hover:not(:disabled)
    background: $off-white
    border-color: $text-muted

  &:disabled
    opacity: 0.3
    cursor: not-allowed

  &.activo
    background: $text
    color: $white
    border-color: $text
    font-weight: 500
</style>
