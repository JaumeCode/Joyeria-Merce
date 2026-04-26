<template>
  <div class="scene">
    <canvas ref="bgCanvas"></canvas>

    <!-- Orbit rings -->
    <div class="rings-layer">
      <div class="ring ring-1">
        <div class="ring-dot dot-top"></div>
        <div class="ring-dot dot-bottom"></div>
      </div>
      <div class="ring ring-2">
        <div class="ring-dot dot-top"></div>
      </div>
      <div class="ring ring-3"></div>
    </div>

    <!-- Corner frames -->
    <svg class="corner tl" viewBox="0 0 70 70" fill="none">
      <line x1="3" y1="67" x2="3" y2="3" stroke="#B8985A" stroke-width="0.5"/>
      <line x1="3" y1="3" x2="67" y2="3" stroke="#B8985A" stroke-width="0.5"/>
      <line x1="3" y1="18" x2="18" y2="3" stroke="#B8985A" stroke-width="0.5" opacity="0.4"/>
      <circle cx="3" cy="3" r="2.5" fill="#B8985A"/>
    </svg>
    <svg class="corner tr" viewBox="0 0 70 70" fill="none">
      <line x1="3" y1="67" x2="3" y2="3" stroke="#B8985A" stroke-width="0.5"/>
      <line x1="3" y1="3" x2="67" y2="3" stroke="#B8985A" stroke-width="0.5"/>
      <line x1="3" y1="18" x2="18" y2="3" stroke="#B8985A" stroke-width="0.5" opacity="0.4"/>
      <circle cx="3" cy="3" r="2.5" fill="#B8985A"/>
    </svg>
    <svg class="corner bl" viewBox="0 0 70 70" fill="none">
      <line x1="3" y1="67" x2="3" y2="3" stroke="#B8985A" stroke-width="0.5"/>
      <line x1="3" y1="3" x2="67" y2="3" stroke="#B8985A" stroke-width="0.5"/>
      <line x1="3" y1="18" x2="18" y2="3" stroke="#B8985A" stroke-width="0.5" opacity="0.4"/>
      <circle cx="3" cy="3" r="2.5" fill="#B8985A"/>
    </svg>
    <svg class="corner br" viewBox="0 0 70 70" fill="none">
      <line x1="3" y1="67" x2="3" y2="3" stroke="#B8985A" stroke-width="0.5"/>
      <line x1="3" y1="3" x2="67" y2="3" stroke="#B8985A" stroke-width="0.5"/>
      <line x1="3" y1="18" x2="18" y2="3" stroke="#B8985A" stroke-width="0.5" opacity="0.4"/>
      <circle cx="3" cy="3" r="2.5" fill="#B8985A"/>
    </svg>

    <!-- Side ornaments (solo desktop) -->
    <div class="side-orn left">
      <svg width="40" height="160" viewBox="0 0 40 160" fill="none">
        <line x1="20" y1="0" x2="20" y2="55" stroke="#B8985A" stroke-width="0.5"/>
        <rect x="12" y="55" width="16" height="16" transform="rotate(45 20 63)" stroke="#B8985A" stroke-width="0.5" fill="rgba(184,152,90,0.12)"/>
        <line x1="20" y1="72" x2="20" y2="100" stroke="#B8985A" stroke-width="0.5" stroke-dasharray="3 4"/>
        <circle cx="20" cy="107" r="3.5" stroke="#B8985A" stroke-width="0.5" fill="rgba(184,152,90,0.15)"/>
        <line x1="20" y1="113" x2="20" y2="160" stroke="#B8985A" stroke-width="0.5"/>
      </svg>
    </div>
    <div class="side-orn right">
      <svg width="40" height="160" viewBox="0 0 40 160" fill="none">
        <line x1="20" y1="0" x2="20" y2="55" stroke="#B8985A" stroke-width="0.5"/>
        <rect x="12" y="55" width="16" height="16" transform="rotate(45 20 63)" stroke="#B8985A" stroke-width="0.5" fill="rgba(184,152,90,0.12)"/>
        <line x1="20" y1="72" x2="20" y2="100" stroke="#B8985A" stroke-width="0.5" stroke-dasharray="3 4"/>
        <circle cx="20" cy="107" r="3.5" stroke="#B8985A" stroke-width="0.5" fill="rgba(184,152,90,0.15)"/>
        <line x1="20" y1="113" x2="20" y2="160" stroke="#B8985A" stroke-width="0.5"/>
      </svg>
    </div>

    <!-- Floating gems -->
    <div
      v-for="gem in gems"
      :key="gem.id"
      class="gem"
      :style="gem.style"
    ></div>

    <!-- Main content -->
    <div class="content">
      <p class="eyebrow">Puerto de Sagunto &nbsp;·&nbsp; Joyería Artesanal</p>
      <h1 class="title">Joyería Mercè</h1>
      <div class="divider">
        <div class="divider-line"></div>
        <div class="divider-diamond"></div>
        <div class="divider-line"></div>
      </div>
      <p class="tagline">Brilla con Elegancia</p>
      <button class="cta" @click="$emit('catalogo')">
        <span>Descubrir Colección</span>
      </button>

      <!-- Solo mobile: categorías rápidas -->
      <div class="mobile-cats">
        <span>Anillos</span>
        <span>·</span>
        <span>Pulseras</span>
        <span>·</span>
        <span>Colgantes</span>
      </div>
    </div>

    <!-- Scroll hint (solo mobile) -->
    <div class="scroll-hint">
      <div class="scroll-arrow"></div>
    </div>

    <p class="footer-text">
      Anillos &nbsp;·&nbsp; Pulseras &nbsp;·&nbsp; Cadenas &nbsp;·&nbsp; Colgantes &nbsp;·&nbsp; Pendientes
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['catalogo'])

