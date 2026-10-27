import { useState, type FormEvent } from 'react'

function Contacto() {
  const [mensaje, setMensaje] = useState('')

  function enviarConsulta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nombre = String(formData.get('name') ?? '').trim()
    const correo = String(formData.get('email') ?? '').trim()
    const comentario = String(formData.get('comment') ?? '').trim()

    if (nombre.length < 3 || nombre.length > 300) {
      setMensaje('El nombre debe tener entre 3 y 300 caracteres.')
      return
    }
    if (correo.length > 100) {
      setMensaje('El correo no puede superar los 100 caracteres.')
      return
    }
    if (!comentario || comentario.length > 500) {
      setMensaje('El mensaje es obligatorio y debe tener máximo 500 caracteres.')
      return
    }

    event.currentTarget.reset()
    setMensaje(
      'Consulta validada en esta demostración. No se envió a un servidor.',
    )
  }

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Contacto</p>
        <h1>Estamos para ayudarte.</h1>
        <p>
          Déjanos tu consulta y te responderemos con información sobre formatos,
          despacho y cobertura.
        </p>
      </section>
      <section className="content-grid">
        <form className="form-card" onSubmit={enviarConsulta}>
          <label htmlFor="contact-name">Nombre *</label>
          <input id="contact-name" name="name" maxLength={300} required />
          <label htmlFor="contact-email">Correo electrónico *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            maxLength={100}
            required
          />
          <label htmlFor="contact-comment">Comentario o mensaje *</label>
          <textarea
            id="contact-comment"
            name="comment"
            maxLength={500}
            required
          />
          <button className="button button-primary" type="submit">
            Enviar consulta
          </button>
          <p
            className={`form-message ${mensaje.startsWith('Consulta validada') ? 'success' : 'error'}`}
            aria-live="polite"
          >
            {mensaje}
          </p>
        </form>
        <aside className="form-card">
          <p className="eyebrow">Atención</p>
          <h2>Una respuesta clara, sin vueltas.</h2>
          <p>
            Cuéntanos qué necesitas y nuestro equipo te orientará sobre el
            producto más adecuado.
          </p>
          <p>
            <strong>Retiro en local:</strong> lunes a sábado, 09:00 a 19:00.
          </p>
          <p>
            <strong>Entrega a domicilio:</strong> lunes a sábado, 09:00 a 19:00;
            domingos y festivos, 10:00 a 16:00.
          </p>
          <p>
            <strong>Teléfono:</strong>{' '}
            <a href="tel:+56912345678">+56912345678</a>
          </p>
          <p className="demo-notice">
            El formulario es demostrativo y no envía mensajes fuera de este
            navegador.
          </p>
        </aside>
      </section>
    </>
  )
}

export default Contacto
