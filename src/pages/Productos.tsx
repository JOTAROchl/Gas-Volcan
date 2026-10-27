import { useState } from 'react'
import CardProducto from '../components/molecules/CardProducto'
import type { Producto } from './catalogoProductos'
import { buscarProductos } from '../data/productosService'

function Productos({ productos }: { productos: Producto[] }) {
  const [consulta, setConsulta] = useState('')
  const productosFiltrados = buscarProductos(productos, consulta)

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Catálogo</p>
        <h1>Elige el formato para tu hogar.</h1>
        <p>
          Revisa nuestras opciones y agrega a tu selección los cilindros que
          quieras consultar o reservar preliminarmente.
        </p>
      </section>
      <section className="catalog-search" aria-label="Buscar productos">
        <label htmlFor="catalog-search">Buscar por producto o categoría</label>
        <input
          id="catalog-search"
          onChange={(event) => setConsulta(event.target.value)}
          placeholder="Ej.: cilindro, regulador..."
          type="search"
          value={consulta}
        />
        <p aria-live="polite">
          {productosFiltrados.length}{' '}
          {productosFiltrados.length === 1 ? 'producto encontrado' : 'productos encontrados'}
        </p>
      </section>
      <section className="product-grid section-block" id="catalog-list">
        {productosFiltrados.map((producto) => (
          <CardProducto producto={producto} key={producto.codigo} />
        ))}
        {productosFiltrados.length === 0 && (
          <p className="empty-state">No encontramos productos para esa búsqueda.</p>
        )}
      </section>
    </>
  )
}

export default Productos
