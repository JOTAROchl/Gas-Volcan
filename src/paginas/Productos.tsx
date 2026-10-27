import CardProducto from '../componentes/moleculas/CardProducto'
import type { Producto } from './catalogoProductos'

function Productos({ productos }: { productos: Producto[] }) {
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
      <section className="product-grid section-block" id="catalog-list">
        {productos.map((producto) => (
          <CardProducto producto={producto} key={producto.codigo} />
        ))}
      </section>
    </>
  )
}

export default Productos
