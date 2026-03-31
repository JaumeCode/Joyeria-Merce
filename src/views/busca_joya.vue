<template>
    <div id="buscar_joya">
        <header_all class="header_fixed" />

        <!-- INTRO -->
        <section class="intro" v-if="paso === 0">
            <div class="intro_contenido">
                <span class="intro_sym">✦</span>
                <h1>Encuentra tu<br><em>joya ideal</em></h1>
                <p>Responde unas pocas preguntas y te ayudamos a encontrar la pieza perfecta de nuestra colección.</p>
                <button class="btn_inicio" @click="empezar">Empezar</button>
            </div>
            <div class="intro_deco">
                <div class="deco_anillo"></div>
                <div class="deco_anillo deco_2"></div>
                <div class="deco_anillo deco_3"></div>
            </div>
        </section>

        <!-- QUIZ -->
        <section class="quiz" v-else-if="paso >= 1 && paso <= preguntas.length">
            <div class="quiz_inner">

                <!-- Progreso -->
                <div class="progreso">
                    <div class="progreso_barra">
                        <div class="progreso_relleno" :style="{ width: ((paso - 1) / preguntas.length * 100) + '%' }"></div>
                    </div>
                    <span class="progreso_texto">{{ paso }} / {{ preguntas.length }}</span>
                </div>

                <!-- Pregunta -->
                <transition name="slide" mode="out-in">
                    <div class="pregunta_bloque" :key="paso">
                        <span class="pregunta_num">0{{ paso }}</span>
                        <h2 class="pregunta_texto">{{ preguntaActual.texto }}</h2>
                        <p class="pregunta_sub" v-if="preguntaActual.sub">{{ preguntaActual.sub }}</p>

                        <div class="opciones" :class="preguntaActual.grid ? 'opciones_grid' : 'opciones_fila'">
                            <button
                                v-for="op in preguntaActual.opciones"
                                :key="op.valor"
                                class="opcion_btn"
                                :class="{ seleccionada: respuestas[preguntaActual.clave] === op.valor }"
                                @click="responder(preguntaActual.clave, op.valor)"
                            >
                                <span class="opcion_icono">{{ op.icono }}</span>
                                <span class="opcion_label">{{ op.label }}</span>
                                <span v-if="op.desc" class="opcion_desc">{{ op.desc }}</span>
                            </button>
                        </div>

                        <div class="quiz_nav">
                            <button class="btn_volver" v-if="paso > 1" @click="volver">← Volver</button>
                            <button
                                class="btn_siguiente"
                                v-if="respuestas[preguntaActual.clave] !== undefined"
                                @click="siguiente"
                            >
                                {{ paso === preguntas.length ? 'Ver resultados ✦' : 'Siguiente →' }}
                            </button>
                        </div>
                    </div>
                </transition>

            </div>
        </section>

        <!-- RESULTADOS -->
        <!-- RESULTADOS -->
        <section class="resultados" v-else-if="paso === preguntas.length + 1">
            <div class="resultados_header">
                <span class="res_sym">✦</span>
                <h2>Tu selección</h2>
                <p v-if="joyasFiltradas.length > 0">
                    Hemos encontrado <strong>{{ joyasFiltradas.length }}</strong> {{ joyasFiltradas.length === 1 ? 'joya' : 'joyas' }} que encajan contigo
                </p>
                <p v-else>No hay coincidencias exactas, pero estas piezas pueden interesarte</p>
            </div>

            <!-- Resumen respuestas -->
            <div class="resumen">
                <span v-for="(val, key) in respuestas" :key="key" class="resumen_tag">
                    {{ etiquetaRespuesta(key, val) }}
                </span>
                <button class="btn_reiniciar_mini" @click="reiniciar">Cambiar filtros</button>
            </div>

            <!-- Cargando -->
            <div class="cargando" v-if="cargando">
                <div class="loader-inner">
                    <div class="loader-ring"></div>
                    <span>✦</span>
                </div>
            </div>

            <!-- Cards con resultados -->
            <div class="cards_grid" v-else-if="joyasFiltradas.length > 0">
                <card_jewlery
                    v-for="joya in joyasFiltradas"
                    :key="joya.id"
                    :id="joya.id"
                    :imagen="joya.imagenes[0] || '/default.jpg'"
                    :nombre="joya.nombre"
                    :descripcion="joya.descripcion"
                    textoBoton="Ver detalles"
                    :novedad="esnovedad(joya.fecha_creacion)"
                    :material="joya.material"
                    :medidas="joya.medidas"
                    :slug="joya.slug"
                />
            </div>

            <!-- Sin resultados exactos -->
            <div class="sin_resultados" v-else>
                <div class="sr_aviso">
                    <span class="sr_icono">◇</span>
                    <h3>Sin coincidencias exactas</h3>
                    <p>No hemos encontrado joyas que cumplan todos tus filtros. Aquí tienes algunas piezas que pueden inspirarte:</p>
                </div>
                <div class="sr_separador">
                    <span>Sugerencias para ti</span>
                </div>
                <div class="cards_grid">
                    <card_jewlery
                        v-for="joya in joyasSugeridas"
                        :key="joya.id"
                        :id="joya.id"
                        :slug="joya.slug"
                        :imagen="joya.imagenes[0] || '/default.jpg'"
                        :nombre="joya.nombre"
                        :descripcion="joya.descripcion"
                        textoBoton="Ver detalles"
                        :novedad="esnovedad(joya.fecha_creacion)"
                        :material="joya.material"
                        :medidas="joya.medidas"
                        
                    />
                </div>
            </div>

            <div class="resultados_footer">
                <button class="btn_reiniciar" @click="reiniciar">Volver a empezar</button>
                <button class="btn_catalogo" @click="irCatalogo">Ver catálogo completo</button>
            </div>
        </section>

        <section class="footer" v-if="paso === 0 || paso === preguntas.length + 1">
            <footer_component />
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useJoyasPublicasStore } from '@/stores/joyas'
import { useHead } from '@vueuse/head'
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'
import card_jewlery from '@/components/card_jewlery.vue'

