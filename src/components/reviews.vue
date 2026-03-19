<template>
  <section class="reviews">
    <div class="reviews__header">
      <div class="reviews__title-block">
        <h2 class="reviews__title">Lo que dicen nuestros clientes</h2>
        <span class="reviews__source">Reseñas de Google</span>
      </div>

      <div class="reviews__summary">
        <span class="reviews__score">5.0</span>

        <div class="reviews__summary-right">
          <div class="reviews__stars">
            <span
              v-for="i in 5"
              :key="i"
              class="reviews__star"
              :class="{ 'reviews__star--filled': i <= Math.round(5.0) }"
            >★</span>
          </div>

          <span class="reviews__total">Basado en 21 reseñas</span>
        </div>
      </div>
    </div>

    <div class="reviews__divider"></div>

    <div class="reviews__grid">
      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="review-card"
      >
        <div class="review-card__reviewer">
          <div
            class="review-card__avatar"
            :class="`review-card__avatar--${index % 3}`"
          >
            {{
              review.name
                .split(' ')
                .slice(0, 2)
                .map(n => n[0])
                .join('')
                .toUpperCase()
            }}
          </div>

          <div class="review-card__info">
            <p class="review-card__name">{{ review.name }}</p>
            <p v-if="review.isLocalGuide" class="review-card__badge">
              Local Guide
            </p>
          </div>
        </div>

        <div class="review-card__stars">
          <span v-for="i in 5" :key="i" class="review-card__star">★</span>
        </div>

        <p class="review-card__text">{{ review.text }}</p>
      </div>
    </div>

    <div class="reviews__footer">
      <a
        href="https://www.google.com/search?num=10&hl=es-ES&sca_esv=f818ef0c6d37c692&cs=1&output=search&tbm=lcl&kgmid=%2Fg%2F1tjh0p_h&q=Joyer%C3%ADa%20Merc%C3%A9&shem=dlvsc%2Cepsd1&shndl=30&source=sh%2Fx%2Floc%2Funi%2Fm1%2F1&kgs=9551e7e67e5d2831"
        target="_blank"
        rel="noopener noreferrer"
        class="reviews__cta"
      >
        Ver todas las reseñas en Google →
      </a>
    </div>
  </section>
</template>

<script setup>
const reviews = [
  {
    name: 'Paqui Montoro',
    isLocalGuide: false,
    text: 'Muy amables y profesionales, muy buena atención y consejo. Buenos precios. Mi joyería de referencia.'
  },
  {
    name: 'Mari Tuñez Saez',
    isLocalGuide: true,
    text: 'Joyería de toda la vida, muy agradables y sobre todo de mucha confianza. Yo no compro en otra.'
  },
  {
    name: 'Carolina Velasco',
    isLocalGuide: true,
    text: 'Super bien, la chica muy atenta y resuelve todas tus dudas y te aconseja en todo...'
  }
]
</script>

<style lang="sass">
.reviews
    padding: 2rem 8rem

    @media (max-width: 768px)
        padding: 2rem 1rem
    

.reviews__header
    display: flex
    align-items: center
    justify-content: space-between
    flex-wrap: wrap
    gap: 12px
    margin-bottom: 1.5rem

.reviews__title
    font-size: 1.125rem
    font-weight: 500
    margin: 0 0 2px
    color: #1a1a1a

.reviews__source
    font-size: 0.8125rem
    font-weight: 500
    color: #888
    letter-spacing: 0.5px

.reviews__summary
    display: flex
    align-items: center
    gap: 10px

.reviews__score
    font-size: 2.25rem
    font-weight: 500
    color: #1a1a1a
    line-height: 1

.reviews__summary-right
    display: flex
    flex-direction: column
    gap: 2px

.reviews__stars
    display: flex
    gap: 2px

.reviews__star
    font-size: 1.125rem
    color: #ccc

.reviews__star--filled
    color: #FBBC04

.reviews__total
    font-size: 0.8125rem
    color: #888

.reviews__divider
    height: 0.5px
    background: rgba(0, 0, 0, 0.1)
    margin-bottom: 1.5rem

.reviews__grid
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))
    gap: 12px
    margin-bottom: 1.5rem

.reviews__footer
    text-align: center

.reviews__cta
    display: inline-block
    padding: 8px 20px
    border: 0.5px solid rgba(0, 0, 0, 0.2)
    border-radius: 8px
    font-size: 0.8125rem
    color: #666
    text-decoration: none
    transition: background 0.2s ease, color 0.2s ease

.reviews__cta:hover
    background: rgba(0, 0, 0, 0.04)
    color: #333

.review-card
    background: #fff
    border: 0.5px solid rgba(0, 0, 0, 0.1)
    border-radius: 12px
    padding: 1rem 1.1rem

.review-card__reviewer
    display: flex
    align-items: center
    gap: 8px
    margin-bottom: 8px

.review-card__avatar
    width: 34px
    height: 34px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    font-size: 0.8125rem
    font-weight: 500
    flex-shrink: 0

.review-card__avatar--0
    background: #E6F1FB
    color: #0C447C

.review-card__avatar--1
    background: #EAF3DE
    color: #27500A

.review-card__avatar--2
    background: #FBEAF0
    color: #72243E

.review-card__info
    display: flex
    flex-direction: column
    gap: 1px

.review-card__name
    font-size: 0.8125rem
    font-weight: 500
    color: #1a1a1a
    margin: 0

.review-card__badge
    font-size: 0.6875rem
    color: #aaa
    margin: 0

.review-card__stars
    display: flex
    gap: 1px
    margin-bottom: 6px

.review-card__star
    font-size: 0.8125rem
    color: #FBBC04

.review-card__text
    font-size: 0.8125rem
    color: #555
    line-height: 1.5
    margin: 0
</style>