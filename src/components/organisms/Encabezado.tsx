import EnlacesNavegacion from '../molecules/EnlacesNavegacion'
import { Link } from 'react-router-dom'

function Encabezado({ cantidadSeleccion }: { cantidadSeleccion: number }) {
  return (
    <header className="site-header">
      <nav
        className="navbar navbar-expand-lg container"
        aria-label="Navegación principal"
      >
        <Link className="brand" to="/" aria-label="Gas El Volcán, inicio">
          <img
            src="/images/logoMasNombreGEV.jpg"
            alt="Gas El Volcán"
            width="165"
            height="68"
          />
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navigation"
          aria-controls="main-navigation"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="main-navigation">
          <EnlacesNavegacion />
          <div className="nav-utilities">
            <Link className="selection-link" to="/seleccion">
              Mi selección <span id="selection-count">{cantidadSeleccion}</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Encabezado