useHead({
    title: 'Encuentra tu joya ideal | Joyería Mercè en Puerto de Sagunto, Valencia',
    meta: [
        // SEO básico
        {
            name: 'description',
            content: 'Responde nuestro quiz y encuentra la joya perfecta en Joyería Mercè. Piezas únicas, materiales de calidad y atención personalizada en Puerto de Sagunto, Valencia.'
        },
        {
            name: 'keywords',
            content: 'joyería Puerto de Sagunto, joyería Valencia, joyas personalizadas, anillos, pulseras, colgantes, pendientes, regalos joyería, joyería artesanal Valencia'
        },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Joyería Mercè' },

        // Open Graph (Facebook, WhatsApp, etc.)
        { property: 'og:title', content: 'Encuentra tu joya ideal | Joyería Mercè' },
        { property: 'og:description', content: 'Responde nuestro quiz y descubre la joya que mejor se adapta a ti o a tu regalo especial. Calidad y diseño en Puerto de Sagunto.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://joyeriamerce.es/buscar-joya' },
        { property: 'og:locale', content: 'es_ES' },
        { property: 'og:site_name', content: 'Joyería Mercè' },
        { property: 'og:image', content: 'https://joyeriamerce.es/og-image-buscar-joya.jpg' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Encuentra tu joya ideal | Joyería Mercè' },
        { name: 'twitter:description', content: 'Responde nuestro quiz y encuentra la joya perfecta en Joyería Mercè. Piezas únicas y atención personalizada en Valencia.' },
        { name: 'twitter:image', content: 'https://joyeriamerce.es/twitter-image-buscar-joya.jpg' },

        // SEO local
        { name: 'geo.region', content: 'ES-VC' },
        { name: 'geo.placename', content: 'Puerto de Sagunto, Valencia' },
        { name: 'geo.position', content: '39.6333;-0.2167' },
        { name: 'ICBM', content: '39.6333, -0.2167' }
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://joyeriamerce.es/buscar-joya'
        }
    ]
})

const router = useRouter()
const store = useJoyasPublicasStore()
const cargando = ref(false)
const paso = ref(0)
const respuestas = ref({})

