import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import type { Producto } from './catalogoProductos'

interface DetalleProductosProps {
  productos: Producto[]
  agregarProducto: (producto: Producto) => void
}

function DetalleProductos({
  productos,
  agregarProducto,
}: DetalleProductosProps) {
  const { id } = useParams()
  const [mensaje, setMensaje] = useState('')
  const producto = productos.find((item) => item.codigo === id)

  if (!producto) {
    return (
      <section className="py-5">
        <h1>Formato no encontrado</h1>
        <p>El formato que buscas no está en este catálogo.</p>
        <Link className="btn btn-volcan" to="/productos">
          Ver catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="row align-items-center g-4 gas-product-detail">
      <div className="col-md-6">
        <div className="gas-detail-art">
          <img className="detail-image" src={producto.imagen} alt={producto.nombre} />
        </div>
      </div>
      <div className="col-md-6">
        <span className="tag">{producto.categoria}</span>
        <h1>{producto.nombre}</h1>
        <p className="price">
          ${producto.precioResidencial.toLocaleString('es-CL')}
        </p>
        <p>{producto.descripcion}</p>
        <div className="detail-actions">
          <button
            className="button button-primary"
            onClick={() => {
              agregarProducto(producto)
              setMensaje('Producto agregado a tu selección.')
            }}
            type="button"
          >
            Agregar a mi selección
          </button>
          <Link className="text-link" to="/seleccion">
            Ir a mi selección
          </Link>
        </div>
        <p className="form-message success" aria-live="polite">{mensaje}</p>
      </div>
    </section>
  )
}

export default DetalleProductos
