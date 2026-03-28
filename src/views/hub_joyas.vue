<template>
  <div class="pagina">
    <header_all class="header_all" />

    <!-- Hero editorial oscuro -->
    <section class="hero">
      <div class="hero_inner">
        <div class="hero_texto">
          <p class="hero_kicker">Joyería Mercè · Puerto de Sagunto</p>
          <h1 class="hero_titulo">
            Joyas de<br/>
            <em>oro, plata</em><br/>
            y acero
          </h1>
          <p class="hero_desc">
            Descubre nuestra colección completa de joyas en Puerto de Sagunto.
            Anillos, pendientes, cadenas, pulseras y colgantes con diseño exclusivo
            y acabados de alta calidad, perfectas para cualquier ocasión.
          </p>
          <router-link to="/catalogo" class="hero_cta">
            Ver catálogo completo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
        <div class="hero_deco">
          <div class="deco_anillo"></div>
          <div class="deco_punto"></div>
          <div class="deco_linea"></div>
        </div>
      </div>
    </section>

    <!-- Intro texto SEO -->
    <section class="intro_seo">
      <div class="intro_inner">
        <p>
          En <strong>Joyería Mercè</strong>, situada en <strong>Puerto de Sagunto, Valencia</strong>,
          encontrarás una selección cuidada de joyas para cada momento especial.
          Desde anillos de compromiso hasta cadenas de uso diario, trabajamos con
          <strong>oro</strong>, <strong>plata</strong> y <strong>acero</strong>
          para ofrecerte piezas duraderas con carácter propio.
        </p>
      </div>
    </section>

    <!-- Tipos de joyas -->
    <section class="tipos_section">
      <div class="section_header">
        <span class="section_num">01</span>
        <div>
          <h2>Por tipo de joya</h2>
          <p>Explora cada categoría y encuentra la pieza que buscas</p>
        </div>
      </div>

      <div class="tipos_grid">
        <router-link
          v-for="(tipo, i) in tipos"
          :key="tipo.slug"
          :to="`/joyas/${tipo.slug}`"
          class="tipo_card"
        >
          <div class="tipo_imagen">
            <img :src="tipo.imagen" :alt="`${tipo.nombre} de oro, plata y acero — Joyería Mercè Puerto de Sagunto`" loading="lazy" width="300" height="180"/>
          </div>
          <div class="tipo_info">
            <span class="tipo_num">0{{ i + 1 }}</span>
            <h3>{{ tipo.nombre }}</h3>
            <p class="tipo_desc">{{ tipo.desc }}</p>
            <ul class="tipo_keywords">
              <li v-for="kw in tipo.keywords" :key="kw">{{ kw }}</li>
            </ul>
            <span class="tipo_link">
              Ver {{ tipo.nombre.toLowerCase() }}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Materiales -->
    <section class="materiales_section">
      <div class="section_header">
        <span class="section_num">02</span>
        <div>
          <h2>Por material</h2>
          <p>Cada material tiene su carácter y propiedades únicas</p>
        </div>
      </div>

      <div class="materiales_grid">
        <router-link
          v-for="mat in materiales"
          :key="mat.slug"
          :to="`/joyas/${mat.slug}`"
          class="mat_card"
          :style="{ '--mat-color': mat.color, '--mat-bg': mat.bg }"
        >
          <div class="mat_top">
            <div class="mat_circulo">
              <span>{{ mat.simbolo }}</span>
            </div>
            <div class="mat_cabecera">
              <h3>{{ mat.nombre }}</h3>
              <span class="mat_pureza">{{ mat.pureza }}</span>
            </div>
          </div>
          <p class="mat_texto">{{ mat.texto }}</p>
          <ul class="mat_propiedades">
            <li v-for="prop in mat.propiedades" :key="prop">
              <span class="prop_dot"></span>{{ prop }}
            </li>
          </ul>
          <div class="mat_footer">
            <span class="mat_tipos">{{ mat.tipos.join(' · ') }}</span>
            <span class="mat_cta">Explorar →</span>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Bloque SEO local -->
    <section class="local_seo">
      <div class="local_inner">
        <div class="local_texto">
          <h2>Tu joyería en Puerto de Sagunto</h2>
          <p>
            Visítanos en nuestra tienda física en Puerto de Sagunto para ver y probar
            cada pieza en persona. Nuestro equipo te ayudará a encontrar la joya ideal
            para cualquier ocasión — desde un regalo especial hasta una alianza de boda.
          </p>
          <p>
            También puedes consultar cualquier pieza a través de WhatsApp antes de venir.
            Trabajamos con <strong>anillos de compromiso</strong>, <strong>alianzas</strong>,
            joyas de regalo y piezas de uso diario en oro, plata y acero.
          </p>
          <div class="local_acciones">
            <router-link to="/catalogo" class="btn_primario">Ver catálogo</router-link>
            <router-link to="/ubicacion" class="btn_secundario">Cómo llegar</router-link>
          </div>
        </div>
        <div class="local_datos">
          <div class="dato">
            <span class="dato_icono">✦</span>
            <div>
              <strong>Puerto de Sagunto</strong>
              <span>Valencia, España</span>
            </div>
          </div>
          <div class="dato">
            <span class="dato_icono">◈</span>
            <div>
              <strong>Oro · Plata · Acero</strong>
              <span>Tres materiales, un estilo</span>
            </div>
          </div>
          <div class="dato">
            <span class="dato_icono">◆</span>
            <div>
              <strong>5 tipos de joyas</strong>
              <span>Anillos, cadenas, colgantes, pulseras y pendientes</span>
            </div>
          </div>
          <a href="https://wa.me/34666238158" target="_blank" class="dato dato_wa">
            <span class="dato_icono">↗</span>
            <div>
              <strong>Consultar por WhatsApp</strong>
              <span>Respuesta inmediata</span>
            </div>
          </a>
        </div>
      </div>
    </section>
    <!-- Sección 03 — Ocasiones -->
    <section class="ocasiones_section">
        <div class="section_header">
            <span class="section_num">03</span>
            <div>
            <h2>Por ocasión</h2>
            <p>Joyas pensadas para los momentos más especiales</p>
            </div>
        </div>

        <div class="ocasiones_grid">
            <router-link to="/joyas/anillos-compromiso" class="ocasion_card">
            <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fcategoria_pedida.webp?alt=media&token=face0f05-7c44-4f63-b329-339c718e3987" alt="Anillos de compromiso — Joyería Mercè Puerto de Sagunto" loading="lazy"/>
            <div class="ocasion_info">
                <h3>Anillos de compromiso</h3>
                <p>Anillos de pedida y alianzas para el momento más especial</p>
                <span>Ver colección →</span>
            </div>
            </router-link>
            <router-link to="/joyas/regalos" class="ocasion_card">
            <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fcategoria_colgante.webp?alt=media&token=5403fa18-00f1-486c-90eb-a1f0a7b755c8" alt="Joyas de regalo — Joyería Mercè Puerto de Sagunto" loading="lazy"/>
            <div class="ocasion_info">
                <h3>Regalos</h3>
                <p>Joyas para regalar en cumpleaños, aniversarios y ocasiones especiales</p>
                <span>Ver colección →</span>
            </div>
            </router-link>
        </div>
    </section>

    <footer_component />
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import header_all from '@/components/header_all.vue'
import footer_component from '@/components/footer_component.vue'

