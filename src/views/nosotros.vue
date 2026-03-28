<template>
    <div id="sobre_nosotros">
        <header_all class="header_fixed" />

        <!-- HERO -->
        <section class="hero reveal">
            <div class="hero_contenido">
                <span class="etiqueta">Sobre Nosotros</span>
                <h1>Una joyería de<br>Puerto de Sagunto<br><em>hecha con alma</em></h1>
                <div class="linea_deco"></div>
                <p>En Joyería Mercè cada cliente es único. Nos tomamos el tiempo necesario para entenderte y acompañarte en cada decisión, porque sabemos que detrás de cada joya hay un momento especial.</p>
            </div>
            <div class="hero_imagen">
                <div class="placeholder_img">
                    <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fsobre-nosotros-1.webp?alt=media&token=252607d2-9d7d-4069-9b90-e0a87fae7696" alt="muestra de colgante">
                </div>
            </div>
        </section>

        <!-- VALORES -->
        <section class="valores reveal">
            <div class="valores_titulo">
                <h2>Lo que nos define</h2>
            </div>
            <div class="valores_grid">
                <div class="valor_card">
                    <div class="valor_icono">◈</div>
                    <h3>Calidad ante todo</h3>
                    <p>Trabajamos únicamente con materiales de primera calidad. Cada pieza pasa por nuestras manos y sale de la tienda respaldada por nuestra rigurosa selección y control de calidad.</p>
                </div>
                <div class="valor_card">
                    <div class="valor_icono">◇</div>
                    <h3>Trato cercano y personal</h3>
                    <p>No somos una cadena ni un comercio masivo. Somos una tienda tradicional donde te conocemos por tu nombre y nos importa que salgas satisfecho.</p>
                </div>
                <div class="valor_card">
                    <div class="valor_icono">✦</div>
                    <h3>Atención personalizada</h3>
                    <p>Cada compra es diferente. Te escuchamos, entendemos lo que buscas y te ayudamos a encontrar la joya perfecta para ti o para quien quieres regalar.</p>
                </div>
                <div class="valor_card">
                    <div class="valor_icono">◉</div>
                    <h3>Satisfacción garantizada</h3>
                    <p>No cerramos la venta hasta que estás seguro. Nuestro objetivo es que cada cliente cruce la puerta con una sonrisa y vuelva cuando lo necesite.</p>
                </div>
            </div>
        </section>

        <!-- CITA / FRASE -->
        <section class="frase reveal">
            <div class="frase_contenido">
                <span class="comilla">"</span>
                <blockquote>Cada joya cuenta una historia.<br>Nosotros te ayudamos a escribir la tuya.</blockquote>
                <span class="firma">— Joyería Mercè, Puerto de Sagunto</span>
            </div>
        </section>

        <!-- TIENDA FISICA -->
        <section class="tienda reveal">
            <div class="tienda_imagen">
                <div class="placeholder_img">
                    <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fsobre-nosotros-2.webp?alt=media&token=b7035255-50e5-4ce1-8abd-ee700355427a" alt="Escaparate joya">
                </div>
            </div>
            <div class="tienda_texto">
                <span class="etiqueta">Visítanos</span>
                <h2>Vendemos Exclusivamente en Tienda</h2>
                <p>Creemos que una joya se elige en persona. Queremos que puedas tocarla, probarla y sentir que es la correcta antes de llevártela. Por eso queremos atenderte en persona, para que disfrutes de la confianza que ofrece el trato personalizado.</p>
                <div class="tienda_datos">
                    <div class="dato">
                        <span class="dato_icono">◎</span>
                        <div>
                            <strong>Dirección</strong>
                            <p>Carrer del Trovador, 67<br>Puerto de Sagunto, Valencia</p>
                        </div>
                    </div>
                    <div class="dato">
                        <span class="dato_icono">◎</span>
                        <div>
                            <strong>Contacto</strong>
                            <p>+34 666 238 158<br>Escríbenos por WhatsApp</p>
                        </div>
                    </div>
                </div>
                <button @click="abrir_mapa">Ver en el mapa</button>
            </div>
        </section>

        <section class="footer">
            <footer_component />
        </section>
    </div>
