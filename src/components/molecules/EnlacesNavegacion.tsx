import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AUTH_SESSION_CHANGED_EVENT } from '../../data/apiClient'
import { cerrarSesion } from '../../data/authService'
import { getUsuarioActual } from '../../pages/authDemo'

function EnlacesNavegacion() {
  const [usuarioActual, setUsuarioActual] = useState(getUsuarioActual)
  const navigate = useNavigate()

  useEffect(() => {
    function actualizarUsuario() {
      setUsuarioActual(getUsuarioActual())
    }

    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, actualizarUsuario)
    actualizarUsuario()
    return () =>
      window.removeEventListener(
        AUTH_SESSION_CHANGED_EVENT,
        actualizarUsuario,
      )
  }, [])

  return (
    <div className="nav-links ms-auto">
      <NavLink className="nav-link" to="/">Inicio</NavLink>
      <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
      <NavLink className="nav-link" to="/catalogo">Catálogo</NavLink>
      <NavLink className="nav-link" to="/novedades">Novedades</NavLink>
      <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
      {usuarioActual?.rol === 'Administrador' && (
        <NavLink className="nav-link" to="/admin">
          Panel administrador
        </NavLink>
      )}
      {usuarioActual ? (
        <button
          className="nav-link nav-logout"
          onClick={() => {
            cerrarSesion()
            navigate('/', { replace: true })
          }}
          type="button"
        >
          Cerrar sesión
        </button>
      ) : (
        <NavLink className="nav-link nav-admin" to="/login">Acceso</NavLink>
      )}
    </div>
  )
}

export default EnlacesNavegacion
