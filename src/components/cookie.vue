<!-- components/CookieBanner.vue -->
<script setup>
import { useCookieConsent } from '@/composables/useCookieConsent'
const { mostrarBanner, aceptar, rechazar } = useCookieConsent()
</script>

<template>
  <Transition name="slide-up">
    <div v-if="mostrarBanner" class="cookie-banner">
      <div class="cookie-inner">
        <div class="cookie-header-row">
          <div class="cookie-deco">✦</div>
          <p class="cookie-title">Cookies & Privacidad</p>
        </div>
        <div class="cookie-text">
          <p class="cookie-desc">
            Usamos cookies para analizar las visitas a nuestra joyería y ofrecerte
            una mejor experiencia. Tus datos son tratados con la misma discreción
            que nuestras piezas.
            <a href="/politicas" class="cookie-link">Saber más</a>
          </p>
        </div>
        <div class="cookie-actions">
          <button class="btn-rechazar" @click="rechazar">Declinar</button>
          <button class="btn-aceptar" @click="aceptar">
            <span class="btn-shine"></span>
            Aceptar
          </button>
        </div>
      </div>
      <div class="cookie-border-top"></div>
    </div>
  </Transition>
</template>

<style scoped>

.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #faf8f5;
  z-index: 9999;
  font-family: 'Montserrat', sans-serif;
  box-shadow: 0 -8px 40px rgba(180, 150, 80, 0.08), 0 -1px 0 rgba(201,168,76,0.15);
}

.cookie-border-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #c9a84c 30%, #f0d080 50%, #c9a84c 70%, transparent 100%);
}

.cookie-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Fila decorativa (oculta en desktop, visible en móvil) */
.cookie-header-row {
  display: none;
  align-items: center;
  gap: 0.6rem;
}

.cookie-deco {
  font-size: 1.4rem;
  color: #c9a84c;
  flex-shrink: 0;
  opacity: 0.7;
  animation: pulse-gold 3s ease-in-out infinite;
}

/* En desktop el deco va solo */
.cookie-inner > .cookie-deco {
  display: block;
}

.cookie-text { flex: 1; }

.cookie-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #a07c30;
  margin: 0 0 0.35rem 0;
}

.cookie-desc {
  font-size: 0.75rem;
  font-weight: 300;
  color: #7a7570;
  margin: 0;
  line-height: 1.7;
  letter-spacing: 0.03em;
}

.cookie-link {
  color: #b8922a;
  text-decoration: none;
  border-bottom: 1px solid rgba(184, 146, 42, 0.35);
  padding-bottom: 1px;
  transition: border-color 0.2s, color 0.2s;
}
.cookie-link:hover {
  border-color: #b8922a;
  color: #9a7820;
}

.cookie-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
  align-items: center;
}

.btn-rechazar {
  background: transparent;
  color: #aaa49e;
  border: 1px solid #ddd8d0;
  padding: 0.6rem 1.4rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
}
.btn-rechazar:hover {
  color: #7a7570;
  border-color: #c0bab2;
}

.btn-aceptar {
  position: relative;
  overflow: hidden;
  border: none;
  padding: 0.6rem 1.8rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%);
  background-size: 200% 200%;
  transition: background-position 0.4s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 12px rgba(201, 168, 76, 0.3);
}
.btn-aceptar:hover {
  background-position: right center;
  box-shadow: 0 4px 20px rgba(201, 168, 76, 0.45);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -75%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transform: skewX(-20deg);
  animation: shine 4s ease-in-out infinite;
}

/* ── MÓVIL ── */
@media (max-width: 600px) {
  .cookie-inner {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.1rem 1.1rem 1.3rem;
    gap: 0.9rem;
  }

  /* Ocultar deco suelto y mostrar la fila combinada */
  .cookie-inner > .cookie-deco {
    display: none;
  }
  .cookie-header-row {
    display: flex;
  }
  .cookie-header-row .cookie-deco {
    font-size: 1.1rem;
  }
  .cookie-header-row .cookie-title {
    margin: 0;
    font-size: 0.88rem;
  }

  /* Título ya está en header-row, ocultar el del texto */
  .cookie-text .cookie-title {
    display: none;
  }

  .cookie-desc {
    font-size: 0.72rem;
  }

  .cookie-actions {
    width: 100%;
    gap: 0.6rem;
  }

  .btn-rechazar {
    flex: 1;
    padding: 0.65rem 0;
    font-size: 0.65rem;
    text-align: center;
  }

  .btn-aceptar {
    flex: 2;
    padding: 0.65rem 0;
    font-size: 0.65rem;
    text-align: center;
  }
}

@keyframes pulse-gold {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.15); }
}

@keyframes shine {
  0% { left: -75%; }
  30%, 100% { left: 125%; }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>