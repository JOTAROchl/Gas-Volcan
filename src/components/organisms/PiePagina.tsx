import { Link } from 'react-router-dom'

function PiePagina() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div>
          <h2>Gas El Volcán</h2>
          <p>Energía que acompaña.</p>
        </div>
        <div>
          <p>Atención al cliente</p>
          <Link to="/contacto">Contáctanos</Link>
          <p>
            Teléfono: <a href="tel:+56912345678">+56912345678</a>
          </p>
        </div>
        <p>© 2026 Gas El Volcán</p>
      </div>
    </footer>
  )
}

export default PiePagina
