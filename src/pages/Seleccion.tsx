import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Producto } from './catalogoProductos'

interface SeleccionProps {
  seleccion: Producto[]
  quitarProducto: (codigo: string) => void
}

function Seleccion({ seleccion, quitarProducto }: SeleccionProps) {
  const [mensaje, setMensaje] = useState('')
  const [correcto, setCorrecto] = useState(false)
  const total = seleccion.reduce(
    (suma, producto) => suma + producto.precioResidencial,
    0,
  )

  function confirmarReserva(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (seleccion.length === 0) return

    const data = new FormData(event.currentTarget)
    const nombre = String(data.get('name') ?? '').trim()
    const telefono = String(data.get('phone') ?? '').trim()
    const direccion = String(data.get('address') ?? '').trim()
    if (nombre.length < 3 || !/^[+0-9\s()-]{8,20}$/.test(telefono) || !direccion) {
      setCorrecto(false)
      setMensaje('Revisa tu nombre, teléfono y dirección antes de continuar.')
      return
    }

    setCorrecto(true)
    setMensaje(
      'Solicitud preparada para revisión en esta demostración. No se guardó ni se envió un pedido real.',
    )
    event.currentTarget.reset()
  }

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Mi selección</p>
        <h1>Revisa lo que necesitas.</h1>
      </section>
      {seleccion.length === 0 ? (
        <section className="form-card empty-state">
          <p>Tu selección está vacía.</p>
          <Link className="button button-primary" to="/catalogo">
            Explorar catálogo
          </Link>
        </section>
      ) : (
        <section className="content-grid selection-page">
          <div className="panel">
            <ul className="selection-list">
              {seleccion.map((producto) => (
                <li key={producto.codigo}>
                  <span>
                    <strong>{producto.nombre}</strong>
                    <small>${producto.precioResidencial.toLocaleString('es-CL')}</small>
                  </span>
                  <button
                    className="button button-danger"
                    onClick={() => quitarProducto(producto.codigo)}
                    type="button"
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
            <p className="price">
              Total referencial: ${total.toLocaleString('es-CL')}
            </p>
            <p className="demo-notice">
              Precio residencial de referencia. La disponibilidad y el valor
              final deben confirmarse con el equipo de atención.
            </p>
          </div>
          <form className="form-card" onSubmit={confirmarReserva}>
            <p className="eyebrow">Solicitud de reserva</p>
            <h2>¿A dónde coordinamos?</h2>
            <label htmlFor="reserve-name">Nombre *</label>
            <input id="reserve-name" name="name" minLength={3} required />
            <label htmlFor="reserve-phone">Teléfono *</label>
            <input
              id="reserve-phone"
              name="phone"
              type="tel"
              placeholder="+56912345678"
              required
            />
            <label htmlFor="reserve-address">Dirección *</label>
            <input id="reserve-address" name="address" required />
            <button className="button button-primary" type="submit">
              Solicitar reserva
            </button>
            <p
              className={`form-message ${correcto ? 'success' : 'error'}`}
              aria-live="polite"
            >
              {mensaje}
            </p>
            <p className="demo-notice">
              Es una solicitud simulada; el sitio no procesa pagos ni pedidos
              reales. No ingreses datos de tarjetas.
            </p>
          </form>
        </section>
      )}
    </>
  )
}

export default Seleccion
