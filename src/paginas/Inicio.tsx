import { Link } from 'react-router-dom'
import CardProducto from '../componentes/moleculas/CardProducto'
import CarruselPortada from '../componentes/estructura/CarruselPortada'
import type { Producto } from './catalogoProductos'

function Inicio({ productos }: { productos: Producto[] }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Energía para tu hogar</p>
          <h1>Gas confiable, entregado a tu puerta.</h1>
          <p>
            En Gas El Volcán hacemos que pedir tu cilindro sea simple, rápido y
            seguro, con atención cercana para cada familia.
          </p>
          <div className="button-row">
            <Link className="button button-primary" to="/catalogo">
              Ver catálogo
            </Link>
            <Link className="button button-secondary" to="/contacto">
              Hablar con nosotros
            </Link>
          </div>
        </div>
        <CarruselPortada />
      </section>

      <section className="feature-band" aria-labelledby="benefits-title">
        <p className="eyebrow">Lo que nos mueve</p>
        <h2 id="benefits-title">Servicio pensado para tu día a día</h2>
        <div className="benefit-grid">
          <article>
            <strong>01</strong>
            <h3>Rápido</h3>
            <p>Coordinamos tu despacho para que no tengas que detener tu rutina.</p>
          </article>
          <article>
            <strong>02</strong>
            <h3>Seguro</h3>
            <p>Trabajamos con productos y procesos confiables para tu hogar.</p>
          </article>
          <article>
            <strong>03</strong>
            <h3>Cercano</h3>
            <p>Respondemos tus preguntas con atención clara y humana.</p>
          </article>
        </div>
      </section>

      <section className="section-block" aria-labelledby="featured-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Para comenzar</p>
            <h2 id="featured-title">Productos destacados</h2>
          </div>
          <Link className="text-link" to="/catalogo">
            Ver todo el catálogo &gt;&gt;
          </Link>
        </div>
        <div className="product-grid">
          {productos.slice(0, 3).map((producto) => (
            <CardProducto key={producto.codigo} producto={producto} />
          ))}
        </div>
      </section>

      <section className="news-strip">
        <div>
          <p className="eyebrow">Consejos para tu hogar</p>
          <h2>Novedades y recomendaciones</h2>
        </div>
        <Link className="button button-secondary" to="/novedades">
          Leer novedades
        </Link>
      </section>

    </>
  )
}

export default Inicio