useHead({
  title: 'Joyas en Puerto de Sagunto — Anillos, Cadenas, Pendientes | Joyería Mercè',
  meta: [
    { name: 'description', content: 'Toda la colección de joyas de Joyería Mercè en Puerto de Sagunto. Anillos, pendientes, cadenas, pulseras y colgantes de oro, plata y acero. Visítanos o consulta online.' },
    { name: 'robots', content: 'index, follow' },
    { name: 'keywords', content: 'joyas Puerto de Sagunto, joyería Puerto de Sagunto, anillos oro plata acero, pendientes, cadenas, pulseras, colgantes, Joyería Mercè' },
    { property: 'og:title', content: 'Joyas en Puerto de Sagunto — Joyería Mercè' },
    { property: 'og:description', content: 'Anillos, pendientes, cadenas, pulseras y colgantes de oro, plata y acero en Joyería Mercè, Puerto de Sagunto.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://joyeriamerce.es/joyas' },
    { property: 'og:locale', content: 'es_ES' },
    { property: 'og:site_name', content: 'Joyería Mercè' },
  ],
  link: [{ rel: 'canonical', href: 'https://joyeriamerce.es/joyas' }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Joyas — Joyería Mercè Puerto de Sagunto',
      description: 'Colección completa de joyas de oro, plata y acero en Joyería Mercè, Puerto de Sagunto.',
      url: 'https://joyeriamerce.es/joyas',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://joyeriamerce.es' },
          { '@type': 'ListItem', position: 2, name: 'Joyas', item: 'https://joyeriamerce.es/joyas' }
        ]
      },
      mainEntity: {
        '@type': 'ItemList',
        name: 'Colección de joyas Joyería Mercè',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Anillos', url: 'https://joyeriamerce.es/joyas/anillos' },
          { '@type': 'ListItem', position: 2, name: 'Pendientes', url: 'https://joyeriamerce.es/joyas/pendientes' },
          { '@type': 'ListItem', position: 3, name: 'Cadenas', url: 'https://joyeriamerce.es/joyas/cadenas' },
          { '@type': 'ListItem', position: 4, name: 'Pulseras', url: 'https://joyeriamerce.es/joyas/pulseras' },
          { '@type': 'ListItem', position: 5, name: 'Colgantes', url: 'https://joyeriamerce.es/joyas/colgantes' },
        ]
      },
      publisher: {
        '@type': 'JewelryStore',
        name: 'Joyería Mercè',
        url: 'https://joyeriamerce.es',
        telephone: '+34666238158',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Carrer del Trovador, 67',
          addressLocality: 'Puerto de Sagunto',
          addressRegion: 'Valencia',
          postalCode: '46520',
          addressCountry: 'ES'
        }
      }
    })
  }]
})

