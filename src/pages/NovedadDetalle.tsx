import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import novedades from './datosNovedades'

function NovedadDetalle() {
  const { id } = useParams()
  const novedad = novedades.find((item) => item.id === Number(id))
  const [regalo, setRegalo] = useState('')
  const [mensaje, setMensaje] = useState('')

  if (!novedad) {
    return (
      <section className="page-heading">
        <h1>No encontramos esta novedad.</h1>
        <Link className="text-link" to="/novedades">
          Volver a novedades
        </Link>
      </section>
    )
  }

  return (
    <article className="article-page">
      <Link className="text-link" to="/novedades">
        &lt;&lt; Volver a novedades
      </Link>
      <section className="page-heading">
        <p className="eyebrow">Novedades</p>
        <h1>{novedad.titulo}</h1>
        <p>{novedad.resumen}</p>
      </section>
      <img className="detail-image" src={novedad.imagen} alt="" />
      <p className="article-copy">{novedad.detalle}</p>
      {novedad.regalos && (
        <section className="gift-promotion">
          <h2>Elige tu regalo</h2>
          <p>Selecciona tu preferencia para tenerla en cuenta en tu consulta.</p>
          <div className="gift-options">
            {novedad.regalos.map((item) => (
              <label className="gift-option" key={item.nombre}>
                <img src={item.imagen} alt="" />
                <input
                  checked={regalo === item.nombre}
                  name="gift"
                  onChange={() => {
                    setRegalo(item.nombre)
                    setMensaje('')
                  }}
                  type="radio"
                  value={item.nombre}
                />
                <span>{item.nombre}</span>
              </label>
            ))}
          </div>
          <button
            className="button button-primary"
            onClick={() =>
              setMensaje(
                regalo
                  ? `Preferencia seleccionada: ${regalo}. La promoción se confirma al coordinar la compra; no se envió una solicitud.`
                  : 'Selecciona una de las opciones para continuar.',
              )
            }
            type="button"
          >
            Guardar preferencia
          </button>
          <p className="form-message success" aria-live="polite">
            {mensaje}
          </p>
        </section>
      )}
    </article>
  )
}

export default NovedadDetalle
