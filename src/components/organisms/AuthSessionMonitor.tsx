import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AUTH_SESSION_CHANGED_EVENT,
  AUTH_SESSION_EXPIRED_EVENT,
  expirarAccessToken,
  obtenerAccessToken,
  obtenerExpiracionAccessToken,
} from '../../data/apiClient'

const MENSAJE_SESION_EXPIRADA =
  'Tu sesión expiró o dejó de ser válida. Inicia sesión nuevamente.'

function AuthSessionMonitor() {
  const navigate = useNavigate()

  useEffect(() => {
    let timer: number | undefined

    function cancelarTemporizador() {
      if (timer !== undefined) {
        window.clearTimeout(timer)
        timer = undefined
      }
    }

    function irAlLogin() {
      cancelarTemporizador()
      navigate('/login', {
        replace: true,
        state: { mensaje: MENSAJE_SESION_EXPIRADA },
      })
    }

    function programarExpiracion() {
      cancelarTemporizador()
      if (!obtenerAccessToken()) return

      const expiration = obtenerExpiracionAccessToken()
      if (expiration === null) {
        expirarAccessToken()
        return
      }

      const remaining = expiration - Date.now()
      if (remaining <= 0) {
        expirarAccessToken()
        return
      }

      timer = window.setTimeout(expirarAccessToken, remaining)
    }

    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, programarExpiracion)
    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, irAlLogin)
    programarExpiracion()

    return () => {
      cancelarTemporizador()
      window.removeEventListener(
        AUTH_SESSION_CHANGED_EVENT,
        programarExpiracion,
      )
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, irAlLogin)
    }
  }, [navigate])

  return null
}

export default AuthSessionMonitor