// ── Preguntas del quiz ────────────────────────────────────
const preguntas = [
    {
        clave: 'para',
        texto: '¿Para quién es la joya?',
        sub: 'Esto nos ayuda a personalizar la búsqueda',
        grid: false,
        opciones: [
            { valor: 'yo', label: 'Para mí', icono: '◈', desc: 'Me la quiero regalar' },
            { valor: 'regalo', label: 'Para regalar', icono: '◇', desc: 'Es un regalo especial' },
        ]
    },
    {
        clave: 'ocasion',
        texto: '¿Cuál es la ocasión?',
        sub: null,
        grid: true,
        opciones: [
            { valor: 'diario', label: 'Uso diario', icono: '☀' },
            { valor: 'cumpleanos', label: 'Cumpleaños', icono: '✦' },
            { valor: 'aniversario', label: 'Aniversario', icono: '♡' },
            { valor: 'pedida', label: 'Pedida de mano', icono: '◉' },
            { valor: 'capricho', label: 'Sin ocasión especial', icono: '◇' },
        ]
    },
    {
        clave: 'tipo',
        texto: '¿Qué tipo de joya buscas?',
        sub: null,
        grid: true,
        opciones: [
            { valor: 'anillos', label: 'Anillo', icono: '◎' },
            { valor: 'pulseras', label: 'Pulsera', icono: '◌' },
            { valor: 'cadenas', label: 'Cadena', icono: '⌀' },
            { valor: 'colgantes', label: 'Colgante', icono: '◈' },
            { valor: 'pendientes', label: 'Pendientes', icono: '◇' },
        ]
    },
    {
        clave: 'material',
        texto: '¿Qué material prefieres?',
        sub: null,
        grid: true,
        opciones: [
            { valor: 'oro', label: 'Oro', icono: '✦' },
            { valor: 'plata', label: 'Plata', icono: '◈' },
            { valor: 'acero', label: 'Acero', icono: '◇' },
            { valor: 'cualquiera', label: 'Sin preferencia', icono: '◉' },
        ]
    },
    {
        clave: 'presupuesto',
        texto: '¿Cuál es tu presupuesto?',
        sub: 'Orientativo, para mostrarte lo más adecuado',
        grid: true,
        opciones: [
            { valor: 'bajo', label: 'Hasta 50€', icono: '◇' },
            { valor: 'medio', label: '50 – 150€', icono: '◈' },
            { valor: 'alto', label: '150 – 300€', icono: '✦' },
            { valor: 'premium', label: 'Más de 300€', icono: '◉' },
        ]
    }
]

const preguntaActual = computed(() => preguntas[paso.value - 1])

// ── Navegación ────────────────────────────────────────────
const empezar = () => { paso.value = 1 }

const responder = (clave, valor) => {
    respuestas.value[clave] = valor
}

const siguiente = async () => {
    if (paso.value === preguntas.length) {
        cargando.value = true
        if (store.todas.length === 0) await store.obtener_joya()
        cargando.value = false
        paso.value++
    } else {
        paso.value++
    }
}

const volver = () => {
    paso.value--
}

const reiniciar = () => {
    respuestas.value = {}
    paso.value = 0
    window.scrollTo(0, 0)
}

const irCatalogo = async () => {
    await router.push('/catalogo')
    window.scrollTo(0, 0)
}

// ── Filtrado ──────────────────────────────────────────────
const rangosPresupuesto = {
    bajo: [0, 50],
    medio: [50, 150],
    alto: [150, 300],
    premium: [300, Infinity]
}

const joyasFiltradas = computed(() => {
    const r = respuestas.value
    const [min, max] = rangosPresupuesto[r.presupuesto] || [0, Infinity]

    return store.todas.filter(j => {
        if (!j.disponible) return false
        if (r.tipo && j.tipo !== r.tipo) return false
        if (r.material && r.material !== 'cualquiera' && j.material !== r.material) return false
        if (j.precio < min || j.precio > max) return false

        // Filtro por ocasión → sección
        if (r.ocasion === 'pedida' && j.seccion !== 'pedidas') return false
        if (r.para === 'regalo' && r.ocasion !== 'pedida' && j.seccion === 'pedidas') return false

        return true
    })
})

// Sugerencias si no hay resultados exactos
const joyasSugeridas = computed(() => {
    return store.todas
        .filter(j => j.disponible)
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)
})

