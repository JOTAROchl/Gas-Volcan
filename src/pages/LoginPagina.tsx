import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUsuariosDemo, setUsuarioActual } from './authDemo'

function LoginPagina() {
  const [mensaje, setMensaje] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    const password = String(data.get('password') ?? '')
    if (!email || email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMensaje('Ingresa un correo válido de máximo 100 caracteres.')
      return
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setMensaje('La contraseña debe tener al menos una letra y un número.')
      return
    }

    const usuario = getUsuariosDemo().find(
      (item) => item.email === email && item.password === password,
    )
    if (!usuario) {
      setMensaje('El correo o la contraseña no coinciden con una cuenta de la demo.')
      return
    }

    setUsuarioActual(usuario)
    navigate(usuario.rol === 'Administrador' ? '/admin' : '/')
  }

  return (
    <section className="login-page">
      <div className="card login-card">
        <div className="card-body p-4 p-md-5">
          <img
            className="login-logo"
            src="/images/logoMasNombreGEV.jpg"
            alt="Gas El Volcán"
          />
          <p className="eyebrow">Gas El Volcán</p>
          <h1 className="h2 mb-2">Iniciar sesión</h1>
          <p className="text-secondary mb-4">
            Ingresa tus datos para continuar.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="login-email">
                Correo electrónico
              </label>
              <input
                className="form-control"
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="login-password">
                Contraseña
              </label>
              <input
                className="form-control"
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <button             className="button button-primary w-100" type="submit">
              Iniciar sesión
            </button>
          </form>
          {mensaje && (
            <p className="form-message error" role="status">
              {mensaje}
            </p>
          )}
          <p className="demo-notice">
            Cuenta de demostración: admin@gasvolcan.cl / Admin1234.
            No uses contraseñas reales en esta versión académica.
          </p>
          <p>
            ¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoginPagina
