import { useState } from 'react'
import CardProducto from '../components/molecules/CardProducto'
import type { Producto } from './catalogoProductos'
import { buscarProductos } from '../data/productosService'

function Productos({ productos }: { productos: Producto[] }) {
  const [consulta, setConsulta] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const productosFiltrados = buscarProductos(productos, busqueda)

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
        <form
          className="catalog-search-form"
          onSubmit={(event) => {
            event.preventDefault()
            setBusqueda(consulta)
          }}
        >
          <label htmlFor="catalog-search">Buscar por producto o categoría</label>
          <div className="catalog-search-controls">
            <input
              id="catalog-search"
              onChange={(event) => setConsulta(event.target.value)}
              placeholder="Ej.: cilindro, regulador..."
              type="search"
              value={consulta}
            />
            <button className="button button-primary" type="submit">
              Buscar
            </button>
          </div>
        </form>
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
