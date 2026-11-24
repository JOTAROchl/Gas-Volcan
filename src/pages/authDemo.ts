export type RolUsuario = 'Cliente' | 'Administrador'

export interface UsuarioActual {
  run: string
  nombre: string
  apellidos: string
  email: string
  rol: RolUsuario
  region?: string
  comuna?: string
  direccion?: string
}

export const regionesComunas: Record<string, string[]> = {
  'Región Metropolitana': ['Santiago', 'Maipú', 'Puente Alto', 'Quilicura'],
  Valparaíso: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
  Biobío: ['Concepción', 'Talcahuano', 'Los Ángeles', 'Chiguayante'],
  'La Araucanía': ['Temuco', 'Padre Las Casas', 'Villarrica'],
}

const CURRENT_USER_KEY = 'gasVolcanCurrentUser'

export function setUsuarioActual(usuario: UsuarioActual | null) {
  if (!usuario) {
    sessionStorage.removeItem(CURRENT_USER_KEY)
    return
  }
  sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(usuario))
}

export function getUsuarioActual(): UsuarioActual | null {
  const saved = sessionStorage.getItem(CURRENT_USER_KEY)
  if (!saved) return null

  try {
    const parsed: unknown = JSON.parse(saved)
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'email' in parsed &&
      'rol' in parsed &&
      typeof parsed.email === 'string' &&
      (parsed.rol === 'Cliente' || parsed.rol === 'Administrador')
    ) {
      return parsed as UsuarioActual
    }
    throw new TypeError('La sesión guardada no tiene el formato esperado.')
  } catch (error) {
    console.error('No se pudo leer la sesión guardada.', error)
    sessionStorage.removeItem(CURRENT_USER_KEY)
    return null
  }
}

export function validarRun(run: string) {
  const clean = run.replace(/[.-]/g, '').toUpperCase()
  if (!/^\d{7,8}[0-9K]$/.test(clean)) return false

  const body = clean.slice(0, -1)
  const verifier = clean.slice(-1)
  let sum = 0
  let multiplier = 2
  for (let index = body.length - 1; index >= 0; index -= 1) {
    sum += Number(body[index]) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }
  const result = 11 - (sum % 11)
  const expected = result === 11 ? '0' : result === 10 ? 'K' : String(result)
  return verifier === expected
}

export function validarNombre(value: string) {
  return (
    value.trim().length >= 3 &&
    value.trim().length <= 300 &&
    /^[\p{L}\s'-]+$/u.test(value.trim())
  )
}
