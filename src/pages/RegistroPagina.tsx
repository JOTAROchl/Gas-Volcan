import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { registrarUsuario } from '../data/authService'
import {
  regionesComunas,
  validarNombre,
  validarRun,
} from './authDemo'

function RegistroPagina() {
  const [region, setRegion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [correcto, setCorrecto] = useState(false)
  const [enviando, setEnviando] = useState(false)

  async function registrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setMensaje('')
    setCorrecto(false)
    const data = new FormData(form)
    const run = String(data.get('run') ?? '').trim().replace(/[.-]/g, '').toUpperCase()
    const nombre = String(data.get('name') ?? '').trim()
    const apellidos = String(data.get('lastname') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const comuna = String(data.get('commune') ?? '')
    const direccion = String(data.get('address') ?? '').trim()
    const password = String(data.get('password') ?? '')

    if (!validarRun(run)) {
      setMensaje('Ingresa un RUN válido, sin puntos ni guion.')
      return
    }
    if (!validarNombre(nombre) || !validarNombre(apellidos)) {
      setMensaje('El nombre y los apellidos deben tener entre 3 y 300 caracteres.')
      return
    }
    if (email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMensaje('Ingresa un correo válido de máximo 100 caracteres.')
      return
    }
    if (!region || !comuna) {
      setMensaje('Selecciona una región y una comuna.')
      return
    }
    if (!direccion || direccion.length > 300) {
      setMensaje('La dirección es obligatoria y debe tener máximo 300 caracteres.')
      return
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setMensaje('La contraseña debe tener al menos 8 caracteres, una letra y un número.')
      return
    }

    setEnviando(true)
    try {
      await registrarUsuario({
        run,
        nombre,
        apellidos,
        email,
        password,
        region,
        comuna,
        direccion,
      })
      form.reset()
      setRegion('')
      setCorrecto(true)
      setMensaje('Cuenta creada correctamente. Ya puedes iniciar sesión.')
    } catch (error) {
      setMensaje(
        error instanceof Error
          ? error.message
          : 'No se pudo crear la cuenta. Intenta nuevamente.',
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Registro de usuario</p>
        <h1>Crea tu cuenta.</h1>
        <p>Completa tus datos para recibir una atención más rápida.</p>
      </section>
      <form className="form-card registration-form" onSubmit={registrar}>
        <div className="form-row">
          <div>
            <label htmlFor="run">RUN *</label>
            <input id="run" name="run" placeholder="12345678K" required />
          </div>
          <div>
            <label htmlFor="user-type">Tipo de usuario</label>
            <input id="user-type" value="Cliente" readOnly />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="name">Nombre *</label>
            <input id="name" name="name" maxLength={300} required />
          </div>
          <div>
            <label htmlFor="lastname">Apellidos *</label>
            <input id="lastname" name="lastname" maxLength={300} required />
          </div>
        </div>
        <label htmlFor="email">Correo electrónico *</label>
        <input id="email" name="email" type="email" maxLength={100} required />
        <label htmlFor="password">Contraseña *</label>
        <input
          id="password"
          name="password"
          type="password"
          minLength={8}
          maxLength={72}
          required
        />
        <div className="form-row">
          <div>
            <label htmlFor="region">Región *</label>
            <select
              id="region"
              name="region"
              onChange={(event) => setRegion(event.target.value)}
              required
              value={region}
            >
              <option value="">Selecciona una región</option>
              {Object.keys(regionesComunas).map((nombreRegion) => (
                <option key={nombreRegion} value={nombreRegion}>
                  {nombreRegion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="commune">Comuna *</label>
            <select id="commune" name="commune" required>
              <option value="">Selecciona una comuna</option>
              {(regionesComunas[region] ?? []).map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label htmlFor="address">Dirección *</label>
        <input id="address" name="address" maxLength={300} required />
        <button className="button button-primary" disabled={enviando} type="submit">
          {enviando ? 'Enviando…' : 'Registrar usuario'}
        </button>
        <p className={`form-message ${correcto ? 'success' : 'error'}`} aria-live="polite">
          {mensaje}
        </p>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </>
  )
}

export default RegistroPagina
