<template>
    <div class="auth">

        <div class="auth-card">

            <div class="auth-header">
            <h1>Atelier</h1>
            <p>Accede a tu cuenta</p>
            </div>

            <form class="auth-form">

            <label>Correo electrónico</label>
            <input type="email" placeholder="ejemplo@email.com" />

            <label>Contraseña</label>
            <input type="password" placeholder="••••••••" />

            <button type="submit">Iniciar sesión</button>

            <p class="auth-switch">
                ¿No tienes cuenta?
                <a href="#">Crear cuenta</a>
            </p>

            </form>

        </div>

    </div>


</template>

<style lang="sass" scoped>
*
  box-sizing: border-box
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif

body
  margin: 0
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center
  background: linear-gradient(135deg, #f8f6f3, #ece9e4)
  color: #1a1a1a

.auth
  width: 100%
  padding: 20px
  display: flex
  justify-content: center

.auth-card
  width: 100%
  max-width: 420px
  background: rgba(255,255,255,.9)
  backdrop-filter: blur(10px)
  border-radius: 24px
  padding: 40px
  box-shadow: 0 20px 60px rgba(0,0,0,.08)
  display: flex
  flex-direction: column
  gap: 30px

.auth-header
  text-align: center

  h1
    font-size: 32px
    font-weight: 600
    letter-spacing: 2px

  p
    font-size: 14px
    color: #777
    margin-top: 6px

.auth-form
  display: flex
  flex-direction: column
  gap: 16px

  label
    font-size: 13px
    color: #666

  input
    border: none
    background: #f3f1ee
    border-radius: 14px
    padding: 14px
    font-size: 14px
    outline: none
    transition: all .25s ease

    &:focus
      box-shadow: 0 0 0 2px #1a1a1a inset

  button
    margin-top: 10px
    background: linear-gradient(135deg, #1a1a1a, #333)
    color: white
    border: none
    padding: 14px
    border-radius: 999px
    font-size: 14px
    cursor: pointer
    transition: all .3s ease

    &:hover
      transform: translateY(-2px)
      box-shadow: 0 12px 30px rgba(0,0,0,.2)

.auth-switch
  margin-top: 10px
  font-size: 13px
  text-align: center
  color: #777

  a
    color: #1a1a1a
    text-decoration: none
    font-weight: 500
    margin-left: 4px
    transition: opacity .2s ease

    &:hover
      opacity: .6


</style>