</template>

<script setup>
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'
import { onMounted } from 'vue'
import { useHead } from '@vueuse/head'

useHead({
    title: 'Joyería en Puerto de Sagunto | Joyería Mercè Valencia',
    meta: [
        {
            name: 'description',
            content: 'Joyería en Puerto de Sagunto, Valencia. Encuentra anillos, collares, pulseras y regalos especiales con atención personalizada en tienda física.'
        },

        // SEO adicional
        {
            name: 'keywords',
            content: 'joyería Puerto de Sagunto, joyería Valencia, anillos, collares, pulseras, tienda de joyas Valencia, regalos joyería'
        },

        // Open Graph (Facebook, WhatsApp)
        {
            property: 'og:title',
            content: 'Joyería Mercè | Puerto de Sagunto, Valencia'
        },
        {
            property: 'og:description',
            content: 'Descubre una joyería en Puerto de Sagunto con atención personalizada y piezas para cada ocasión. Visítanos en tienda.'
        },
        {
            property: 'og:type',
            content: 'website'
        },

        // Twitter
        {
            name: 'twitter:card',
            content: 'summary_large_image'
        },
        {
            name: 'twitter:title',
            content: 'Joyería Mercè | Valencia'
        },
        {
            name: 'twitter:description',
            content: 'Joyería en Puerto de Sagunto con atención cercana y piezas para cada ocasión.'
        }
    ]
})

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible')
                observer.unobserve(e.target)
            }
        })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

const abrir_mapa = () => {
    window.open("https://maps.app.goo.gl/657WkNQ8XZuNJeYX8")
}
</script>

<style lang="sass" scoped>

// ── Variables ─────────────────────────────────────────────────
$crema: #EDE9D8
$oscuro: #1a1a1a
$gris: #444
$dorado: #B8860B

// ── Reveal ────────────────────────────────────────────────────
.reveal
    opacity: 0
    transform: translateY(40px)
    transition: opacity 0.7s ease, transform 0.7s ease

    &.visible
        opacity: 1
        transform: translateY(0)

// ── Global ────────────────────────────────────────────────────
#sobre_nosotros
    margin: 0
    padding: 0

    .header_fixed
        position: fixed
        width: 100%
        z-index: 100000

// ── Etiqueta pequeña ─────────────────────────────────────────
.etiqueta
    font-size: 0.75rem
    letter-spacing: 0.3rem
    text-transform: uppercase
    color: $dorado
    display: block
    margin-bottom: 1rem

// ── HERO ──────────────────────────────────────────────────────
.hero
    display: flex
    align-items: center
    justify-content: center
    gap: 6rem
    padding: 12rem 6rem 8rem
    min-height: 100vh
    background-color: $oscuro

    .hero_contenido
        max-width: 520px
        display: flex
        flex-direction: column

        h1
            font-family: 'Playfair Display', serif
            font-size: 3.5rem
            font-weight: 600
            color: $crema
            line-height: 1.2
            letter-spacing: 0.02rem
            margin: 0 0 1.5rem

            em
                font-style: italic
                color: $dorado

        .linea_deco
            width: 60px
            height: 1px
            background-color: $dorado
            margin-bottom: 1.5rem

        p
            font-size: 1rem
            color: $crema
            opacity: 0.65
            line-height: 1.8
            max-width: 440px

    .hero_imagen
        flex-shrink: 0

    @media (max-width: 768px)
        flex-direction: column
        padding: 10rem 1.5rem 5rem
        gap: 3rem
        text-align: center

        .hero_contenido
            align-items: center

            h1
                font-size: 2.2rem

            .linea_deco
                margin: 0 auto 1.5rem

        p
            font-size: 0.9rem

// ── Placeholder imagen ────────────────────────────────────────
.placeholder_img
    width: 380px
    height: 460px
    background-color: rgba(255,255,255,0.04)
    border: 1px solid rgba(255,255,255,0.1)
    border-radius: 12px
    overflow: hidden // IMPORTANTE

    img
        width: 100%
        height: 100%
        object-fit: cover // 🔥 clave para que se vea bien
        display: block

