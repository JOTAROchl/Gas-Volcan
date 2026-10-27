import { Link } from 'react-router-dom'
import type { Producto } from '../../paginas/catalogoProductos'

interface CardProductoProps {
  producto: Producto
}

function CardProducto({ producto }: CardProductoProps) {
  return (
    <article className="product-card">
      <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      <div className="card-body">
        <span className="tag">{producto.categoria}</span>
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion.split('. ')[0].replace(/[.]$/, '')}.</p>
        <p className="price">{dinero(producto.precioResidencial)}</p>
        <Link
          className="button button-secondary"
          to={`/productos/${producto.codigo}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

function dinero(valor: number) {
  return `$${valor.toLocaleString('es-CL')}`
}

export default CardProducto