const tipos = [
  {
    slug: 'anillos',
    nombre: 'Anillos',
    desc: 'Desde alianzas de boda hasta anillos de uso diario, nuestra colección combina diseño y durabilidad en oro, plata y acero.',
    keywords: ['Alianzas', 'Anillos de pedida', 'Solitarios', 'Diseño exclusivo'],
    imagen: 'https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_anillo.webp?alt=media&token=529bcdc7-7175-4d40-a7d0-3cc1d7bcc24f'
  },
  {
    slug: 'pendientes',
    nombre: 'Pendientes',
    desc: 'Aros, dormilonas y pendientes colgantes para cada estilo. El par perfecto para el día a día o para una ocasión especial.',
    keywords: ['Aros', 'Dormilonas', 'Pendientes largos', 'Oro y plata'],
    imagen: 'https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_pendientes.webp?alt=media&token=fa0aa854-f592-4937-95af-32a624b9cba8'
  },
  {
    slug: 'cadenas',
    nombre: 'Cadenas',
    desc: 'Eslabón, forzadas, barbadas y más. Piezas versátiles que combinan con cualquier colgante o se lucen solas.',
    keywords: ['Eslabón', 'Forzadas', 'Barbadas', 'Veneziana'],
    imagen: 'https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_cadenas.webp?alt=media&token=7beaee3f-d559-4f12-8692-d3fb129a9b63'
  },
  {
    slug: 'pulseras',
    nombre: 'Pulseras',
    desc: 'Pulseras rígidas, de cadena y de diseño único. Desde piezas delicadas hasta diseños más atrevidos.',
    keywords: ['Rígidas', 'Cadena', 'Esclavas', 'Apilables'],
    imagen: 'https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_pulseras.webp?alt=media&token=f1f85e99-78da-45d2-8e03-99edd78bf8bb'
  },
  {
    slug: 'colgantes',
    nombre: 'Colgantes',
    desc: 'Dijes y colgantes para personalizar tu cadena favorita. Símbolos, formas geométricas y diseños únicos.',
    keywords: ['Dijes', 'Corazones', 'Geométricos', 'Personalizables'],
    imagen: 'https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2Fseccion_colgantes.webp?alt=media&token=c7610d83-f5cc-4080-800f-47160a4d9f46'
  },
]