// ── VALORES ───────────────────────────────────────────────────
.valores
    padding: 8rem 4rem
    background-color: $crema
    display: flex
    flex-direction: column
    align-items: center
    gap: 4rem

    .valores_titulo
        text-align: center

        h2
            font-family: 'Playfair Display', serif
            font-size: 2rem
            font-weight: 600
            color: $oscuro
            letter-spacing: 0.05rem

    .valores_grid
        display: grid
        grid-template-columns: repeat(2, 1fr)
        gap: 2rem
        max-width: 900px
        width: 100%

        .valor_card
            background-color: white
            border-radius: 12px
            padding: 2.5rem 2rem
            display: flex
            flex-direction: column
            gap: 0.8rem
            border: 1px solid rgba(0,0,0,0.06)
            transition: transform 0.3s ease, box-shadow 0.3s ease

            &:hover
                transform: translateY(-5px)
                box-shadow: 0 12px 40px rgba(0,0,0,0.08)

            .valor_icono
                font-size: 1.5rem
                color: $dorado

            h3
                font-family: 'Playfair Display', serif
                font-size: 1.1rem
                color: $oscuro
                font-weight: 600
                letter-spacing: 0.05rem

            p
                font-size: 0.9rem
                color: $gris
                line-height: 1.7
                opacity: 0.85

    @media (max-width: 768px)
        padding: 5rem 1.5rem

        .valores_grid
            grid-template-columns: 1fr

// ── FRASE ─────────────────────────────────────────────────────
.frase
    background-color: $oscuro
    padding: 8rem 4rem
    display: flex
    justify-content: center

    .frase_contenido
        max-width: 700px
        text-align: center
        display: flex
        flex-direction: column
        align-items: center
        gap: 1rem

        .comilla
            font-family: 'Playfair Display', serif
            font-size: 6rem
            color: $dorado
            line-height: 0.5
            opacity: 0.4

        blockquote
            font-family: 'Playfair Display', serif
            font-size: 1.8rem
            font-style: italic
            color: $crema
            line-height: 1.5
            margin: 0

        .firma
            font-size: 0.8rem
            letter-spacing: 0.2rem
            text-transform: uppercase
            color: $crema
            opacity: 0.4
            margin-top: 0.5rem

    @media (max-width: 768px)
        padding: 5rem 1.5rem

        .frase_contenido
            blockquote
                font-size: 1.3rem

// ── TIENDA ────────────────────────────────────────────────────
.tienda
    display: flex
    align-items: center
    justify-content: center
    gap: 6rem
    padding: 8rem 6rem
    background-color: $crema

    .tienda_texto
        max-width: 480px
        display: flex
        flex-direction: column
        gap: 1.2rem

        h2
            font-family: 'Playfair Display', serif
            font-size: 2rem
            font-weight: 600
            color: $oscuro
            letter-spacing: 0.02rem
            margin: 0

        p
            font-size: 0.95rem
            color: $gris
            line-height: 1.8
            opacity: 0.85

        .tienda_datos
            display: flex
            flex-direction: column
            gap: 1.2rem
            margin-top: 0.5rem

            .dato
                display: flex
                align-items: flex-start
                gap: 1rem

                .dato_icono
                    font-size: 1.1rem
                    color: $dorado
                    margin-top: 2px
                    flex-shrink: 0

                strong
                    font-size: 0.8rem
                    letter-spacing: 0.15rem
                    text-transform: uppercase
                    color: $oscuro
                    display: block
                    margin-bottom: 0.3rem

                p
                    font-size: 0.9rem
                    margin: 0
                    opacity: 0.7

        button
            margin-top: 0.8rem
            padding: 0.9rem 2rem
            font-size: 0.9rem
            background-color: $oscuro
            color: white
            border: none
            cursor: pointer
            letter-spacing: 0.1rem
            transition: 0.3s
            align-self: flex-start

            &:hover
                background-color: white
                color: $oscuro
                outline: 1px solid $oscuro

    @media (max-width: 768px)
        flex-direction: column-reverse
        padding: 5rem 1.5rem
        gap: 3rem

        .tienda_texto
            button
                align-self: center

// ── Footer ────────────────────────────────────────────────────
.footer
    margin-top: 0

</style>