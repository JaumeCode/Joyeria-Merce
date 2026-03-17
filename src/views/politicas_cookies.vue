<!-- views/PoliticaCookies.vue -->
<template>
  <div class="politica-page">
    <div class="politica-header">
      <div class="deco-line"></div>
      <p class="eyebrow">Aviso legal</p>
      <h1 class="titulo">Política de Cookies</h1>
      <p class="subtitulo">Joyería Mercè — Valencia</p>
      <div class="deco-line"></div>
    </div>

    <div class="politica-body">

      <section class="bloque">
        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas un sitio web.
          Su función es recordar información sobre tu visita para facilitar tu experiencia y permitirnos
          mejorar nuestros servicios.
        </p>
      </section>

      <div class="separador">✦</div>

      <section class="bloque">
        <h2>Cookies que utilizamos</h2>
        <p>En <strong>Joyería Mercè</strong> únicamente utilizamos dos tipos de cookies:</p>

        <div class="cookie-tabla">
          <div class="cookie-fila header">
            <span>Nombre</span>
            <span>Tipo</span>
            <span>Finalidad</span>
            <span>Duración</span>
          </div>

          <div class="cookie-fila">
            <span class="mono">cookies_analytics</span>
            <span class="badge propia">Propia</span>
            <span>Guarda si has aceptado o rechazado el uso de cookies analíticas</span>
            <span>1 año</span>
          </div>

          <div class="cookie-fila">
            <span class="mono">_ga</span>
            <span class="badge terceros">Terceros</span>
            <span>Google Analytics. Identifica visitantes únicos para estadísticas de visitas</span>
            <span>2 años</span>
          </div>

          <div class="cookie-fila">
            <span class="mono">_ga_XXXX</span>
            <span class="badge terceros">Terceros</span>
            <span>Google Analytics. Registra la sesión activa del usuario</span>
            <span>2 años</span>
          </div>
        </div>

        <p class="nota">
          Las cookies de Google Analytics solo se activan si has dado tu consentimiento explícito.
          Si las rechazas, no se crea ninguna de ellas y no se recoge ningún dato de navegación.
        </p>
      </section>

      <div class="separador">✦</div>

      <section class="bloque">
        <h2>Formulario de suscripción por email</h2>
        <p>
          En nuestra web existe la posibilidad de dejar tu correo electrónico para recibir
          notificaciones cuando lleguen nuevas joyas a la tienda.
        </p>
        <p>
          Este servicio es completamente <strong>voluntario</strong>. El correo electrónico que nos facilitas
          se utiliza exclusivamente para enviarte avisos de nuevas colecciones y nunca se cede
          a terceros ni se usa con fines publicitarios ajenos a la joyería.
        </p>
        <p>
          Puedes darte de baja en cualquier momento respondiendo al correo o contactando
          directamente con nosotros.
        </p>
        <p>
          El almacenamiento del email no utiliza cookies — se guarda en nuestra base de datos
          de forma independiente y solo con tu consentimiento expreso.
        </p>
      </section>

      <div class="separador">✦</div>

      <section class="bloque">
        <h2>Cómo gestionar o retirar tu consentimiento</h2>
        <p>
          Puedes cambiar tu decisión sobre las cookies en cualquier momento borrando las cookies
          de tu navegador. La próxima vez que visites la web te volveremos a preguntar.
        </p>
        <p>Instrucciones para los navegadores más comunes:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
          <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener">Microsoft Edge</a></li>
        </ul>
      </section>

      <div class="separador">✦</div>

      <section class="bloque">
        <h2>Más información</h2>
        <p>
          Para cualquier consulta sobre el uso de tus datos o el tratamiento de cookies
          puedes contactarnos en:
        </p>
        <p class="contacto">
          <strong>Joyería Mercè</strong><br>
          Valencia, España<br>
          <!-- Añade aquí tu email de contacto -->
        </p>
        <p class="fecha">Última actualización: marzo de 2026</p>
      </section>

    </div>
  </div>
</template>
<script setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Política de Cookies — Joyería Mercè',
  meta: [
    { name: 'description', content: 'Información sobre el uso de cookies en la web de Joyería Mercè.' },
    { name: 'robots', content: 'noindex, follow' }
  ]
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500&display=swap');

.politica-page {
  min-height: 100vh;
  background: #faf8f5;
  color: #5a5550;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
}

.politica-header {
  text-align: center;
  padding: 5rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.deco-line {
  width: 120px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a84c, transparent);
}

.eyebrow {
  font-size: 0.65rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #a07c30;
  margin: 0;
}

.titulo {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 300;
  color: #2a2520;
  margin: 0;
  letter-spacing: 0.05em;
}

.subtitulo {
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #b8b0a8;
  margin: 0;
}

.politica-body {
  max-width: 780px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
}

.bloque {
  margin-bottom: 1rem;
}

.bloque h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: #2a2520;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e8e2d8;
}

.bloque p, .bloque li {
  font-size: 0.82rem;
  line-height: 1.9;
  color: #7a7570;
  margin: 0 0 0.85rem 0;
}

.bloque strong {
  color: #3a3530;
  font-weight: 500;
}

.bloque ul {
  padding-left: 1.2rem;
}

.bloque ul li {
  margin-bottom: 0.4rem;
}

.bloque a {
  color: #b8922a;
  text-decoration: none;
  border-bottom: 1px solid rgba(184,146,42,0.3);
  transition: border-color 0.2s, color 0.2s;
}

.bloque a:hover {
  border-color: #b8922a;
  color: #9a7820;
}

.separador {
  text-align: center;
  color: #c9a84c;
  opacity: 0.5;
  font-size: 0.8rem;
  margin: 2.5rem 0;
  letter-spacing: 0.5em;
}

.cookie-tabla {
  border: 1px solid #e8e2d8;
  margin: 1.25rem 0;
  font-size: 0.75rem;
}

.cookie-fila {
  display: grid;
  grid-template-columns: 1.4fr 0.7fr 2.5fr 0.8fr;
  gap: 0;
  border-bottom: 1px solid #efe9df;
}

.cookie-fila:last-child {
  border-bottom: none;
}

.cookie-fila span {
  padding: 0.75rem 1rem;
  color: #8a8480;
  line-height: 1.5;
  border-right: 1px solid #efe9df;
}

.cookie-fila span:last-child {
  border-right: none;
}

.cookie-fila.header span {
  color: #a07c30;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: #f4f0ea;
}

.mono {
  font-family: 'Courier New', monospace;
  font-size: 0.72rem !important;
  color: #7a8a70 !important;
}

.badge {
  display: inline-block;
  font-size: 0.6rem !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.2rem 0.5rem !important;
  border-radius: 2px;
  align-self: center;
  margin: auto 1rem;
}

.badge.propia {
  background: rgba(201,168,76,0.1);
  color: #a07c30 !important;
  border: 1px solid rgba(201,168,76,0.3);
}

.badge.terceros {
  background: rgba(100,100,90,0.06);
  color: #8a8480 !important;
  border: 1px solid rgba(100,100,90,0.15);
}

.nota {
  font-size: 0.75rem !important;
  color: #a0998f !important;
  font-style: italic;
  padding-left: 1rem;
  border-left: 2px solid #e0d8cc;
}

.contacto {
  line-height: 2 !important;
}

.fecha {
  font-size: 0.7rem !important;
  color: #c0b8b0 !important;
  margin-top: 2rem !important;
}
</style>