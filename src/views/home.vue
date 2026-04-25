<template>
    <a href="https://wa.me/34666238158">
        <OptimizedImage loading="eager" class="whatsapp_btn" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fwhatsapp.png?alt=media&token=4a5f7d1a-ccf4-4bd4-9d6d-d8b67fb8f183" width="96" height="96" alt="WhatsApp"/>
    </a>
    <div id="main">
        <header_all class="header_fixed"/>
        <portada @catalogo="router.push('/catalogo')"/>
        
        <section id="products">

            <div class="title">
                <h1>Productos Destacados</h1>

            </div>
            <div class="cargando" v-if="store_general.todas.length === 0">
                <div class="loader-inner">
                <div class="loader-ring"></div>
                <span>✦</span>
                </div>
            </div>
            <div class="carrusel_container reveal">

                

                <div class="estante_1" ref="carrusel">
                    <card_jewlery
                        v-for="joya in store_general.destacadas"
                        :key="joya.id"
                        :id="joya.id"
                        :imagen="joya.imagenes[0] || '/default.jpg'"
                        :nombre="joya.nombre"
                        :descripcion="joya.descripcion"
                        textoBoton="Ver detalles"
                        class="card"
                        :novedad="esnovedad(joya.fecha_creacion)"
                        :material="joya.material"
                        :medidas="joya.medidas"
                        :slug="joya.slug"
                        :loading="index > 2 ? 'lazy' : 'eager'"
                    />
                </div>

                <div class="flechas_mobile">
                    <button @click="scrollIzq">‹</button>
                    <button @click="scrollDer">›</button>
                </div>

            </div>

        </section>
        <section id="tipos" class="reveal">

            <div class="tipos_titulo">

                <h2>Tipos de joyas</h2>
                
            </div>

            <div class="joyas_tipos">
                <div class="tipos1">
                    <div class="seccion" @click="goTo('/joyas/anillos')">
                        <OptimizedImage loading="lazy" width="228" height="120" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_anillo.webp?alt=media&token=529bcdc7-7175-4d40-a7d0-3cc1d7bcc24f" alt="Anillos"/>
                        <h3>Anillos</h3>
                    </div>
                    <div class="seccion" @click="goTo('/joyas/pulseras')">
                        <OptimizedImage loading="lazy" width="228" height="120" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_pulseras.webp?alt=media&token=f1f85e99-78da-45d2-8e03-99edd78bf8bb" alt="Pulseras"/>
                        <h3>Pulseras</h3>
                    </div>
                    <div class="seccion" @click="goTo('/joyas/cadenas')">
                        <OptimizedImage loading="lazy" width="228" height="120" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_cadenas.webp?alt=media&token=7beaee3f-d559-4f12-8692-d3fb129a9b63" alt="Cadenas"/>
                        <h3>Cadenas</h3>
                    </div>
                </div>
                <div class="tipos2">
                    <div class="seccion" @click="goTo('/joyas/colgantes')">
                        <OptimizedImage loading="lazy" width="228" height="120" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_colgantes.webp?alt=media&token=c7610d83-f5cc-4080-800f-47160a4d9f46" alt="Colgantes"/>
                        <h3>Colgantes</h3>
                    </div>
                    <div class="seccion" @click="goTo('/joyas/pendientes')">
                        <OptimizedImage loading="lazy" width="228" height="120" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_pendientes.webp?alt=media&token=fa0aa854-f592-4937-95af-32a624b9cba8" alt="Pendientes"/>
                        <h3>Pendientes</h3>
                    </div>
                </div>
                
            </div>

            <a href="/joyas" class="btn_hub" @click.prevent="goTo('/joyas')">
                Explorar toda la colección →
            </a>

        </section>
        <section id="novedades" class="reveal">

            <div class="title">
                <h1>Novedades</h1>

            </div>
            <div class="cargando" v-if="store_general.todas.length === 0">
                <div class="loader-inner">
                <div class="loader-ring"></div>
                <span>✦</span>
                </div>
            </div>
            
            <div class="carrusel_container">

                <div class="estante_1" ref="carruselNovedades">
                    <card_jewlery
                        v-for="joya in novedades"
                        :key="joya.id"
                        :id="joya.id"
                        :imagen="joya.imagenes[0] || '/default.jpg'"
                        :nombre="joya.nombre"
                        :descripcion="joya.descripcion"
                        textoBoton="Ver detalles"
                        class="card"
                        :novedad="esnovedad(joya.fecha_creacion)"
                        :medidas="joya.medidas"
                        :slug="joya.slug"
                        :loading="index > 2 ? 'lazy' : 'eager'"
                    />
                </div>

                <div class="flechas_mobile">
                    <button @click="scrollIzqNovedades">‹</button>
                    <button @click="scrollDerNovedades">›</button>
                </div>

            </div>

        </section>
        
        <reviews class="reveal"/>
        <section id="categorias" class="reveal">
            <div class="categoria_pedida">
                <OptimizedImage loading="lazy" width="580" height="350" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fcategoria_pedida.webp?alt=media&token=face0f05-7c44-4f63-b329-339c718e3987" alt="Anillos de Pedida"/>
                <h3>Anillos de Pedida</h3>
                <p>El símbolo perfecto del amor eterno, diseñado para brillar en el momento más especial de tu vida con elegancia y distinción.</p>
                <button @click="goTo('/anillos-compromiso')">Consultar Anillos</button>
            </div>
            <div class="categoria_colgante">
                <OptimizedImage loading="lazy" width="580" height="350" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fcategoria_colgante.webp?alt=media&token=5403fa18-00f1-486c-90eb-a1f0a7b755c8" alt="Regalos"/>
                <h3>Regalos</h3>
                <p>Regalos exclusivos que sorprenden y emocionan, perfectos para momentos especiales y para expresar cariño con estilo y elegancia.</p>
                <button @click="goTo('/regalos')">Consultar Regalos</button>
            </div>

        </section>
        <section id="estadisticas" class="reveal">
            <div class="stats_container">
                <div class="stat_item">
                    <div class="stat_icon">✦</div>
                    <div class="stat_number" ref="yearsCounter">0</div>
                    <div class="stat_label">Años de Experiencia</div>
                </div>
                <div class="stat_item">
                    <div class="stat_icon">♥</div>
                    <div class="stat_number" ref="clientsCounter">0</div>
                    <div class="stat_label">Clientes Satisfechos</div>
                </div>
            </div>
        </section>
        <section id="busca_joya_home" class="reveal">
            <div class="bjh_inner">
        
            <!-- Lado izquierdo: texto y CTA -->
            <div class="bjh_texto">
                <span class="bjh_sym">✦</span>
                <p class="bjh_eyebrow">Encuentra tu joya ideal</p>
                <h2 class="bjh_titulo">
                ¿No sabes<br>
                <em>qué elegir?</em>
                </h2>
                <p class="bjh_desc">
                Responde 5 preguntas y nuestro buscador inteligente
                filtra toda la colección para mostrarte las piezas
                que encajan contigo, tu ocasión y tu presupuesto.
                </p>
                <button class="bjh_btn" @click="irBuscador">
                Empezar el quiz <span class="bjh_arrow">→</span>
                </button>
            </div>
        
            <!-- Lado derecho: tarjeta decorativa animada -->
            <div class="bjh_deco" aria-hidden="true">
        
                <!-- Pasos decorativos -->
                <div class="bjh_pasos">
                <div class="bjh_paso" v-for="(paso, i) in pasos" :key="i" :style="{ '--delay': i * 0.12 + 's' }">
                    <span class="bjh_paso_num">0{{ i + 1 }}</span>
                    <span class="bjh_paso_label">{{ paso }}</span>
                </div>
                </div>
        
                <!-- Orbes de fondo -->
                <div class="bjh_orb bjh_orb1"></div>
                <div class="bjh_orb bjh_orb2"></div>
        
            </div>
        
            </div>
        </section>

        <section id="ubicacion" class="reveal">
            <div class="left">
                <h3>¿Donde estamos situados?</h3>
                <p>Visítanos en nuestra joyería en Puerto de Sagunto, Valencia. 
                Te atendemos en tienda para ayudarte a elegir anillos, collares, pulseras y regalos para cualquier ocasión.</p>
                <button @click="abrir_mapa">Localízanos</button>
            </div>
            <div class="right">
                <OptimizedImage loading="lazy" width="400" height="480" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Ffoto_tienda.webp?alt=media&token=c385689d-d2d2-4a10-ad18-19cbbdc2aa00" alt="Tienda Joyería Mercè"/>
            </div>

        </section>

        <section id="correo" class="reveal">
            <div class="titulo_correo">
                <h3>¿Quieres Recibir Novedades?</h3>
                <p>Introduce tu correo electronico para recibir las novedades y estar a la ultima sobre joyeria!</p>
            </div>
            <div class="dato_correo">
                <label>Correo Electronico</label>
                <input v-model="store_correos.correo" type="email" placeholder="Introduce tu correo electronico">
                <button @click="registro">Registrar correo</button>
            </div>
        </section>

        <section class="footer">
    
            <footer_component/>
        </section>

    </div>

