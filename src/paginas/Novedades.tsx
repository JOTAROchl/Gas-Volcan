import { Link } from 'react-router-dom'
import novedades from './datosNovedades'

function Novedades() {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Novedades</p>
        <h1>Ideas y consejos para tu hogar.</h1>
        <p>Información útil para elegir, usar y cuidar tus productos de gas.</p>
      </section>
      <section className="product-grid section-block" aria-label="Artículos">
        {novedades.map((novedad) => (
          <article className="news-card" key={novedad.id}>
            <img src={novedad.imagen} alt="" loading="lazy" />
            <div className="card-body">
              <p className="eyebrow">Consejos Gas El Volcán</p>
              <h2>{novedad.titulo}</h2>
              <p>{novedad.resumen}</p>
              <Link className="text-link" to={`/novedades/${novedad.id}`}>
                Leer más &gt;&gt;
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default Novedades
