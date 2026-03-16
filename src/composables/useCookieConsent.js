// composables/useCookieConsent.js
import { ref } from 'vue'  // ← quitado watch
import Cookies from 'js-cookie'

export function useCookieConsent() {
  const consentido = ref(Cookies.get('cookies_analytics') || null)
  const mostrarBanner = ref(!consentido.value)

  function aceptar() {
    Cookies.set('cookies_analytics', 'true', { expires: 365, sameSite: 'Lax' })
    consentido.value = 'true'
    mostrarBanner.value = false
    activarAnalytics()
  }

  function rechazar() {
    Cookies.set('cookies_analytics', 'false', { expires: 365, sameSite: 'Lax' })
    consentido.value = 'false'
    mostrarBanner.value = false
  }

  function activarAnalytics() {
    if (window.gtag) return
    const script = document.createElement('script')
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'
    script.async = true
    document.head.appendChild(script)
    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      window.gtag = function() { window.dataLayer.push(arguments) }
      window.gtag('js', new Date())
      window.gtag('config', 'G-XXXXXXXXXX')
    }
  }

  if (consentido.value === 'true') {
    activarAnalytics()
  }

  return { consentido, mostrarBanner, aceptar, rechazar }
}