// ── Etiquetas resumen ─────────────────────────────────────
const mapaEtiquetas = {
    para: { yo: 'Para mí', regalo: 'Para regalar' },
    ocasion: { diario: 'Uso diario', cumpleanos: 'Cumpleaños', aniversario: 'Aniversario', pedida: 'Pedida de mano', capricho: 'Sin ocasión' },
    tipo: { anillos: 'Anillo', pulseras: 'Pulsera', cadenas: 'Cadena', colgantes: 'Colgante', pendientes: 'Pendientes' },
    material: { oro: 'Oro', plata: 'Plata', acero: 'Acero', cualquiera: 'Cualquier material' },
    presupuesto: { bajo: 'Hasta 50€', medio: '50–150€', alto: '150–300€', premium: '+300€' }
}

const etiquetaRespuesta = (clave, valor) => mapaEtiquetas[clave]?.[valor] || valor

// ── Novedades ─────────────────────────────────────────────
const esnovedad = (fecha_creacion) => {
    const dossemanas = 14 * 24 * 60 * 60 * 1000
    return Date.now() - fecha_creacion < dossemanas
}

onMounted(async () => {
    if (store.todas.length === 0) await store.obtener_joya()
})
</script>

<style lang="sass" scoped>

$oscuro:      #1a1a1a
$crema:       #EDE9D8
$blanco:      #FAFAF7
$dorado:      #B8860B
$dorado_soft: rgba(184,134,11,0.10)
$gris:        #666
$linea:       rgba(0,0,0,0.08)

// ── Base ──────────────────────────────────────────────────
#buscar_joya
    margin: 0
    padding: 0
    min-height: 100vh
    background-color: $crema

    .header_fixed
        position: fixed
        width: 100%
        z-index: 100000

// ── Loader ────────────────────────────────────────────────
.cargando
    display: flex
    justify-content: center
    align-items: center
    height: 200px

.loader-inner
    position: relative
    width: 56px
    height: 56px
    display: flex
    align-items: center
    justify-content: center

    span
        font-size: 1.1rem
        color: $dorado
        animation: spin 3s linear infinite

.loader-ring
    position: absolute
    inset: 0
    border: 1.5px solid rgba(0,0,0,0.08)
    border-top-color: $dorado
    border-radius: 50%
    animation: spin 1s linear infinite

// ── INTRO ─────────────────────────────────────────────────
.intro
    min-height: 100vh
    display: flex
    align-items: center
    justify-content: center
    position: relative
    overflow: hidden
    padding: 2rem
    background-color: $crema

    .intro_contenido
        position: relative
        z-index: 2
        text-align: center
        display: flex
        flex-direction: column
        align-items: center
        gap: 1.5rem
        animation: fadeUp 0.8s ease both

        .intro_sym
            font-size: 2rem
            color: $dorado
            animation: pulse 3s ease infinite

        h1
            font-family: 'Playfair Display', serif
            font-size: 4rem
            font-weight: 600
            color: $oscuro
            line-height: 1.15
            letter-spacing: 0.02rem

            em
                font-style: italic
                color: $dorado

        p
            font-size: 1rem
            color: $gris
            max-width: 420px
            line-height: 1.7

        .btn_inicio
            margin-top: 0.5rem
            padding: 1rem 3rem
            background-color: $oscuro
            color: $crema
            border: none
            font-family: 'Playfair Display', serif
            font-size: 1rem
            font-weight: 600
            letter-spacing: 0.15rem
            cursor: pointer
            transition: all 0.3s ease

            &:hover
                background-color: $dorado
                color: $oscuro
                transform: translateY(-2px)

    .intro_deco
        position: absolute
        inset: 0
        pointer-events: none

        .deco_anillo
            position: absolute
            border-radius: 50%
            border: 1px solid rgba(184,134,11,0.12)

            &:nth-child(1)
                width: 500px
                height: 500px
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)

            &.deco_2
                width: 750px
                height: 750px
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)

            &.deco_3
                width: 1000px
                height: 1000px
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)

    @media (max-width: 768px)
        .intro_contenido
            h1
                font-size: 2.5rem

