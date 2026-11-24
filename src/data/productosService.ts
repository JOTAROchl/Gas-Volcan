import { apiRequest } from './apiClient'
import type { Producto } from '../pages/catalogoProductos'

export type NuevoProducto = Omit<Producto, 'codigo'>
export type CambiosProducto = Partial<NuevoProducto>

function esObjeto(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function esProducto(value: unknown): value is Producto {
  if (!esObjeto(value)) return false

  return (
    typeof value.codigo === 'string' &&
    typeof value.categoria === 'string' &&
    typeof value.nombre === 'string' &&
    typeof value.descripcion === 'string' &&
    typeof value.unidad === 'string' &&
    typeof value.precioResidencial === 'number' &&
    typeof value.precioComercial === 'number' &&
    typeof value.stock === 'number' &&
    typeof value.imagen === 'string'
  )
}

function validarProducto(producto: NuevoProducto) {
  if (
    !producto.nombre.trim() ||
    producto.nombre.length > 120 ||
    !producto.categoria.trim() ||
    producto.categoria.length > 80
  ) {
    throw new Error('El nombre y la categoría del producto son obligatorios.')
  }
  if (
    !producto.descripcion.trim() ||
    producto.descripcion.length > 500 ||
    !producto.unidad.trim() ||
    producto.unidad.length > 30
  ) {
    throw new Error('La descripción y la unidad del producto son obligatorias.')
  }
  if (
    !Number.isFinite(producto.precioResidencial) ||
    producto.precioResidencial <= 0 ||
    !Number.isFinite(producto.precioComercial) ||
    producto.precioComercial <= 0
  ) {
    throw new Error('Los precios deben ser números mayores que cero.')
  }
  if (!Number.isInteger(producto.stock) || producto.stock < 0) {
    throw new Error('El stock debe ser un número entero igual o mayor que cero.')
  }
  if (!producto.imagen.trim() || producto.imagen.length > 500) {
    throw new Error('Selecciona una imagen válida para el producto.')
  }
}

function leerProducto(value: unknown): Producto {
  if (!esProducto(value)) {
    throw new Error('La API devolvió un producto con formato inválido.')
  }
  return value
}

export async function obtenerProductos(): Promise<Producto[]> {
  const response = await apiRequest('/productos')
  if (!Array.isArray(response)) {
    throw new Error('La API devolvió una lista de productos inválida.')
  }
  return response.map(leerProducto)
}

export async function crearProducto(
  datos: NuevoProducto,
): Promise<Producto> {
  validarProducto(datos)
  const response = await apiRequest('/productos', {
    method: 'POST',
    body: datos,
    authenticated: true,
  })
  return leerProducto(response)
}

export async function actualizarProducto(
  codigo: string,
  datos: NuevoProducto,
): Promise<Producto> {
  validarProducto(datos)
  const response = await apiRequest(`/productos/${encodeURIComponent(codigo)}`, {
    method: 'PUT',
    body: datos,
    authenticated: true,
  })
  return leerProducto(response)
}

export async function eliminarProducto(codigo: string): Promise<void> {
  await apiRequest(`/productos/${encodeURIComponent(codigo)}`, {
    method: 'DELETE',
    authenticated: true,
  })
}

function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es-CL')
    .trim()
}

export function buscarProductos(productos: Producto[], consulta: string) {
  const termino = normalizar(consulta)
  if (!termino) return productos

  return productos.filter((producto) =>
    normalizar(
      [
        producto.codigo,
        producto.nombre,
        producto.categoria,
        producto.descripcion,
      ].join(' '),
    ).includes(termino),
  )
}
