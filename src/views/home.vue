<template>
    <a href="https://wa.me/34666238158">

        <img class="whatsapp_btn" src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fwhatsapp.png?alt=media&token=4a5f7d1a-ccf4-4bd4-9d6d-d8b67fb8f183" alt="">
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
            <div class="carrusel_container">

                

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
                    />
                </div>

                <div class="flechas_mobile">
                    <button @click="scrollIzq">‹</button>
                    <button @click="scrollDer">›</button>
                </div>

            </div>

        </section>
        <section id="tipos">

            <div class="tipos_titulo">

                <h2>Tipos de joyas</h2>

            </div>

            <div class="joyas_tipos">
                <div class="tipos1">
                    <div class="seccion" @click="router.push('/catalogo?tipo=Anillos')">
                        <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_anillo.png?alt=media&token=61ba81f1-dd2b-40fc-99b2-5062d9297090" alt="">
                        <h3>Anillos</h3>
                    </div>
                    <div class="seccion" @click="router.push('/catalogo?tipo=Pulseras')">
                        <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_pulseras.png?alt=media&token=dc25ceff-c450-4c13-be59-2909e94fbeff" alt="">
                        <h3>Pulseras</h3>
                    </div>
                    <div class="seccion" @click="router.push('/catalogo?tipo=Cadenas')">
                        <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_cadenas.png?alt=media&token=2680eada-061c-41bb-bd68-fff690164002" alt="">
                        <h3>Cadenas</h3>
                    </div>
                </div>
                <div class="tipos2" @click="router.push('/catalogo?tipo=Colgantes')">
                    <div class="seccion">
                        <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_colgantes.png?alt=media&token=2e64a7ca-933f-40f6-a5a0-7ae00a19f558" alt="">
                        <h3>Colgantes</h3>
                    </div>
                    <div class="seccion" @click="router.push('/catalogo?tipo=Pendientes')">
                        <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_pendientes.png?alt=media&token=ff8938ef-5bd5-4605-bebb-dd5d68a4d47e" alt="">
                        <h3>Pendientes</h3>
                    </div>
                </div>
            </div>



        </section>
        <section id="products">

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
                    />
                </div>

                <div class="flechas_mobile">
                    <button @click="scrollIzqNovedades">‹</button>
                    <button @click="scrollDerNovedades">›</button>
                </div>

            </div>


        </section>
        <section id="categorias">
            <div class="categoria_pedida">
                <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fcategoria_pedida.png?alt=media&token=86245207-6c02-4e4d-af8c-a311ecb25c11" alt="">
                <h3>Anillos de Pedida</h3>
                <p>El símbolo perfecto del amor eterno, diseñado para brillar en el momento más especial de tu vida con elegancia y distinción.</p>
                <button @click="router.push('/catalogo?tipo=Anillos&material=oro')">Consultar Anillos</button>
            </div>
            <div class="categoria_colgante">
                <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fcategoria_colgante.png?alt=media&token=5b23379b-2769-43b5-876b-57104fc9d82f" alt="">
                <h3>Colgantes con Piedra</h3>
                <p>Piezas únicas que combinan belleza y significado, ideales para lucir cerca del corazón en cualquier ocasión especial.</p>
                <button @click="router.push('/catalogo?tipo=Colgantes&material=oro')">Consultar Colgantes</button>
            </div>

        </section>

        <section id="nosotros">
            <div class="left">
                <h3>¿Donde estamos situados?</h3>
                <p>Estamos situados en puerto de sagunto y somos una joyeria de alto nivel con un nivel de eleboracion alto ,de manera artesanal y de manera creativa</p>
                <button @click="abrir_mapa">Localizanos</button>
            </div>
            <div class="right">
                <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Ffoto_tienda.webp?alt=media&token=c385689d-d2d2-4a10-ad18-19cbbdc2aa00" alt="">
            </div>

        </section>

        <section id="correo">
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
import { onMounted} from 'vue';
import { useJoyasPublicasStore } from '@/stores/joyas';
import { ref } from 'vue';
import { computed } from 'vue';
import Swal from 'sweetalert2';
import footer_component from '@/components/footer_component.vue';
import { useCorreosStore } from '@/stores/correos';
import portada from '@/components/portada.vue';
import { useHead } from '@vueuse/head';

import { useRouter } from 'vue-router';

useHead({
  title: 'Joyería Mercè — Joyas Artesanales en Puerto de Sagunto',
  meta: [
    { name: 'description', content: 'Joyería artesanal en Puerto de Sagunto, Valencia. Anillos, pulseras, cadenas, colgantes y pendientes de oro, plata y acero hechos a mano.' },
    { property: 'og:title', content: 'Joyería Mercè — Joyas Artesanales en Puerto de Sagunto' },
    { property: 'og:description', content: 'Joyería artesanal en Puerto de Sagunto, Valencia. Visítanos en Carrer del Trovador, 67.' },
  ]
})

const router=useRouter()
// Creamos el store
const store_general = useJoyasPublicasStore()

//Obtenemos las joyas desde la store
onMounted(async () => {
  if (store_general.todas.length === 0) {
    await store_general.obtener_joya()
  }
})

//Calcular las novedades 
const esnovedad = (fecha_creacion) => {
    const dossemanas = 14 * 24 * 60 * 60 * 1000
    return Date.now() - fecha_creacion < dossemanas
}


//Sacar las ultimas novedades en joyas (Sacar las 8 Ultimas subidas)
const novedades = computed(() => {
  return [...(store_general.todas || [])]
    .sort((a, b) => (b.fecha_creacion || 0) - (a.fecha_creacion || 0))
    .slice(0, 8)
})


//Abrir Mapa
const abrir_mapa=()=>{

    window.open("https://maps.app.goo.gl/657WkNQ8XZuNJeYX8")

    
}

//Registro de correo
const store_correos=useCorreosStore()


const registro=async()=>{

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

//Carrusel n1
const carrusel=ref(null)

const scrollIzq = () => {
  carrusel.value.scrollBy({
    left: -380,
    behavior: "smooth"
  })
}

const scrollDer = () => {
  carrusel.value.scrollBy({
    left: 380,
    behavior: "smooth"
  })
}

//Carrusel N2
const carruselNovedades = ref(null)

const scrollIzqNovedades = () => {
  carruselNovedades.value.scrollBy({
    left: -380,
    behavior: "smooth"
  })
}

const scrollDerNovedades = () => {
  carruselNovedades.value.scrollBy({
    left: 380,
    behavior: "smooth"
  })
}

</script>

<style lang="sass" scoped>
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

    #products
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

        .tipos_titulo
            text-align: center

            h2
                font-size: 1.5rem
                text-decoration: underline
                text-underline-offset: 1rem
                letter-spacing: 0.2rem
                color: #111

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
        
    #nosotros
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
        #nosotros
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

@media (max-width: 768px)
    #main #presentacion
        background: url("https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fportada_mobile.png?alt=media&token=659702fd-9627-444d-976b-c697fab33b9e") no-repeat center
        background-size: cover
        background-position: center




</style>