const materiales = [
  {
    slug: 'oro',
    nombre: 'Oro',
    simbolo: 'Au',
    pureza: '9k · 18k',
    color: '#C9A55A',
    bg: '#FBF6EC',
    texto: 'El oro es el material más noble de la joyería. Resistente, hipoalergénico y con un brillo inconfundible que no desaparece con el tiempo.',
    propiedades: ['No se oxida ni se decolora', 'Hipoalergénico', 'Alta durabilidad', 'Valor que se mantiene'],
    tipos: ['Anillos', 'Cadenas', 'Pendientes', 'Pulseras', 'Colgantes']
  },
  {
    slug: 'plata',
    nombre: 'Plata',
    simbolo: 'Ag',
    pureza: '925',
    color: '#8A8A8A',
    bg: '#F5F5F5',
    texto: 'La plata de ley 925 es la preferida para joyas del día a día. Elegante, versátil y con una textura suave perfecta para todo tipo de diseños.',
    propiedades: ['Plata de ley 925', 'Textura suave y pulida', 'Ideal para el diario', 'Fácil de limpiar'],
    tipos: ['Anillos', 'Cadenas', 'Pendientes', 'Pulseras', 'Colgantes']
  },
  {
    slug: 'acero',
    nombre: 'Acero',
    simbolo: '316L',
    pureza: 'Quirúrgico',
    color: '#5A6470',
    bg: '#F0F2F4',
    texto: 'El acero quirúrgico 316L es la opción más resistente. No se oxida, no provoca alergias y mantiene su aspecto impecable con mínimo mantenimiento.',
    propiedades: ['Acero quirúrgico 316L', 'Resistente al agua', 'Sin mantenimiento', 'Apto para pieles sensibles'],
    tipos: ['Anillos', 'Cadenas', 'Pendientes', 'Pulseras', 'Colgantes']
  },
]
</script>

<style lang="sass" scoped>
$crema: #FDFCF8
$oscuro: #1a1a1a
$dorado: #C9A55A
$texto: #7a6e5f
$muted: #9a8f7f
$borde: rgba(0,0,0,0.08)

.header_all
    z-index: 99999

.pagina
  min-height: 100vh
  background: $crema

// ── Hero ──────────────────────────────────────────────────
.hero
  background: $oscuro
  color: #EDE9D8
  padding: 8rem 2rem 6rem
  position: relative
  overflow: hidden

  &::before
    content: ''
    position: absolute
    top: -100px
    right: -100px
    width: 500px
    height: 500px
    border-radius: 50%
    border: 1px solid rgba(201,165,90,0.15)
    pointer-events: none

  &::after
    content: ''
    position: absolute
    top: 50px
    right: 200px
    width: 300px
    height: 300px
    border-radius: 50%
    border: 1px solid rgba(201,165,90,0.08)
    pointer-events: none

.hero_inner
  max-width: 1100px
  margin: 0 auto
  display: grid
  grid-template-columns: 1fr auto
  align-items: center
  gap: 4rem

.hero_kicker
  font-size: 0.65rem
  letter-spacing: 0.3rem
  text-transform: uppercase
  color: $dorado
  margin-bottom: 1.5rem

.hero_titulo
  font-family: 'Playfair Display', serif
  font-size: clamp(3rem, 7vw, 5.5rem)
  font-weight: 700
  line-height: 1.05
  margin-bottom: 1.5rem
  color: #EDE9D8

  em
    font-style: italic
    color: $dorado

