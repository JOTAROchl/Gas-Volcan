import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import productosIniciales from '../pages/catalogoProductos'
import { guardarAccessToken } from '../data/apiClient'
import { getUsuarioActual, setUsuarioActual } from '../pages/authDemo'
import {
  actualizarProducto,
  buscarProductos,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
  type NuevoProducto,
} from '../data/productosService'

const productoNuevo: NuevoProducto = {
  categoria: 'Accesorios',
  nombre: 'Producto de prueba',
  descripcion: 'Producto para comprobar las operaciones del catálogo.',
  unidad: 'Unidad',
  precioResidencial: 5000,
  precioComercial: 4500,
  stock: 12,
  imagen: '/images/KitConexionCompleto.jpg',
}

function respuestaJson(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('servicio de productos', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('carga productos de la API sin requerir autenticación', async () => {
    const fetchMock = vi.fn().mockResolvedValue(respuestaJson(productosIniciales))
    vi.stubGlobal('fetch', fetchMock)

    await expect(obtenerProductos()).resolves.toEqual(productosIniciales)
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/productos',
      expect.objectContaining({ method: 'GET' }),
    )
    const headers = new Headers(fetchMock.mock.calls[0]?.[1]?.headers)
    expect(headers.has('Authorization')).toBe(false)
  })

  it('crea un producto enviando el JWT y los datos requeridos', async () => {
    const creado = { ...productoNuevo, codigo: 'GEV123' }
    const fetchMock = vi.fn().mockResolvedValue(respuestaJson(creado, 201))
    vi.stubGlobal('fetch', fetchMock)
    guardarAccessToken('jwt-admin', 900)

    await expect(crearProducto(productoNuevo)).resolves.toEqual(creado)
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/productos',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(productoNuevo),
      }),
    )
    const headers = new Headers(fetchMock.mock.calls[0]?.[1]?.headers)
    expect(headers.get('Authorization')).toBe('Bearer jwt-admin')
  })

  it('actualiza el producto completo usando PUT autenticado', async () => {
    const actualizado = {
      ...productosIniciales[0],
      nombre: 'Cilindro actualizado',
    }
    const { codigo, ...datos } = actualizado
    const fetchMock = vi.fn().mockResolvedValue(respuestaJson(actualizado))
    vi.stubGlobal('fetch', fetchMock)
    guardarAccessToken('jwt-admin', 900)

    await expect(
      actualizarProducto(codigo, datos),
    ).resolves.toEqual(actualizado)
    expect(fetchMock).toHaveBeenCalledWith(
      `/api/productos/${codigo}`,
      expect.objectContaining({ method: 'PUT' }),
    )
    const headers = new Headers(fetchMock.mock.calls[0]?.[1]?.headers)
    expect(headers.get('Authorization')).toBe('Bearer jwt-admin')
  })

  it('elimina productos con el JWT y acepta la respuesta 204 vacía', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
    vi.stubGlobal('fetch', fetchMock)
    guardarAccessToken('jwt-admin', 900)

    await expect(eliminarProducto('CL001')).resolves.toBeUndefined()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/productos/CL001',
      expect.objectContaining({ method: 'DELETE' }),
    )
    const headers = new Headers(fetchMock.mock.calls[0]?.[1]?.headers)
    expect(headers.get('Authorization')).toBe('Bearer jwt-admin')
  })

  it('no envía mutaciones si falta el token', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(crearProducto(productoNuevo)).rejects.toThrow(
      'Debes iniciar sesión para realizar esta acción.',
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('muestra errores del servidor y no modifica datos locales', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      respuestaJson({ detail: 'No tienes permisos para modificar productos.' }, 403),
    )
    vi.stubGlobal('fetch', fetchMock)
    guardarAccessToken('jwt-cliente', 900)

    await expect(crearProducto(productoNuevo)).rejects.toThrow(
      'No tienes permisos para modificar productos.',
    )
    expect(sessionStorage.getItem('gasVolcanProductos')).toBeNull()
  })

  it('rechaza respuestas de API que no tienen el formato de producto', async () => {
    const fetchMock = vi.fn().mockResolvedValue(respuestaJson([{ codigo: 'CL001' }]))
    vi.stubGlobal('fetch', fetchMock)

    await expect(obtenerProductos()).rejects.toThrow(
      'La API devolvió un producto con formato inválido.',
    )
  })

  it('cierra la sesión al recibir 401 en una solicitud autenticada', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      respuestaJson({ detail: 'Token expirado.' }, 401),
    )
    vi.stubGlobal('fetch', fetchMock)
    guardarAccessToken('jwt-expirado', 900)
    setUsuarioActual({
      run: '111111111',
      nombre: 'Admin',
      apellidos: 'Demo',
      email: 'admin@gasvolcan.cl',
      rol: 'Administrador',
    })

    await expect(crearProducto(productoNuevo)).rejects.toThrow(
      'Tu sesión expiró o dejó de ser válida. Inicia sesión nuevamente.',
    )
    expect(sessionStorage.getItem('gasVolcanAccessToken')).toBeNull()
    expect(sessionStorage.getItem('gasVolcanAccessTokenExpiresAt')).toBeNull()
    expect(getUsuarioActual()).toBeNull()
  })

  it('no envía solicitudes si el token ya venció', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    sessionStorage.setItem('gasVolcanAccessToken', 'jwt-expirado')
    sessionStorage.setItem(
      'gasVolcanAccessTokenExpiresAt',
      String(Date.now() - 1000),
    )

    await expect(crearProducto(productoNuevo)).rejects.toThrow(
      'Debes iniciar sesión para realizar esta acción.',
    )
    expect(fetchMock).not.toHaveBeenCalled()
    expect(sessionStorage.getItem('gasVolcanAccessToken')).toBeNull()
  })

  it('busca productos sin distinguir mayúsculas ni tildes', () => {
    const resultado = buscarProductos(productosIniciales, 'presion')

    expect(resultado.map((producto) => producto.codigo)).toContain('RG001')
    expect(
      resultado.every((producto) =>
        `${producto.nombre} ${producto.categoria} ${producto.descripcion}`
          .toLocaleLowerCase('es-CL')
          .includes('presión'),
      ),
    ).toBe(true)
  })

  it('busca por código de producto sin distinguir mayúsculas', () => {
    const resultado = buscarProductos(productosIniciales, 'cl001')

    expect(resultado.map((producto) => producto.codigo)).toEqual(['CL001'])
  })

  it('devuelve los productos originales cuando la búsqueda está vacía', () => {
    expect(buscarProductos(productosIniciales, '   ')).toBe(productosIniciales)
  })
})