</template>

<script setup>

import header_all from '@/components/header_all.vue';
import card_jewlery from '@/components/card_jewlery.vue';
import OptimizedImage from '@/components/OptimizedImage.vue';
import { useJoyasPublicasStore } from '@/stores/joyas';
import footer_component from '@/components/footer_component.vue';
import { useCorreosStore } from '@/stores/correos';
import portada from '@/components/portada.vue';
import { useHead } from '@vueuse/head';
import reviews from '@/components/reviews.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref, computed } from 'vue';
import { CountUp } from 'countup.js';

useHead({
  title: 'Joyería Mercè — Joyería en Puerto de Sagunto',
  meta: [
    { name: 'description', content: 'Joyería Mercè en Puerto de Sagunto, Valencia. Anillos de compromiso, pulseras, colgantes, cadenas y pendientes en oro, plata y acero.' },
    { property: 'og:title', content: 'Joyería Mercè — Joyería en Puerto de Sagunto' },
    { property: 'og:description', content: 'Joyería en Puerto de Sagunto, Valencia. Visítanos en Carrer del Trovador, 67.' },
  ],
  link: [
    { rel: 'canonical', href: 'https://joyeriamerce.es' },
    { rel: 'preconnect', href: 'https://firebasestorage.googleapis.com' },
  ],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "JewelryStore",
      "name": "Joyería Mercè",
      "url": "https://joyeriamerce.es",
      "telephone": "+34 666 238 158",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Carrer del Trovador, 67",
        "addressLocality": "Puerto de Sagunto",
        "postalCode": "46520",
        "addressCountry": "ES"
      },
      "openingHours": ["Mo-Fr 10:00-14:00", "Mo-Fr 17:00-20:00"],
      "image": "https://joyeriamerce.es/og-image.jpg",
      "priceRange": "€€"
    })
  }]
})


