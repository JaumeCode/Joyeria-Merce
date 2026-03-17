<template>
    <footer id="footer">
        <div class="col logo_col">
            <img src="https://firebasestorage.googleapis.com/v0/b/joyeriamerce-runing.firebasestorage.app/o/assets%2FLogo%20Tienda.png?alt=media&token=bce2532e-a646-4570-92a5-fb00a541fc79" alt="Logo Joyería Mercè">
            <div class="contacto">
                <p><strong>Correo:</strong></p>
                <p>joyeriamerce@gmail.com</p>
            </div>
            <div class="contacto">
                <p><strong>Direccion:</strong></p>
                <p>Carrer del Trovador, 67, 46520</p>
                <p>Puerto de Sagunto, Valencia</p>
            </div>
        </div>

        <div class="col">
            <h4>Nuestra empresa</h4>
            <a href="/aviso_legal">Aviso legal</a>
            <a href="/politicas_privacidad">Politica de Privacidad</a>
            <a href="/politicas">Politica de Cookies</a>
            <a href="/ubicacion">Horarios</a>
            <a href="/ubicacion">Mapa del Sitio</a>
        </div>

        <div class="col">
            <h4>Administradores</h4>
            <a href="/catalogo">Productos</a>
            <a href="/">Principal</a>
            <a href="/admin">Para Administradores</a>
            <div class="redes">
                <a href="https://wa.me/34666238158">
                    <i class="fa-brands fa-square-whatsapp"></i>
                </a>
                <a href="https://www.instagram.com/mercejoyeria/">
                    <i class="fa-brands fa-square-instagram"></i>
                </a>
                <a href="https://www.facebook.com/joyeriamerce/?locale=es_ES">
                    <i class="fa-brands fa-square-facebook"></i>
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup>
</script>

<style lang="sass" scoped>
#footer
    background-color: #EDE9D8
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: flex-start
    padding: 3rem 5rem
    gap: 4rem

    .col
        display: flex
        flex-direction: column
        gap: 1rem

        h4
            font-size: 1rem
            letter-spacing: 0.2rem
            color: #1a1a1a
            margin-bottom: 0.5rem

        a
            font-size: 0.9rem
            color: #444
            text-decoration: none
            letter-spacing: 0.05rem
            transition: color 0.2s

            &:hover
                color: #1a1a1a

        p
            font-size: 0.9rem
            color: #444
            margin: 0
            line-height: 1.5

        strong
            color: #1a1a1a

    .logo_col
        padding: 0
        img
            width: 120px
            

    .contacto
        display: flex
        flex-direction: column
        gap: 0.2rem

    .redes
        display: flex
        flex-direction: row
        gap: 1rem
        margin-top: 1rem

        i
            font-size: 40px

            &:hover
                transform: scale(1.15)

    @media (max-width: 768px)
        flex-direction: column
        padding: 2.5rem 1.5rem
        gap: 2rem
</style>