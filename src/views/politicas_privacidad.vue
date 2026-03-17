<!-- views/PoliticaPrivacidad.vue -->
<template>
  <div class="pagina">
    <header_all />

    <section class="legal">
      <div class="legal-header">
        <div class="deco-line"></div>
        <p class="eyebrow">Legal</p>
        <h1 class="titulo">Política de Privacidad</h1>
        <p class="subtitulo">Joyería Mercè — Valencia</p>
        <div class="deco-line"></div>
      </div>

      <div class="legal-body">

        <section class="bloque">
          <h2>Responsable del tratamiento</h2>
          <p>En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales, te informamos de que el responsable del tratamiento de tus datos es:</p>
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
          <h2>Datos que recogemos</h2>
          <p>En Joyería Mercè únicamente recogemos el siguiente dato personal:</p>
          <p><strong>Correo electrónico</strong> — cuando el usuario decide suscribirse voluntariamente para recibir novedades sobre nuevas joyas disponibles en tienda.</p>
          <p>No recogemos ningún otro dato personal. No existe registro de usuarios, ni proceso de compra online, ni recogida de datos de pago, dirección postal ni información de navegación más allá de las cookies de analítica descritas en nuestra política de cookies.</p>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Finalidad del tratamiento</h2>
          <p>El correo electrónico facilitado se utiliza exclusivamente para:</p>
          <p><strong>Envío de novedades</strong> — informarte cuando lleguen nuevas piezas a la joyería. Nunca se utiliza para publicidad de terceros ni se cede a ninguna empresa externa.</p>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Base legal</h2>
          <p>El tratamiento de tu correo electrónico está basado en tu <strong>consentimiento expreso</strong>, otorgado en el momento en que introduces tu dirección de email y pulsas el botón de registro. Puedes retirar ese consentimiento en cualquier momento.</p>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Conservación de los datos</h2>
          <p>Conservamos tu correo electrónico mientras mantengas la suscripción activa. En el momento en que solicites la baja, eliminamos tu dirección de email de forma definitiva.</p>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Dónde se almacenan tus datos</h2>
          <p>Los correos electrónicos se almacenan en <strong>Firebase</strong> (Google LLC), que cumple con el RGPD y el marco de privacidad UE-EE.UU. Los emails de notificación se envían a través de <strong>Resend</strong>, un servicio de envío de correo electrónico que actúa como encargado del tratamiento.</p>
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Tus derechos</h2>
          <p>En virtud del RGPD, tienes derecho a:</p>
          <ul>
            <li><strong>Acceso</strong> — saber qué datos tuyos tenemos.</li>
            <li><strong>Rectificación</strong> — corregir datos incorrectos.</li>
            <li><strong>Supresión</strong> — eliminar tus datos ("derecho al olvido").</li>
            <li><strong>Oposición</strong> — oponerte al tratamiento.</li>
            <li><strong>Portabilidad</strong> — recibir tus datos en formato electrónico.</li>
          </ul>
          <p>Para ejercer cualquiera de estos derechos, escríbenos a <strong>sininos@gmail.com</strong> indicando el derecho que deseas ejercer. Responderemos en un plazo máximo de 30 días.</p>
          
        </section>

        <div class="separador">✦</div>

        <section class="bloque">
          <h2>Cómo darte de baja</h2>
          <p>Puedes cancelar tu suscripción en cualquier momento respondiendo a cualquier email de novedad que hayas recibido, o contactando directamente con nosotros en sininos@gmail.com. Eliminaremos tu dirección de forma inmediata.</p>
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
  title: 'Política de Privacidad — Joyería Mercè',
  meta: [
    { name: 'description', content: 'Política de privacidad y tratamiento de datos personales de Joyería Mercè.' },
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