//Navegacion Scroll Arriba
const goTo = async (ruta) => {
  await router.push(ruta)
  window.scrollTo(0, 0)
}


const router=useRouter()
// Creamos el store
const store_general = useJoyasPublicasStore()

// Referencias para los contadores
const yearsCounter = ref(null)
const clientsCounter = ref(null)
const statsAnimated = ref(false)

//Obtenemos las joyas desde la store
onMounted(async () => {
  if (store_general.todas.length === 0) {
    await store_general.obtener_joya()
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        
        // Si es la sección de estadísticas y aún no se ha animado
        if (e.target.id === 'estadisticas' && !statsAnimated.value) {
          statsAnimated.value = true
          
          // Contador de años con CountUp.js
          const yearsCountUp = new CountUp(yearsCounter.value, 25, {
            duration: 2,
            separator: '.',
            prefix: '+',
            useEasing: true,
            easingFn: (t, b, c, d) => {
              // easeOutExpo
              return c * (-Math.pow(2, -10 * t / d) + 1) + b;
            }
          })
          
          // Contador de clientes con CountUp.js
          const clientsCountUp = new CountUp(clientsCounter.value, 5000, {
            duration: 2,
            separator: '.',
            prefix: '+',
            useEasing: true,
            easingFn: (t, b, c, d) => {
              // easeOutExpo
              return c * (-Math.pow(2, -10 * t / d) + 1) + b;
            }
          })
          
          if (!yearsCountUp.error) {
            yearsCountUp.start()
          }
          
          if (!clientsCountUp.error) {
            clientsCountUp.start()
          }
        }
        
        observer.unobserve(e.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

//Calcular las novedades 
const esnovedad = (fecha_creacion) => {
    const dossemanas = 14 * 24 * 60 * 60 * 1000
    return Date.now() - fecha_creacion < dossemanas
}


//Sacar las ultimas novedades en joyas (Sacar las 8 Ultimas subidas)
const novedades = computed(() => {
  if (!store_general.todas.length) return []
  // Solo devolvemos las 8 necesarias para no renderizar cards invisibles
  return [...store_general.todas]
    .sort((a, b) => b.fecha_creacion - a.fecha_creacion)
    .slice(0, 8)
})


//Abrir Mapa
const abrir_mapa=()=>{

    window.open("https://maps.app.goo.gl/657WkNQ8XZuNJeYX8")

    
}

//Registro de correo
const store_correos=useCorreosStore()


const registro=async()=>{
    const Swal = (await import('sweetalert2')).default
    if(store_correos.correo==""){
        Swal.fire({
            icon: "error",
            title: "No has introducido el correo",
            text: "Introduce el Correo para poder recibir novedades",
            background: "#1a1a1a",
            color: "#EDE9D8",
            confirmButtonColor: "#EDE9D8",
            confirmButtonText: '<span style="color: #1a1a1a; font-weight: 600; letter-spacing: 0.1rem">Aceptar</span>'
            
            
        });
        return
    }
    if (!store_correos.correo.includes('@') || !store_correos.correo.includes('.')) {

        Swal.fire({
            icon: "error",
            title: "El correo introducido no es valido",
            text: "Introduce el correo correctamente porfavor",
            background: "#1a1a1a",
            color: "#EDE9D8",
            confirmButtonColor: "#EDE9D8",
            confirmButtonText: '<span style="color: #1a1a1a; font-weight: 600; letter-spacing: 0.1rem">Aceptar</span>'
            
            
        });

        return

    }

    const resultado=await store_correos.guardar_correo()

    if (resultado.ok) {
        Swal.fire({ icon: "success", title: "¡Registrado!",background: "#1a1a1a",
            color: "#EDE9D8",
            confirmButtonColor: "#EDE9D8",
            confirmButtonText: '<span style="color: #1a1a1a; font-weight: 600; letter-spacing: 0.1rem">Aceptar</span>'
        })
        store_correos.correo = ""
    }else{
        console.log(resultado)
        Swal.fire({
            icon: "error",
            title: "El correo introducido ya esta registrado",
            text: "intentalo mas tarde",
            background: "#1a1a1a",
            color: "#EDE9D8",
            confirmButtonColor: "#EDE9D8",
            confirmButtonText: '<span style="color: #1a1a1a; font-weight: 600; letter-spacing: 0.1rem">Aceptar</span>'
            
        });
        return

    }



}

// Carruseles
const carrusel = ref(null)
const carruselNovedades = ref(null)

const scrollCarrusel = (carruselRef, direction) => {
  carruselRef.value.scrollBy({
    left: direction === 'izq' ? -380 : 380,
    behavior: "smooth"
  })
}

const scrollIzq          = () => scrollCarrusel(carrusel, 'izq')
const scrollDer          = () => scrollCarrusel(carrusel, 'der')
const scrollIzqNovedades = () => scrollCarrusel(carruselNovedades, 'izq')
const scrollDerNovedades = () => scrollCarrusel(carruselNovedades, 'der')

//El buscar joya 
const pasos = [
  '¿Para quién es la joya?',
  '¿Cuál es la ocasión?',
  '¿Qué tipo de joya buscas?',
  '¿Qué material prefieres?',
  '¿Cuál es tu presupuesto?',
]
 
const irBuscador = async () => {
  await router.push('/buscar-joya')
  window.scrollTo(0, 0)
}


</script>
<style lang="sass" scoped>

.reveal
  opacity: 0
  transform: translateY(40px)
  transition: opacity 0.7s ease, transform 0.7s ease

  &.visible
    opacity: 1
    transform: translateY(0)
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
    color: #B8860B
    animation: spin 3s linear infinite

.loader-ring
  position: absolute
  inset: 0
  border: 1.5px solid #E8E4DE
  border-top-color: #B8860B
  border-radius: 50%
  animation: spin 1s linear infinite

@keyframes spin
  to
    transform: rotate(360deg)

.whatsapp_btn
    position: fixed
    bottom: 2rem
    right: 2rem
    width: 55px
    height: 55px
    cursor: pointer
    z-index: 999
    transition: transform 0.3s

    &:hover
        transform: scale(1.1)
#main
    margin: 0
    padding: 0
    height: 100vh
    
    .header_fixed
        position: fixed
        width: 100%
        z-index: 100000

    // ── Sección de Estadísticas ────────────────────────────────
    #estadisticas
        padding: 6rem 2rem
        display: flex
        justify-content: center
        align-items: center

        .stats_container
            display: flex
            gap: 8rem
            max-width: 900px
            width: 100%
            justify-content: center

        .stat_item
            display: flex
            flex-direction: column
            align-items: center
            gap: 1rem

            .stat_icon
                font-size: 2.5rem
                color: #B8860B
                animation: pulse 3s ease infinite

            .stat_number
                font-family: 'Playfair Display', serif
                font-size: 4rem
                font-weight: 700
                color: black
                letter-spacing: 0.05rem
                line-height: 1

            .stat_label
                font-size: 0.85rem
                letter-spacing: 0.25rem
                text-transform: uppercase
                color: black
                text-align: center
                max-width: 200px

        @media (max-width: 768px)
            padding: 4rem 1.5rem

            .stats_container
                flex-direction: column
                gap: 4rem

            .stat_item
                .stat_number
                    font-size: 3rem

                .stat_label
                    font-size: 0.75rem
                    letter-spacing: 0.2rem
    // ── Fin Estadísticas ───────────────────────────────────────

    #presentacion
        height: 103vh              
        display: flex
        flex-direction: column
        justify-content: center       
        align-items: center      
        padding-top: 15vh             
        
        .titulo
            display: flex
            justify-content: center
            flex-direction: column
            text-align: center
            
            h1
                font-size: 4rem
                font-family: 'Playfair Display', serif
                font-weight: 600
                letter-spacing: 0.5rem
                opacity: 0.8
                @media (max-width: 768px)
                    font-size: 2rem
            p
                font-size: 1.5rem
                letter-spacing: 0.7rem
                margin-top: 1rem
                opacity: 0.8
                @media (max-width: 768px)
                    font-size: 0.8rem
                    letter-spacing: 0.5rem
        .portda
            margin-top: 9rem
            @media (max-width: 768px)
                margin-top: 5rem
            button
                padding: 1rem 2rem
                font-size: 1.2rem
                background-color: #373232
                color: white
                border: none
                border-radius: 8px
                cursor: pointer
                transition: 0.3s
                &:hover
                    color: black
                    background-color: rgba(255,255,255,1)
                    transform: scale(1.05)
                    
                @media (max-width: 768px)
                    padding: 1rem 1.5rem
                    font-size: 1rem

    #novedades,#products
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column

        .title
            margin-top: 5rem
            margin-bottom: 2rem

            h1
                font-size: 1.5rem
                text-decoration: underline
                text-underline-offset: 1rem

                @media (max-width: 768px)
                    font-size: 1rem

        .carrusel_container
            position: relative
            width: 100%
            display: flex
            flex-direction: column 
            align-items: center

            .estante_1
                width: 100%
                display: flex
                gap: 1.5rem
                overflow-x: auto
                flex-wrap: nowrap
                scroll-behavior: smooth
                padding: 1rem

                &::-webkit-scrollbar
                    display: none

                .card
                    min-width: 330px
                    @media (max-width: 768px)
                        min-width: 85vw
                        max-width: 85vw
                        width: 85vw
            .flechas_mobile
                display: flex
                justify-content: center
                gap: 2rem
                width: 100%
                margin-top: 0.5rem
                margin-bottom: 1.5rem

                button
                    background: transparent
                    color: black
                    border: none
                    font-size: 2.5rem
                    border-radius: 15px
                    cursor: pointer
                    padding: 0.5rem 1.5rem
                    transition: 0.2s
                    line-height: 1

                    &:hover
                        transform: scale(1.1)

                    &:active
                        transform: scale(0.95)
    
    #tipos
        padding: 5rem 2rem
        display: flex
        flex-direction: column
        align-items: center
        gap: 3rem

        .btn_hub
            display: inline-flex
            align-items: center
            font-size: 0.72rem
            letter-spacing: 0.18rem
            text-transform: uppercase
            color: #9a8f7f
            text-decoration: none
            border: 1px solid rgba(0,0,0,0.12)
            padding: 10px 24px
            border-radius: 20px
            transition: all 0.25s
            margin-top: 1rem

            &:hover
                color: #1a1a1a
                border-color: rgba(0,0,0,0.35)
                transform: translateX(3px)

        .tipos_titulo
            text-align: center

            h2
                font-size: 1.5rem
                text-decoration: underline
                text-underline-offset: 1rem
                letter-spacing: 0.2rem
                color: #111

            .ver_todas
                display: inline-block
                margin-top: 0.75rem
                font-size: 0.72rem
                letter-spacing: 0.15rem
                text-transform: uppercase
                color: #C9A55A
                text-decoration: none
                border-bottom: 1px solid rgba(201,165,90,0.4)
                padding-bottom: 2px
                transition: all 0.2s

                &:hover
                color: #1a1a1a
                border-color: #1a1a1a

        .joyas_tipos
            width: 100%
            max-width: 60rem
            display: flex
            flex-direction: column
            gap: 1.5rem

            .tipos1, .tipos2
                display: flex
                gap: 3rem
                justify-content: center

                .seccion
                    flex: 1

            .tipos2
                .seccion
                    max-width: calc(33.33% - 1rem)

            .seccion
                background: linear-gradient(145deg, #1c1c1c 0%, #2a2a2a 50%, #1a1a1a 100%)
                border: 1px solid rgba(255,255,255,0.07)
                box-shadow: 0 4px 20px rgba(0,0,0,0.3)
                position: relative
                overflow: hidden
                border-radius: 16px
                display: flex
                flex-direction: column
                align-items: center
                cursor: pointer
                transition: all 0.4s ease

                &::before
                    content: ''
                    position: absolute
                    top: -50%
                    left: -60%
                    width: 40%
                    height: 200%
                    background: linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)
                    transform: skewX(-15deg)
                    animation: shimmer 4s infinite ease-in-out

                &::after
                    content: ''
                    position: absolute
                    inset: 0
                    border-radius: 16px
                    padding: 1px
                    background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(100,160,255,0.1), rgba(255,255,255,0.05))
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)
                    -webkit-mask-composite: xor
                    mask-composite: exclude
                    animation: borderGlow 3s infinite alternate

                img
                    width: auto
                    height: 120px
                    object-fit: cover
                    filter: brightness(0.95) contrast(1.05)
                    transition: all 0.5s ease

                h3
                    color: #e8e8f0
                    letter-spacing: 0.2rem
                    text-shadow: 0 0 20px rgba(150,180,255,0.4)
                    font-size: 0.95rem
                    font-weight: 500
                    text-transform: uppercase
                    padding: 1rem 0

                &:hover
                    transform: translateY(-8px)
                    box-shadow: 0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(80,120,255,0.15)

                    img
                        filter: brightness(1.05) contrast(1.1)
                        transform: scale(1.03)

                    h3
                        text-shadow: 0 0 30px rgba(150,180,255,0.7)

        @media (max-width: 768px)
            padding: 3rem 1rem
            gap: 2rem

            .joyas_tipos
                gap: 1rem

                .tipos1, .tipos2
                    gap: 1rem

                .tipos2
                    .seccion
                        max-width: calc(50% - 0.5rem)

                .seccion
                    img
                        height: 130px

                    h3
                        font-size: 0.8rem
                        letter-spacing: 0.1rem
                        padding: 0.7rem 0
    #categorias
        display: flex
        justify-content: center
        align-items: stretch
        flex-direction: row
        gap: 4rem
        padding: 6rem 4rem

        .categoria_pedida, .categoria_colgante
            display: flex
            flex-direction: column
            align-items: center
            background-color: #EDE9D8
            border-radius: 10px
            overflow: hidden
            max-width: 580px
            width: 100%
            box-shadow: 0 8px 30px rgba(0,0,0,0.1)
            transition: transform 0.3s ease, box-shadow 0.3s ease

    
            img
                width: 100%
                height: 350px
                object-fit: cover

            h3
                font-size: 1.3rem
                
                letter-spacing: 0.2rem
                color: #1a1a1a
                margin-top: 1.5rem
                text-align: center

            p
                font-size: 0.95rem
                color: #444
                opacity: 70%
                text-align: center
                padding: 0.8rem 2rem
                line-height: 1.6

            button
                margin: 1.2rem 0 2rem
                padding: 0.8rem 2rem
                font-size: 0.95rem
                background-color: #373232
                color: white
                border: none
                cursor: pointer
                letter-spacing: 0.1rem
                transition: 0.3s

                &:hover
                    background-color: white
                    color: #1a1a1a
                    outline: 1px solid #1a1a1a

        @media (max-width: 768px)
            flex-direction: column
            align-items: center
            padding: 3rem 1.5rem
            gap: 2rem

            .categoria_pedida, .categoria_colgante
                max-width: 100%
                background-color: #EDE9D8

                img
                    height: 250px

    // ── Busca Joya ────────────────────────────────────────────
    #busca_joya_home
        padding: 7rem 4rem
        background-color: #EDE9D8
        display: flex
        justify-content: center

        .bjh_inner
            display: flex
            align-items: center
            gap: 6rem
            width: 100%
            max-width: 1100px

        .bjh_texto
            flex: 1
            display: flex
            flex-direction: column
            gap: 1.4rem

        .bjh_sym
            font-size: 1.4rem
            color: #B8860B
            animation: pulse 3s ease infinite

        .bjh_eyebrow
            font-size: 0.72rem
            letter-spacing: 0.28rem
            text-transform: uppercase
            color: #B8860B
            margin: 0

        .bjh_titulo
            font-family: 'Playfair Display', serif
            font-size: 3.4rem
            font-weight: 600
            line-height: 1.15
            color: #1a1a1a
            margin: 0

            em
                font-style: italic
                color: #B8860B

        .bjh_desc
            font-size: 0.95rem
            color: #666
            line-height: 1.75
            max-width: 420px
            margin: 0

        .bjh_btn
            display: inline-flex
            align-items: center
            gap: 0.8rem
            align-self: flex-start
            padding: 1rem 2.5rem
            background-color: #1a1a1a
            color: #EDE9D8
            border: none
            font-family: 'Playfair Display', serif
            font-size: 0.95rem
            font-weight: 600
            letter-spacing: 0.12rem
            cursor: pointer
            transition: all 0.3s ease
            margin-top: 0.4rem

            .bjh_arrow
                display: inline-block
                transition: transform 0.3s ease

            &:hover
                background-color: #B8860B
                color: #1a1a1a
                transform: translateY(-2px)
                box-shadow: 0 8px 24px rgba(184,134,11,0.22)

                .bjh_arrow
                    transform: translateX(5px)

        .bjh_deco
            flex: 1
            position: relative
            max-width: 460px
            min-height: 360px
            display: flex
            align-items: center
            justify-content: center

        .bjh_orb
            position: absolute
            border-radius: 50%
            border: 1px solid rgba(184,134,11,0.14)

            &.bjh_orb1
                width: 340px
                height: 340px
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
                animation: giro 18s linear infinite

            &.bjh_orb2
                width: 240px
                height: 240px
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
                animation: giro 12s linear infinite reverse

        .bjh_pasos
            position: relative
            z-index: 2
            display: flex
            flex-direction: column
            gap: 0
            width: 100%
            max-width: 360px
            background-color: #FAFAF7
            border: 1px solid rgba(0,0,0,0.08)
            border-radius: 18px
            overflow: hidden
            box-shadow: 0 12px 40px rgba(0,0,0,0.06)

        .bjh_paso
            display: flex
            align-items: center
            gap: 1.2rem
            padding: 1.1rem 1.6rem
            border-bottom: 1px solid rgba(0,0,0,0.08)
            animation: slideInRight 0.5s ease both
            animation-delay: var(--delay)

            &:last-child
                border-bottom: none

            &:hover
                background-color: rgba(184,134,11,0.10)

                .bjh_paso_num
                    color: #B8860B

            .bjh_paso_num
                font-family: 'Playfair Display', serif
                font-size: 0.7rem
                letter-spacing: 0.2rem
                color: rgba(0,0,0,0.2)
                min-width: 28px
                transition: color 0.2s

            .bjh_paso_label
                font-size: 0.88rem
                color: #1a1a1a
                line-height: 1.4

        @media (max-width: 1024px)
            gap: 3.5rem

            .bjh_titulo
                font-size: 2.6rem

        @media (max-width: 768px)
            padding: 5rem 1.4rem

            .bjh_inner
                flex-direction: column
                gap: 3rem

            .bjh_texto
                align-items: center
                text-align: center

            .bjh_desc
                text-align: center

            .bjh_btn
                align-self: center

            .bjh_deco
                width: 100%
                max-width: 100%
                min-height: auto

            .bjh_orb
                &.bjh_orb1
                    width: 280px
                    height: 280px

                &.bjh_orb2
                    width: 180px
                    height: 180px

    // ── Fin Busca Joya ────────────────────────────────────────

    #ubicacion
        display: flex
        flex-direction: row
        justify-content: center
        background-color: #EDE9D8
        gap: 5rem
        height: 35rem

        .left
            display: flex
            flex-direction: column
            justify-content: center
            gap: 4rem
            width: 500px


            p
                font-size: 0.95rem
                color: #444
                opacity: 70%
                
                
                line-height: 1.6


            button
                margin: 1.2rem 0 2rem
                padding: 0.8rem 2rem
                font-size: 0.95rem
                background-color: #373232
                color: white
                border: none
                cursor: pointer
                letter-spacing: 0.1rem
                transition: 0.3s

                &:hover
                    background-color: white
                    color: #1a1a1a
                    outline: 1px solid #1a1a1a

        .right
            
            img
                border: 1px solid black
                border-radius: 15px
                margin-top: 2rem
                height: 30rem


    #correo
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        margin-top: 7rem
        padding: 5rem 2rem
        gap: 2rem
    

    .titulo_correo
        text-align: center
        display: flex
        flex-direction: column
        gap: 0.8rem

        h3
            font-size: 1.5rem
            letter-spacing: 0.15rem
            color: #1a1a1a

        p
            font-size: 0.95rem
            color: #444
            opacity: 70%
            max-width: 500px
            line-height: 1.6

    .dato_correo
        display: flex
        flex-direction: column
        
        gap: 0.5rem
        width: 100%
        max-width: 450px

        button
            margin-top: 0.5rem
            padding: 0.9rem 2rem
            font-size: 0.95rem
            background-color: #373232
            color: white
            border: none
            cursor: pointer
            letter-spacing: 0.1rem
            transition: 0.3s

            &:hover
                background-color: white
                color: #1a1a1a
                outline: 1px solid #1a1a1a

        label
            font-size: 0.85rem
            letter-spacing: 0.1rem
            color: #1a1a1a

        input
            padding: 0.9rem 1.2rem
            border: 1px solid #c8c4b0
            background-color: #EDE9D8
            font-size: 0.95rem
            outline: none
            transition: 0.3s
            color: #1a1a1a
            letter-spacing: 2px

            &::placeholder
                color: #aaa

            &:focus
                border-color: #373232
                box-shadow: 0 0 0 3px rgba(55,50,50,0.08)

    
    .footer
        margin-top: 7rem




    @media (max-width: 768px)
        

        .titulo_correo
            h3
                font-size: 1.2rem

            p
                font-size: 0.85rem

        .dato_correo
            max-width: 100%


            input
                font-size: 0.6rem

    @media (max-width: 768px)
        #ubicacion
            flex-direction: column
            height: auto
            gap: 2rem
            padding: 2.5rem 1.2rem

            .left
                width: 100%
                gap: 1.5rem
                align-items: center
                text-align: center

                h3
                    font-size: 1.2rem
                    font-weight: 600

                p
                    font-size: 0.9rem

                button
                    margin: 0
                    padding: 0.8rem 2rem
                    font-size: 0.9rem

            .right
                width: 100%
                display: flex
                justify-content: center

                img
                    width: 100%
                    height: 18rem
                    object-fit: cover
                    margin-top: 0
                    border-radius: 10px
       
// Fuera de #main
@keyframes shimmer
    0%
        left: -60%
        opacity: 0
    20%
        opacity: 1
    80%
        opacity: 1
    100%
        left: 120%
        opacity: 0

@keyframes borderGlow
    0%
        background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(100,160,255,0.1), rgba(255,255,255,0.05))
    50%
        background: linear-gradient(135deg, rgba(100,160,255,0.2), rgba(255,255,255,0.1), rgba(180,120,255,0.15))
    100%
        background: linear-gradient(135deg, rgba(180,120,255,0.15), rgba(255,255,255,0.08), rgba(100,160,255,0.2))


@keyframes giro
    to
        transform: translate(-50%, -50%) rotate(360deg)

@keyframes slideInRight
    from
        opacity: 0
        transform: translateX(20px)
    to
        opacity: 1
        transform: translateX(0)

</style>