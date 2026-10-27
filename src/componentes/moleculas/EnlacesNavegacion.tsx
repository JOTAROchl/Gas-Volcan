import { NavLink } from 'react-router-dom'

function EnlacesNavegacion() {
  return (
    <div className="nav-links ms-auto">
      <NavLink className="nav-link" to="/">Inicio</NavLink>
      <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
      <NavLink className="nav-link" to="/catalogo">Catálogo</NavLink>
      <NavLink className="nav-link" to="/novedades">Novedades</NavLink>
      <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
      <NavLink className="nav-link nav-admin" to="/login">Acceso</NavLink>
    </div>
  )
}

export default EnlacesNavegacion