// ── QUIZ ──────────────────────────────────────────────────
.quiz
    min-height: 100vh
    display: flex
    align-items: center
    justify-content: center
    padding: 8rem 2rem 4rem
    background-color: $crema

    .quiz_inner
        width: 100%
        max-width: 680px
        display: flex
        flex-direction: column
        gap: 2.5rem

// Progreso
.progreso
    display: flex
    align-items: center
    gap: 1rem

    .progreso_barra
        flex: 1
        height: 2px
        background-color: rgba(0,0,0,0.08)
        border-radius: 999px
        overflow: hidden

        .progreso_relleno
            height: 100%
            background-color: $dorado
            border-radius: 999px
            transition: width 0.5s cubic-bezier(.4,0,.2,1)

    .progreso_texto
        font-size: 0.75rem
        letter-spacing: 0.2rem
        color: rgba(0,0,0,0.3)
        font-family: 'Playfair Display', serif

// Pregunta
.pregunta_bloque
    display: flex
    flex-direction: column
    gap: 1.5rem

    .pregunta_num
        font-family: 'Playfair Display', serif
        font-size: 0.75rem
        letter-spacing: 0.3rem
        color: $dorado
        opacity: 0.7

    .pregunta_texto
        font-family: 'Playfair Display', serif
        font-size: 2.2rem
        font-weight: 500
        color: $oscuro
        line-height: 1.2

    .pregunta_sub
        font-size: 0.88rem
        color: $gris
        opacity: 0.7
        margin-top: -0.8rem

// Opciones
.opciones
    display: flex
    gap: 1rem
    flex-wrap: wrap

    &.opciones_fila
        flex-direction: row

    &.opciones_grid
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))

.opcion_btn
    display: flex
    flex-direction: column
    align-items: center
    gap: 0.5rem
    padding: 1.4rem 1rem
    background-color: $blanco
    border: 1px solid rgba(0,0,0,0.08)
    border-radius: 12px
    cursor: pointer
    transition: all 0.25s ease
    color: $oscuro
    text-align: center
    flex: 1
    min-width: 130px

    &:hover
        background-color: $dorado_soft
        border-color: rgba(184,134,11,0.35)
        transform: translateY(-2px)
        box-shadow: 0 4px 16px rgba(0,0,0,0.06)

    &.seleccionada
        background-color: $dorado_soft
        border-color: $dorado
        transform: translateY(-2px)
        box-shadow: 0 4px 16px rgba(184,134,11,0.12)

        .opcion_icono
            color: $dorado

    .opcion_icono
        font-size: 1.4rem
        color: rgba(0,0,0,0.25)
        transition: color 0.2s

    .opcion_label
        font-family: 'Playfair Display', serif
        font-size: 0.9rem
        font-weight: 500
        color: $oscuro

    .opcion_desc
        font-size: 0.72rem
        color: $gris
        opacity: 0.7
        line-height: 1.4

// Navegación quiz
.quiz_nav
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 0.5rem

    .btn_volver
        background: transparent
        border: none
        color: rgba(0,0,0,0.35)
        font-size: 0.88rem
        cursor: pointer
        letter-spacing: 0.05rem
        transition: color 0.2s

        &:hover
            color: $oscuro

    .btn_siguiente
        padding: 0.9rem 2.5rem
        background-color: $oscuro
        color: $crema
        border: none
        font-family: 'Playfair Display', serif
        font-size: 0.9rem
        font-weight: 600
        letter-spacing: 0.1rem
        cursor: pointer
        transition: all 0.25s ease

        &:hover
            background-color: $dorado
            color: $oscuro
            transform: translateY(-1px)

// ── RESULTADOS ────────────────────────────────────────────
.resultados
    min-height: 100vh
    padding: 8rem 2rem 6rem
    display: flex
    flex-direction: column
    align-items: center
    gap: 3rem
    background-color: $crema

    .resultados_header
        text-align: center
        display: flex
        flex-direction: column
        align-items: center
        gap: 0.8rem
        animation: fadeUp 0.6s ease both

        .res_sym
            font-size: 1.5rem
            color: $dorado

        h2
            font-family: 'Playfair Display', serif
            font-size: 2.5rem
            color: $oscuro
            font-weight: 500

        p
            font-size: 0.95rem
            color: $gris

            strong
                color: $dorado