.hero_desc
  font-size: 0.95rem
  color: rgba(237,233,216,0.65)
  line-height: 1.8
  max-width: 480px
  margin-bottom: 2.5rem

.hero_cta
  display: inline-flex
  align-items: center
  gap: 10px
  background: $dorado
  color: $oscuro
  text-decoration: none
  padding: 14px 28px
  font-size: 0.8rem
  font-weight: 700
  letter-spacing: 0.1rem
  text-transform: uppercase
  transition: all 0.25s

  &:hover
    background: #EDE9D8
    transform: translateX(4px)

.hero_deco
  position: relative
  width: 120px
  height: 120px
  flex-shrink: 0

  @media (max-width: 768px)
    display: none

.deco_anillo
  position: absolute
  top: 0
  left: 0
  width: 100px
  height: 100px
  border-radius: 50%
  border: 2px solid rgba(201,165,90,0.4)

.deco_punto
  position: absolute
  top: 20px
  left: 20px
  width: 60px
  height: 60px
  border-radius: 50%
  border: 1px solid rgba(201,165,90,0.2)

.deco_linea
  position: absolute
  top: 50px
  left: -30px
  width: 160px
  height: 1px
  background: linear-gradient(to right, transparent, rgba(201,165,90,0.3), transparent)

// ── Intro SEO ─────────────────────────────────────────────
.intro_seo
  background: #EDE9D8
  padding: 2.5rem 2rem

.intro_inner
  max-width: 1100px
  margin: 0 auto

  p
    font-size: 0.9rem
    color: $texto
    line-height: 1.9
    margin: 0

    strong
      color: $oscuro
      font-weight: 600

// ── Section header ────────────────────────────────────────
.section_header
  max-width: 1100px
  margin: 0 auto 3rem
  display: flex
  align-items: center
  gap: 1.5rem
  padding: 0 2rem

  .section_num
    font-family: 'Playfair Display', serif
    font-size: 4rem
    font-weight: 700
    color: rgba(0,0,0,0.06)
    line-height: 1
    flex-shrink: 0

  h2
    font-family: 'Playfair Display', serif
    font-size: 1.8rem
    font-weight: 700
    color: $oscuro
    margin: 0 0 4px

  p
    font-size: 0.85rem
    color: $muted
    margin: 0

// ── Tipos ─────────────────────────────────────────────────
.tipos_section
  padding: 5rem 0 3rem

.tipos_grid
  max-width: 1100px
  margin: 0 auto
  padding: 0 2rem
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 1.5rem

  @media (max-width: 900px)
    grid-template-columns: repeat(2, 1fr)

  @media (max-width: 580px)
    grid-template-columns: 1fr

.tipo_card
  display: flex
  flex-direction: column
  background: #fff
  border: 1px solid $borde
  text-decoration: none
  color: inherit
  overflow: hidden
  transition: transform 0.3s ease, box-shadow 0.3s ease

  &:hover
    transform: translateY(-6px)
    box-shadow: 0 20px 48px rgba(0,0,0,0.1)

    .tipo_imagen img
      transform: scale(1.06)

    .tipo_link
      color: $dorado
      gap: 8px

