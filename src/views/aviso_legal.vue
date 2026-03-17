<!-- views/AvisoLegal.vue -->
<template>
  <div class="pagina">
    <header_all />

    <section class="legal">
      <div class="legal-header">
        <div class="deco-line"></div>
        <p class="eyebrow">Legal</p>
        <h1 class="titulo">Aviso Legal</h1>
        <p class="subtitulo">Joyería Mercè — Valencia</p>
        <div class="deco-line"></div>
      </div>

      <div class="legal-body">

        <section class="bloque">
          <h2>Datos identificativos</h2>
          <p>En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos identificativos:</p>
          <div class="datos-tabla">
            <div class="dato-fila">
              <span class="dato-label">Titular</span>
              <span class="dato-valor">Raquel Bernal Guerrero</span>
            </div>
            <div class="dato-fila">
              <span class="dato-label">NIF</span>
              <span class="dato-valor">20.816.518T</span>
            </div>
            <div class="dato-fila">
              <span class="dato-label">Actividad</span>
              <span class="dato-valor">Joyería artesanal — Joyería Mercè</span>
            </div>
            <div class="dato-fila">
              <span class="dato-label">Dirección</span>
              <span class="dato-valor">Carrer del Trovador, 67 — 46520 Puerto de Sagunto, Valencia</span>
            </div>
            <div class="dato-fila">
              <span class="dato-label">Teléfono</span>
              <span class="dato-valor">+34 962 67 87 34</span>
            </div>
            <div class="dato-fila">
              <span class="dato-label">Email</span>
              <span class="dato-valor">sininos@gmail.com</span>
            </div>
          </div>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Objeto y ámbito de aplicación</h2>
          <p>El presente Aviso Legal regula el acceso y uso del sitio web de Joyería Mercè, cuya finalidad es mostrar el catálogo de joyas artesanales disponibles en tienda física e informar sobre la ubicación y horarios del establecimiento.</p>
          <p>El acceso y uso de este sitio web implica la aceptación plena de las condiciones recogidas en este aviso legal. Si no estás de acuerdo con alguna de estas condiciones, te rogamos que no accedas ni utilices este sitio.</p>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Propiedad intelectual e industrial</h2>
          <p>Todos los contenidos de este sitio web — incluyendo textos, fotografías, imágenes, logotipos y diseño gráfico — son propiedad de Raquel Bernal Guerrero o de terceros que han autorizado su uso, y están protegidos por la legislación española e internacional sobre propiedad intelectual e industrial.</p>
          <p>Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación de estos contenidos sin autorización expresa y por escrito de la titular.</p>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Responsabilidad</h2>
          <p>La titular no se responsabiliza de los daños o perjuicios de cualquier naturaleza derivados del uso del sitio web, incluyendo los causados por virus informáticos o errores en los contenidos.</p>
          <p>La información sobre disponibilidad de las joyas se actualiza con la mayor diligencia posible, pero puede existir un desfase entre la información publicada y el stock real en tienda. Se recomienda contactar por teléfono o WhatsApp para confirmar la disponibilidad antes de desplazarse.</p>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Legislación aplicable</h2>
          <p>Este aviso legal se rige por la legislación española. Para cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los juzgados y tribunales de Valencia, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>
          <p class="fecha">Última actualización: marzo de 2026</p>
        </section>

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
  title: 'Aviso Legal — Joyería Mercè',
  meta: [
    { name: 'description', content: 'Aviso legal e información sobre el titular de la web Joyería Mercè.' },
    { name: 'robots', content: 'noindex, follow' }
  ]
})
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500&display=swap')

.pagina
  min-height: 100vh
  background: #faf8f5
  font-family: 'Montserrat', sans-serif
  font-weight: 300

.legal
  padding: 8rem 2rem 5rem

.legal-header
  text-align: center
  padding-bottom: 3rem
  display: flex
  flex-direction: column
  align-items: center
  gap: 1rem

.deco-line
  width: 120px
  height: 1px
  background: linear-gradient(90deg, transparent, #c9a84c, transparent)

.eyebrow
  font-size: 0.65rem
  letter-spacing: 0.35em
  text-transform: uppercase
  color: #a07c30
  margin: 0

.titulo
  font-family: 'Cormorant Garamond', serif
  font-size: clamp(2rem, 5vw, 3.2rem)
  font-weight: 300
  color: #2a2520
  margin: 0
  letter-spacing: 0.05em

.subtitulo
  font-size: 0.7rem
  letter-spacing: 0.2em
  text-transform: uppercase
  color: #b8b0a8
  margin: 0

.legal-body
  max-width: 780px
  margin: 0 auto
  padding: 2rem 0 4rem

.bloque
  margin-bottom: 1rem

  h2
    font-family: 'Cormorant Garamond', serif
    font-size: 1.4rem
    font-weight: 400
    color: #2a2520
    letter-spacing: 0.05em
    margin: 0 0 1rem 0
    padding-bottom: 0.5rem
    border-bottom: 1px solid #e8e2d8

  p, li
    font-size: 0.82rem
    line-height: 1.9
    color: #7a7570
    margin: 0 0 0.85rem 0

  strong
    color: #3a3530
    font-weight: 500

  ul
    padding-left: 1.2rem

  li
    margin-bottom: 0.4rem

.separador
  text-align: center
  color: #c9a84c
  opacity: 0.5
  font-size: 0.8rem
  margin: 2.5rem 0
  letter-spacing: 0.5em

.datos-tabla
  border: 1px solid #e8e2d8
  border-radius: 8px
  overflow: hidden
  margin: 1rem 0

.dato-fila
  display: grid
  grid-template-columns: 130px 1fr
  border-bottom: 1px solid #efe9df

  &:last-child
    border-bottom: none

.dato-label
  padding: 0.7rem 1rem
  font-size: 0.65rem
  letter-spacing: 0.15em
  text-transform: uppercase
  color: #a07c30
  background: #f4f0ea
  border-right: 1px solid #efe9df

.dato-valor
  padding: 0.7rem 1rem
  font-size: 0.8rem
  color: #5a5550
  line-height: 1.5

.fecha
  font-size: 0.7rem !important
  color: #c0b8b0 !important
  margin-top: 2rem !important

@media (max-width: 768px)
  .legal
    padding: 6rem 1rem 3rem

  .dato-fila
    grid-template-columns: 100px 1fr
</style>