import { setUsuarioActual } from '../pages/authDemo'
import {
  apiRequest,
  eliminarAccessToken,
  guardarAccessToken,
  obtenerAccessToken,
} from './apiClient'

export interface UsuarioApi {
  id: number
  run: string
  nombre: string
  apellidos: string
  email: string
  rol: 'CLIENTE' | 'ADMINISTRADOR'
  region: string
  comuna: string
  direccion: string
}

export interface AuthResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  usuario: UsuarioApi
}

export interface RegistroRequest {
  run: string
  nombre: string
  apellidos: string
  email: string
  password: string
  region: string
  comuna: string
  direccion: string
}

interface LoginRequest {
  email: string
  password: string
}

function esObjeto(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function leerAuthResponse(value: unknown): AuthResponse {
  if (!esObjeto(value) || !esObjeto(value.usuario)) {
    throw new Error('La API devolvió una respuesta de autenticación inválida.')
  }

  const usuario = value.usuario
  if (
    typeof value.accessToken !== 'string' ||
    typeof value.tokenType !== 'string' ||
    typeof value.expiresIn !== 'number' ||
    typeof usuario.id !== 'number' ||
    typeof usuario.run !== 'string' ||
    typeof usuario.nombre !== 'string' ||
    typeof usuario.apellidos !== 'string' ||
    typeof usuario.email !== 'string' ||
    (usuario.rol !== 'CLIENTE' && usuario.rol !== 'ADMINISTRADOR') ||
    typeof usuario.region !== 'string' ||
    typeof usuario.comuna !== 'string' ||
    typeof usuario.direccion !== 'string'
  ) {
    throw new Error('La API devolvió una respuesta de autenticación inválida.')
  }

  return {
    accessToken: value.accessToken,
    tokenType: value.tokenType,
    expiresIn: value.expiresIn,
    usuario: {
      id: usuario.id,
      run: usuario.run,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      email: usuario.email,
      rol: usuario.rol,
      region: usuario.region,
      comuna: usuario.comuna,
      direccion: usuario.direccion,
    },
  }
}

async function postAuth<T>(endpoint: string, request: T): Promise<AuthResponse> {
  const body = await apiRequest(endpoint, { method: 'POST', body: request })
  return leerAuthResponse(body)
}

export function registrarUsuario(request: RegistroRequest) {
  return postAuth('/auth/registro', request)
}

export function iniciarSesion(request: LoginRequest) {
  return postAuth('/auth/login', request)
}

export function guardarSesion(response: AuthResponse) {
  const { usuario } = response
  setUsuarioActual({
    run: usuario.run,
    nombre: usuario.nombre,
    apellidos: usuario.apellidos,
    email: usuario.email,
    rol: usuario.rol === 'ADMINISTRADOR' ? 'Administrador' : 'Cliente',
    region: usuario.region,
    comuna: usuario.comuna,
    direccion: usuario.direccion,
  })
  guardarAccessToken(response.accessToken, response.expiresIn)
}

export function obtenerToken() {
  return obtenerAccessToken()
}

export function cerrarSesion() {
  eliminarAccessToken()
}