.tipo_imagen
  height: 180px
  overflow: hidden
  background: linear-gradient(145deg, #f5f0e8, #ede9d8)

  img
    width: 100%
    height: 100%
    object-fit: contain
    padding: 1.5rem
    transition: transform 0.5s ease

.tipo_info
  padding: 1.5rem
  display: flex
  flex-direction: column
  flex: 1

.tipo_num
  font-size: 0.6rem
  letter-spacing: 0.2rem
  color: $dorado
  margin-bottom: 0.5rem
  display: block

h3
  font-family: 'Playfair Display', serif
  font-size: 1.3rem
  font-weight: 700
  color: $oscuro
  margin: 0 0 0.75rem

.tipo_desc
  font-size: 0.82rem
  color: $texto
  line-height: 1.7
  margin: 0 0 1rem
  flex: 1

.tipo_keywords
  display: flex
  flex-wrap: wrap
  gap: 6px
  list-style: none
  padding: 0
  margin: 0 0 1.25rem

  li
    font-size: 0.62rem
    letter-spacing: 0.08rem
    color: $muted
    background: #f5f0e8
    padding: 3px 10px
    border-radius: 2px
    text-transform: uppercase

.tipo_link
  display: inline-flex
  align-items: center
  gap: 6px
  font-size: 0.75rem
  font-weight: 600
  letter-spacing: 0.08rem
  text-transform: uppercase
  color: $oscuro
  transition: all 0.2s

// ── Materiales ────────────────────────────────────────────
.materiales_section
  padding: 3rem 0 5rem
  background: #F7F4EE

  .section_header
    .section_num
      color: rgba(0,0,0,0.05)

.materiales_grid
  max-width: 1100px
  margin: 0 auto
  padding: 0 2rem
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: 1.5rem

  @media (max-width: 900px)
    grid-template-columns: 1fr

.mat_card
  background: var(--mat-bg)
  border: 1px solid rgba(0,0,0,0.06)
  padding: 2rem
  text-decoration: none
  color: inherit
  display: flex
  flex-direction: column
  gap: 1.25rem
  transition: transform 0.25s ease, box-shadow 0.25s ease
  position: relative
  overflow: hidden

  &::before
    content: ''
    position: absolute
    top: 0
    left: 0
    width: 3px
    height: 100%
    background: var(--mat-color)
    opacity: 0
    transition: opacity 0.25s

  &:hover
    transform: translateY(-4px)
    box-shadow: 0 16px 40px rgba(0,0,0,0.08)

    &::before
      opacity: 1

    .mat_cta
      color: var(--mat-color)

.mat_top
  display: flex
  align-items: center
  gap: 1rem

.mat_circulo
  width: 52px
  height: 52px
  border-radius: 50%
  border: 1.5px solid var(--mat-color)
  display: flex
  align-items: center
  justify-content: center
  flex-shrink: 0

  span
    font-size: 0.75rem
    font-weight: 700
    color: var(--mat-color)
    letter-spacing: 0.05rem

.mat_cabecera
  display: flex
  flex-direction: column
  gap: 2px

  h3
    font-family: 'Playfair Display', serif
    font-size: 1.3rem
    font-weight: 700
    color: $oscuro
    margin: 0

.mat_pureza
  font-size: 0.65rem
  letter-spacing: 0.15rem
  text-transform: uppercase
  color: var(--mat-color)
  font-weight: 600

.mat_texto
  font-size: 0.83rem
  color: $texto
  line-height: 1.75
  margin: 0

.mat_propiedades
  list-style: none
  padding: 0
  margin: 0
  display: flex
  flex-direction: column
  gap: 7px

  li
    display: flex
    align-items: center
    gap: 8px
    font-size: 0.78rem
    color: $texto

.prop_dot
  width: 5px
  height: 5px
  border-radius: 50%
  background: var(--mat-color)
  flex-shrink: 0

.mat_footer
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: 1rem
  border-top: 1px solid rgba(0,0,0,0.07)

.mat_tipos
  font-size: 0.65rem
  color: $muted
  letter-spacing: 0.05rem

.mat_cta
  font-size: 0.75rem
  font-weight: 700
  color: $oscuro
  letter-spacing: 0.05rem
  transition: color 0.2s

// ── Local SEO ─────────────────────────────────────────────
.local_seo
  background: $oscuro
  color: #EDE9D8
  padding: 5rem 2rem

.local_inner
  max-width: 1100px
  margin: 0 auto
  display: grid
  grid-template-columns: 1fr 1fr
  gap: 5rem
  align-items: start

  @media (max-width: 768px)
    grid-template-columns: 1fr
    gap: 3rem

.local_texto
  h2
    font-family: 'Playfair Display', serif
    font-size: 2rem
    font-weight: 700
    color: #EDE9D8
    margin: 0 0 1.5rem

  p
    font-size: 0.9rem
    color: rgba(237,233,216,0.65)
    line-height: 1.85
    margin: 0 0 1rem

    strong
      color: rgba(237,233,216,0.9)

.local_acciones
  display: flex
  gap: 1rem
  margin-top: 2rem
  flex-wrap: wrap

.btn_primario
  display: inline-flex
  align-items: center
  background: $dorado
  color: $oscuro
  text-decoration: none
  padding: 12px 24px
  font-size: 0.78rem
  font-weight: 700
  letter-spacing: 0.08rem
  text-transform: uppercase
  transition: all 0.2s

  &:hover
    background: #EDE9D8

.btn_secundario
  display: inline-flex
  align-items: center
  border: 1px solid rgba(237,233,216,0.25)
  color: rgba(237,233,216,0.7)
  text-decoration: none
  padding: 12px 24px
  font-size: 0.78rem
  letter-spacing: 0.08rem
  text-transform: uppercase
  transition: all 0.2s

  &:hover
    border-color: rgba(237,233,216,0.6)
    color: #EDE9D8

.local_datos
  display: flex
  flex-direction: column

.dato
  display: flex
  align-items: flex-start
  gap: 1.25rem
  padding: 1.25rem 0
  border-bottom: 1px solid rgba(237,233,216,0.08)
  text-decoration: none
  color: inherit
  transition: opacity 0.2s

  &:first-child
    border-top: 1px solid rgba(237,233,216,0.08)

  &.dato_wa:hover .dato_icono
    color: #25D366

.dato_icono
  font-size: 1rem
  color: $dorado
  width: 20px
  flex-shrink: 0
  margin-top: 2px
  transition: color 0.2s

.dato div
  display: flex
  flex-direction: column
  gap: 2px

  strong
    font-size: 0.85rem
    color: rgba(237,233,216,0.9)
    font-weight: 600

  span
    font-size: 0.75rem
    color: rgba(237,233,216,0.4)
    line-height: 1.4
.ocasiones_section
  padding: 3rem 0 5rem

.ocasiones_grid
  max-width: 1100px
  margin: 0 auto
  padding: 0 2rem
  display: grid
  grid-template-columns: repeat(2, 1fr)
  gap: 1.5rem

  @media (max-width: 640px)
    grid-template-columns: 1fr

.ocasion_card
  display: flex
  flex-direction: column
  background: #fff
  border: 1px solid $borde
  text-decoration: none
  color: inherit
  overflow: hidden
  transition: transform 0.3s ease, box-shadow 0.3s ease

  &:hover
    transform: translateY(-6px)
    box-shadow: 0 20px 48px rgba(0,0,0,0.1)

    img
      transform: scale(1.04)

    span
      color: $dorado

  img
    width: 100%
    height: 260px
    object-fit: cover
    transition: transform 0.5s ease

.ocasion_info
  padding: 1.5rem

  h3
    font-family: 'Playfair Display', serif
    font-size: 1.3rem
    font-weight: 700
    color: $oscuro
    margin: 0 0 0.5rem

  p
    font-size: 0.83rem
    color: $texto
    line-height: 1.6
    margin: 0 0 1rem

  span
    font-size: 0.75rem
    font-weight: 600
    letter-spacing: 0.08rem
    text-transform: uppercase
    color: $oscuro
    transition: color 0.2s

// ── Responsive ────────────────────────────────────────────
@media (max-width: 768px)
  .hero
    padding: 6rem 1.5rem 4rem

  .hero_inner
    grid-template-columns: 1fr

  .tipos_section,
  .materiales_section
    padding: 3rem 0

  .section_header
    padding: 0 1.5rem
    margin-bottom: 2rem

  .tipos_grid,
  .materiales_grid
    padding: 0 1.5rem

  .local_seo
    padding: 3.5rem 1.5rem
</style>