const { onRequest } = require("firebase-functions/v2/https")
const { Resend } = require("resend")


// Función para esperar
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

exports.notificar_novedad = onRequest({
  cors: true,
  invoker: "public"
}, async (req, res) => {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { nombre, descripcion, correos, foto } = req.body

    if (!correos || correos.length === 0) {
      return res.json({ ok: false, error: "No hay correos" })
    }

    const enviados = []
    const fallidos = []

    for (const email of correos) {
      try {
        console.log("Enviando a:", email)
        await resend.emails.send({
          from: "Joyería Mercè <novedades@joyeriamerce.es>",
          to: [email],
          subject: "✦ Novedad en Joyería Mercè",
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FDFCF8; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
              <div style="background: #1a1a1a; padding: 1.5rem 2rem; text-align: center;">
                <h1 style="color: #EDE9D8; letter-spacing: 0.3rem; font-size: 1.1rem; margin: 0; font-weight: 400;">✦ JOYERÍA MERCÈ ✦</h1>
              </div>
              ${foto ? `
              <div style="width: 100%; background: #f5f0e8;">
                <img src="${foto}" alt="${nombre}" style="width: 100%; height: 280px; object-fit: cover; display: block;" />
              </div>` : ""}
              <div style="padding: 2rem;">
                <p style="color: #9a8c7e; font-size: 0.85rem; letter-spacing: 0.15rem; text-transform: uppercase; margin: 0 0 0.5rem 0;">Nueva Joya Disponible</p>
                <h2 style="color: #1a1a1a; font-size: 1.6rem; margin: 0 0 1rem 0; font-weight: 600;">${nombre}</h2>
                <p style="color: #7a6e5f; font-size: 1rem; line-height: 1.7; margin: 0 0 1.5rem 0;">${descripcion}</p>
                <a href="https://joyeriamerce.es/catalogo" style="display: inline-block; padding: 14px 32px; background: #1a1a1a; color: #EDE9D8; border-radius: 8px; text-decoration: none; font-size: 0.95rem; letter-spacing: 0.05rem;">
                  Ver en Catálogo →
                </a>
              </div>
              <div style="border-top: 1px solid #e8e0d0; padding: 1.2rem 2rem; text-align: center;">
                <p style="font-size: 0.78rem; color: #b0a898; margin: 0;">Joyería Mercè · Puerto de Sagunto, Valencia</p>
                <p style="font-size: 0.72rem; color: #c8bfb4; margin: 0.3rem 0 0 0;">Recibes este email porque estás suscrito a nuestras novedades</p>
              </div>
            </div>
          `
        })
        enviados.push(email)
        console.log("✓ Enviado a:", email)
      } catch (err) {
        console.error("✗ Error en:", email, err.message)
        fallidos.push({ email, error: err.message })
      }

      // Esperar 600ms entre cada email (bajo el límite de 2/seg)
      await delay(600)
    }

    res.json({ ok: true, enviados, fallidos })

  } catch (e) {
    console.error("ERROR:", e)
    res.status(500).json({ ok: false, error: e.message })
  }
})