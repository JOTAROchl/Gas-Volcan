import { setUsuarioActual } from '../pages/authDemo'

const ACCESS_TOKEN_KEY = 'gasVolcanAccessToken'
const ACCESS_TOKEN_EXPIRATION_KEY = 'gasVolcanAccessTokenExpiresAt'
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || '/api'

export const AUTH_SESSION_CHANGED_EVENT = 'gasVolcan:session-changed'
export const AUTH_SESSION_EXPIRED_EVENT = 'gasVolcan:session-expired'

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  authenticated?: boolean
}

function esObjeto(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function guardarAccessToken(token: string, expiresIn: number) {
  if (!Number.isFinite(expiresIn) || expiresIn <= 0) {
    throw new Error('La API devolvió una duración de sesión inválida.')
  }
  sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
  sessionStorage.setItem(
    ACCESS_TOKEN_EXPIRATION_KEY,
    String(Date.now() + expiresIn * 1000),
  )
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT))
}

export function obtenerAccessToken() {
  const token = sessionStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) return null

  const expiration = obtenerExpiracionAccessToken()
  if (expiration === null || expiration <= Date.now()) {
    expirarAccessToken()
    return null
  }

  return token
}

export function obtenerExpiracionAccessToken() {
  const storedExpiration = sessionStorage.getItem(ACCESS_TOKEN_EXPIRATION_KEY)
  if (!storedExpiration) return null

  const expiration = Number(storedExpiration)
  return Number.isFinite(expiration) ? expiration : null
}

export function eliminarAccessToken() {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_EXPIRATION_KEY)
  setUsuarioActual(null)
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT))
}

export function expirarAccessToken() {
  eliminarAccessToken()
  window.dispatchEvent(new Event(AUTH_SESSION_EXPIRED_EVENT))
}

export async function apiRequest(
  path: string,
  options: ApiRequestOptions = {},
): Promise<unknown> {
  const { method = 'GET', body, authenticated = false } = options
  const headers = new Headers({ Accept: 'application/json' })

  if (body !== undefined) headers.set('Content-Type', 'application/json')
  if (authenticated) {
    const token = obtenerAccessToken()
    if (!token) {
      throw new Error('Debes iniciar sesión para realizar esta acción.')
    }
    headers.set('Authorization', `Bearer ${token}`)
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
  } catch {
    throw new Error(
      'No fue posible conectar con la API. Comprueba que el backend esté en ejecución.',
    )
  }

  if (authenticated && response.status === 401) {
    expirarAccessToken()
    throw new Error(
      'Tu sesión expiró o dejó de ser válida. Inicia sesión nuevamente.',
    )
  }

  const responseText = await response.text()
  let responseBody: unknown
  if (responseText) {
    try {
      responseBody = JSON.parse(responseText) as unknown
    } catch {
      if (response.ok) {
        throw new Error('La API devolvió una respuesta que no es JSON válido.')
      }
    }
  }

  if (!response.ok) {
    const detail =
      esObjeto(responseBody) && typeof responseBody.detail === 'string'
        ? responseBody.detail
        : `La solicitud falló (HTTP ${response.status}).`
    const validationErrors =
      esObjeto(responseBody) &&
      Array.isArray(responseBody.errores) &&
      responseBody.errores.every((error) => typeof error === 'string')
        ? responseBody.errores.join(' ')
        : ''
    throw new Error(validationErrors ? `${detail} ${validationErrors}` : detail)
  }

  return responseBody
}