const bgCanvas = ref(null)
let ctx, W, H, rafId
let mouse = { x: -9999, y: -9999 }

const isMobile = () => window.innerWidth < 768

function resize() {
  W = bgCanvas.value.width  = bgCanvas.value.offsetWidth
  H = bgCanvas.value.height = bgCanvas.value.offsetHeight
}

class Dust {
  constructor() { this.init() }
  init() {
    this.x  = Math.random() * W
    this.y  = Math.random() * H
    this.r  = Math.random() * 1.6 + 0.3
    this.vx = (Math.random() - 0.5) * 0.18
    this.vy = (Math.random() - 0.5) * 0.18
    this.a  = Math.random() * 0.3 + 0.06
    this.phase = Math.random() * Math.PI * 2
    this.speed = 0.012 + Math.random() * 0.01
    this.gold  = Math.random() > 0.35
  }
  tick() {
    this.x += this.vx
    this.y += this.vy
    this.phase += this.speed
    const dx = this.x - mouse.x
    const dy = this.y - mouse.y
    const d  = Math.sqrt(dx * dx + dy * dy)
    if (d < 90) { this.vx += dx * 0.00025; this.vy += dy * 0.00025 }
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.init()
  }
  draw() {
    const alpha = this.a * (0.65 + 0.35 * Math.sin(this.phase))
    ctx.globalAlpha = alpha
    ctx.fillStyle   = this.gold ? '#C9A55A' : '#8B7A6A'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
    if (this.r > 1.1 && Math.sin(this.phase) > 0.6) {
      ctx.globalAlpha = alpha * 0.25
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r * 3.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

class StarSparkle {
  constructor(randomDelay = true) { this.init(randomDelay) }
  init(randomDelay = false) {
    this.x       = 40 + Math.random() * (W - 80)
    this.y       = 40 + Math.random() * (H - 80)
    this.maxSize = 8 + Math.random() * 12
    this.life    = 0
    this.maxLife = 70 + Math.random() * 90
    this.delay   = randomDelay ? Math.random() * 180 : 0
    this.timer   = 0
  }
  tick() {
    this.timer++
    if (this.timer < this.delay) return
    this.life++
    if (this.life > this.maxLife) this.init(false)
  }
  draw() {
    if (this.timer < this.delay) return
    const t     = this.life / this.maxLife
    const alpha = Math.sin(t * Math.PI) * 0.85
    const s     = this.maxSize * Math.sin(t * Math.PI)
    ctx.globalAlpha = alpha
    ctx.strokeStyle  = '#D4AF6E'
    ctx.lineWidth    = 0.9
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI
      ctx.beginPath()
      ctx.moveTo(this.x + Math.cos(angle) * s, this.y + Math.sin(angle) * s)
      ctx.lineTo(this.x - Math.cos(angle) * s, this.y - Math.sin(angle) * s)
      ctx.stroke()
    }
    ctx.globalAlpha = alpha * 0.35
    ctx.fillStyle   = '#F0D090'
    ctx.beginPath()
    ctx.arc(this.x, this.y, s * 0.25, 0, Math.PI * 2)
    ctx.fill()
  }
}

let dustArr  = []
let starsArr = []

function loop() {
  ctx.clearRect(0, 0, W, H)
  dustArr.forEach(d  => { d.tick(); d.draw() })
  starsArr.forEach(s => { s.tick(); s.draw() })
  ctx.globalAlpha = 1
  rafId = requestAnimationFrame(loop)
}

const gems = ref([])
let gemCounter = 0
let gemInterval = null
const gemColors = ['#C9A55A','#D4AF6E','#B8985A','#E8C882','#A07840','#F2D590']

function spawnGem() {
  const size  = 3 + Math.random() * 7
  const x     = Math.random() * 100
  const dur   = 7 + Math.random() * 11
  const delay = Math.random() * 2
  const color = gemColors[Math.floor(Math.random() * gemColors.length)]
  const isSquare = Math.random() > 0.5
  const id    = gemCounter++

  gems.value.push({
    id,
    style: `
      left:${x}%;
      bottom:-10px;
      width:${size}px;
      height:${size}px;
      background:${color};
      border-radius:${isSquare ? '1px' : '50%'};
      transform: rotate(${isSquare ? '45deg' : '0'});
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color}99;
    `
  })

  setTimeout(() => {
    gems.value = gems.value.filter(g => g.id !== id)
  }, (dur + delay + 1) * 1000)
}

function onMouseMove(e) {
  const rect = bgCanvas.value?.getBoundingClientRect()
  if (rect) { mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top }
}

onMounted(() => {
  ctx = bgCanvas.value.getContext('2d')
  
  setTimeout(() => {
    resize()
    
    const mobile = isMobile()
    dustArr  = Array.from({ length: mobile ? 35 : 80 }, () => new Dust())
    starsArr = Array.from({ length: mobile ? 10 : 22  }, () => new StarSparkle(true))

    loop()

    const gemCount = mobile ? 8 : 18
    for (let i = 0; i < gemCount; i++) setTimeout(spawnGem, i * 260)
    gemInterval = setInterval(spawnGem, mobile ? 700 : 420)
  }, 50)

  window.addEventListener('resize', resize)
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  clearInterval(gemInterval)
  window.removeEventListener('resize', resize)
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<style lang="sass" scoped>


.scene
  width: 100%
  height: 100vh
  background: #F4F0E8
  position: relative
  display: flex
  align-items: center
  justify-content: center
  overflow: hidden

canvas
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  pointer-events: none
  z-index: 1

// ── Orbit rings ───────────────────────────────────────────────────────────────
.rings-layer
  position: absolute
  inset: 0
  display: flex
  align-items: center
  justify-content: center
  pointer-events: none
  z-index: 2

.ring
  position: absolute
  border-radius: 50%
  border: 0.5px solid rgba(184,152,90,0.22)

  &.ring-1
    width: 420px
    height: 420px
    animation: spin 18s linear infinite

  &.ring-2
    width: 640px
    height: 640px
    border-style: dashed
    animation: spin 30s linear infinite reverse

  &.ring-3
    width: 860px
    height: 860px
    border-color: rgba(184,152,90,0.1)
    animation: spin 45s linear infinite

.ring-dot
  position: absolute
  width: 9px
  height: 9px
  border-radius: 50%
  background: #C9A55A
  box-shadow: 0 0 10px 3px rgba(201,165,90,0.65)

  &.dot-top
    top: -4.5px
    left: 50%
    transform: translateX(-50%)
    animation: dotPulse 2.5s ease-in-out infinite

  &.dot-bottom
    bottom: -4.5px
    left: 50%
    transform: translateX(-50%)
    animation: dotPulse 2.5s ease-in-out infinite 1.25s

// ── Corners ───────────────────────────────────────────────────────────────────
.corner
  position: absolute
  width: 70px
  height: 70px
  z-index: 3
  opacity: 0.55

  &.tl
    top: 28px
    left: 28px

  &.tr
    top: 28px
    right: 28px
    transform: scaleX(-1)

  &.bl
    bottom: 28px
    left: 28px
    transform: scaleY(-1)

  &.br
    bottom: 28px
    right: 28px
    transform: scale(-1)

// ── Side ornaments ────────────────────────────────────────────────────────────
.side-orn
  position: absolute
  z-index: 3
  opacity: 0
  animation: fadeUp 1.5s ease forwards 1.8s

  &.left
    left: 6%
    top: 50%
    transform: translateY(-50%)

  &.right
    right: 6%
    top: 50%
    transform: translateY(-50%)

// ── Gems ──────────────────────────────────────────────────────────────────────
.gem
  position: absolute
  pointer-events: none
  z-index: 4
  animation: floatUp linear infinite

// ── Content ───────────────────────────────────────────────────────────────────
.content
  position: relative
  z-index: 10
  text-align: center
  display: flex
  flex-direction: column
  align-items: center

.eyebrow
  font-family: 'Cormorant Garamond', serif
  font-weight: 300
  font-size: 11px
  letter-spacing: 0.55em
  color: #A0896A
  text-transform: uppercase
  opacity: 0
  animation: fadeUp 1.2s ease forwards 0.3s
  margin-bottom: 20px

.title
  font-family: 'Playfair Display', serif
  font-weight: 600
  font-size: clamp(50px, 8vw, 98px)
  letter-spacing: 0.07em
  line-height: 1.15
  padding-bottom: 0.12em
  background: linear-gradient(90deg, #2A2318 0%, #8B6D45 30%, #D4AF6E 50%, #8B6D45 70%, #2A2318 100%)
  background-size: 250% auto
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-clip: text
  opacity: 0
  animation: fadeUp 1.4s cubic-bezier(0.16,1,0.3,1) forwards 0.6s, goldShimmer 4s linear infinite 2.5s

.divider
  display: flex
  align-items: center
  gap: 14px
  margin: 22px 0
  opacity: 0
  animation: fadeUp 1.2s ease forwards 1s

.divider-line
  width: 70px
  height: 0.5px
  background: linear-gradient(90deg, transparent, #B8985A, transparent)

.divider-diamond
  width: 9px
  height: 9px
  background: #B8985A
  transform: rotate(45deg)
  box-shadow: 0 0 6px 2px rgba(184,152,90,0.4)
  animation: diamondPulse 2.2s ease-in-out infinite 1.5s

.tagline
  font-family: 'Cormorant Garamond', serif
  font-style: italic
  font-weight: 300
  font-size: clamp(15px, 2.2vw, 22px)
  color: #6B5A42
  letter-spacing: 0.3em
  opacity: 0
  animation: fadeUp 1.2s ease forwards 1.2s
  margin-bottom: 40px

.cta
  font-family: 'Cormorant Garamond', serif
  font-weight: 400
  font-size: 12px
  letter-spacing: 0.45em
  text-transform: uppercase
  color: #F4F0E8
  background: #2A2318
  border: none
  padding: 17px 48px
  cursor: pointer
  opacity: 0
  animation: fadeUp 1s ease forwards 1.6s
  position: relative
  overflow: hidden
  transition: color 0.4s

  &::before
    content: ''
    position: absolute
    inset: 0
    background: #8B6D45
    transform: scaleX(0)
    transform-origin: left
    transition: transform 0.45s cubic-bezier(0.4,0,0.2,1)

  &:hover::before
    transform: scaleX(1)

  span
    position: relative
    z-index: 1

// Categorías rápidas (solo mobile)
.mobile-cats
  display: none
  align-items: center
  gap: 10px
  margin-top: 28px
  opacity: 0
  animation: fadeUp 1s ease forwards 2s

  span
    font-family: 'Cormorant Garamond', serif
    font-weight: 300
    font-size: 11px
    letter-spacing: 0.3em
    color: #A0896A
    text-transform: uppercase

    &:nth-child(even)
      color: #C9A55A
      font-size: 8px

// Scroll hint (solo mobile)
.scroll-hint
  display: none
  position: absolute
  bottom: 28px
  left: 50%
  transform: translateX(-50%)
  z-index: 10
  opacity: 0
  animation: fadeUp 1s ease forwards 2.3s

.scroll-arrow
  width: 20px
  height: 20px
  border-right: 1px solid #B8985A
  border-bottom: 1px solid #B8985A
  transform: rotate(45deg)
  animation: scrollBounce 1.8s ease-in-out infinite

.footer-text
  position: absolute
  bottom: 32px
  left: 50%
  transform: translateX(-50%)
  font-family: 'Cormorant Garamond', serif
  font-size: 9.5px
  letter-spacing: 0.45em
  color: #A0896A
  text-transform: uppercase
  white-space: nowrap
  opacity: 0
  animation: fadeUp 1s ease forwards 2.1s
  z-index: 10

// ── Keyframes ─────────────────────────────────────────────────────────────────
@keyframes spin
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

@keyframes dotPulse
  0%, 100%
    transform: translateX(-50%) scale(1)
    box-shadow: 0 0 8px 2px rgba(201,165,90,0.5)
  50%
    transform: translateX(-50%) scale(1.6)
    box-shadow: 0 0 16px 5px rgba(201,165,90,0.9)

@keyframes fadeUp
  from
    opacity: 0
    transform: translateY(26px)
  to
    opacity: 1
    transform: translateY(0)

@keyframes goldShimmer
  from
    background-position: -250% center
  to
    background-position: 250% center

@keyframes diamondPulse
  0%, 100%
    transform: rotate(45deg) scale(1)
  50%
    transform: rotate(45deg) scale(1.6)
    box-shadow: 0 0 14px 5px rgba(184,152,90,0.6)

@keyframes floatUp
  0%
    opacity: 0
    transform: translateY(0) rotate(0deg)
  8%
    opacity: 0.8
  92%
    opacity: 0.5
  100%
    opacity: 0
    transform: translateY(-100vh) rotate(720deg)

@keyframes scrollBounce
  0%, 100%
    transform: rotate(45deg) translateY(0)
    opacity: 0.4
  50%
    transform: rotate(45deg) translateY(5px)
    opacity: 1

// ── Mobile ────────────────────────────────────────────────────────────────────
@media (max-width: 768px)

  .scene
    // Centrado vertical más alto en móvil para dejar espacio al scroll hint
    align-items: center
    padding-top: 12vh

  .side-orn
    display: none

  // Esquinas más pequeñas en móvil
  .corner
    width: 44px
    height: 44px
    opacity: 0.45

    &.tl
      top: 16px
      left: 16px

    &.tr
      top: 16px
      right: 16px

    &.bl
      bottom: 16px
      left: 16px

    &.br
      bottom: 16px
      right: 16px

  // Anillos ajustados al viewport móvil
  .ring.ring-1
    width: 280px
    height: 280px

  .ring.ring-2
    width: 380px
    height: 380px

  .ring.ring-3
    width: 500px
    height: 500px

  // Texto principal más compacto
  .eyebrow
    font-size: 9px
    letter-spacing: 0.35em
    margin-bottom: 14px

  .title
    font-size: clamp(38px, 11vw, 58px)
    letter-spacing: 0.05em

  .divider
    margin: 16px 0

  .divider-line
    width: 44px

  .tagline
    font-size: clamp(13px, 3.5vw, 17px)
    letter-spacing: 0.2em
    margin-bottom: 32px

  .cta
    padding: 15px 36px
    font-size: 11px
    letter-spacing: 0.35em
    // Área táctil cómoda
    min-height: 50px
    min-width: 200px

  // Mostrar categorías rápidas en móvil
  .mobile-cats
    display: flex

  // Mostrar scroll hint en móvil, ocultar footer-text
  .scroll-hint
    display: block

  .footer-text
    display: none
</style>