// Resumen tags
.resumen
    display: flex
    flex-wrap: wrap
    justify-content: center
    gap: 0.6rem
    max-width: 700px

    .resumen_tag
        padding: 0.4rem 1rem
        background-color: $blanco
        border: 1px solid rgba(0,0,0,0.08)
        border-radius: 999px
        font-size: 0.75rem
        letter-spacing: 0.1rem
        color: $gris

    .btn_reiniciar_mini
        padding: 0.4rem 1rem
        background: transparent
        border: 1px solid rgba(184,134,11,0.4)
        border-radius: 999px
        font-size: 0.75rem
        letter-spacing: 0.1rem
        color: $dorado
        cursor: pointer
        transition: all 0.2s

        &:hover
            background-color: $dorado_soft

// Cards grid
.cards_grid
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))
    gap: 1.5rem
    width: 100%
    max-width: 1100px

// Footer resultados
.resultados_footer
    display: flex
    gap: 1rem
    flex-wrap: wrap
    justify-content: center
    margin-top: 1rem

    .btn_reiniciar
        padding: 0.9rem 2rem
        background: transparent
        border: 1px solid rgba(0,0,0,0.15)
        color: $gris
        font-size: 0.88rem
        letter-spacing: 0.08rem
        cursor: pointer
        transition: all 0.2s

        &:hover
            border-color: $oscuro
            color: $oscuro

    .btn_catalogo
        padding: 0.9rem 2rem
        background-color: $oscuro
        border: none
        color: $crema
        font-family: 'Playfair Display', serif
        font-size: 0.88rem
        font-weight: 600
        letter-spacing: 0.1rem
        cursor: pointer
        transition: all 0.25s ease

        &:hover
            background-color: $dorado
            color: $oscuro
            transform: translateY(-1px)
// ── Sin resultados ────────────────────────────────────────
.sin_resultados
    display: flex
    flex-direction: column
    align-items: center
    gap: 2rem
    width: 100%
    max-width: 1100px

    .sr_aviso
        display: flex
        flex-direction: column
        align-items: center
        gap: 0.8rem
        text-align: center
        background-color: $blanco
        border: 1px solid rgba(0,0,0,0.07)
        border-radius: 12px
        padding: 2.5rem 3rem
        max-width: 520px
        width: 100%

        .sr_icono
            font-size: 1.8rem
            color: rgba(0,0,0,0.15)

        h3
            font-family: 'Playfair Display', serif
            font-size: 1.3rem
            color: $oscuro
            font-weight: 500

        p
            font-size: 0.88rem
            color: $gris
            line-height: 1.7
            max-width: 380px

    .sr_separador
        display: flex
        align-items: center
        gap: 1rem
        width: 100%
        max-width: 600px

        &::before, &::after
            content: ''
            flex: 1
            height: 1px
            background-color: rgba(0,0,0,0.08)

        span
            font-size: 0.72rem
            letter-spacing: 0.2rem
            text-transform: uppercase
            color: rgba(0,0,0,0.3)
            white-space: nowrap
// ── Transición entre preguntas ────────────────────────────
.slide-enter-active,
.slide-leave-active
    transition: all 0.3s cubic-bezier(.4,0,.2,1)

.slide-enter-from
    opacity: 0
    transform: translateX(30px)

.slide-leave-to
    opacity: 0
    transform: translateX(-30px)

// ── Animations ────────────────────────────────────────────
@keyframes fadeUp
    from
        opacity: 0
        transform: translateY(20px)
    to
        opacity: 1
        transform: translateY(0)

@keyframes pulse
    0%, 100%
        opacity: 1
    50%
        opacity: 0.4

@keyframes spin
    to
        transform: rotate(360deg)

// ── Responsive ────────────────────────────────────────────
@media (max-width: 768px)
    .quiz
        padding: 7rem 1.2rem 3rem

        .pregunta_texto
            font-size: 1.6rem

    .opciones.opciones_fila
        flex-direction: column

    .opciones.opciones_grid
        grid-template-columns: 1fr 1fr

    .cards_grid
        grid-template-columns: 1fr

    .resultados
        padding: 7rem 1.2rem 4rem

</style>