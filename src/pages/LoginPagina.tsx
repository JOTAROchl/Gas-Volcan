import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { guardarSesion, iniciarSesion } from '../data/authService'

function LoginPagina() {
  const location = useLocation()
  const [mensaje, setMensaje] = useState(() => {
    const state: unknown = location.state
    return typeof state === 'object' &&
      state !== null &&
      'mensaje' in state &&
      typeof state.mensaje === 'string'
      ? state.mensaje
      : ''
  })
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') ?? '').trim()
    const password = String(data.get('password') ?? '')
    if (!email || email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMensaje('Ingresa un correo válido de máximo 100 caracteres.')
      return
    }
    if (!password || password.length > 72) {
      setMensaje('Ingresa tu contraseña (máximo 72 caracteres).')
      return
    }

    setMensaje('')
    setEnviando(true)
    try {
      const response = await iniciarSesion({ email, password })
      guardarSesion(response)
      navigate(response.usuario.rol === 'ADMINISTRADOR' ? '/admin' : '/')
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : 'No se pudo iniciar sesión. Intenta nuevamente.',
      )
    } finally {
      setEnviando(false)
    }
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
            <button
              className="button button-primary w-100"
              disabled={enviando}
              type="submit"
            >
              {enviando ? 'Ingresando…' : 'Iniciar sesión'}
            </button>
          </form>
          {mensaje && (
            <p className="form-message error" role="alert">
              {mensaje}
            </p>
          )}
          <p>
            ¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default LoginPagina
