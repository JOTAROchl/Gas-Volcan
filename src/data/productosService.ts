import productosIniciales, { type Producto } from '../pages/catalogoProductos'

const STORAGE_KEY = 'gasVolcanProductos'

export type NuevoProducto = Omit<Producto, 'codigo'>
export type CambiosProducto = Partial<NuevoProducto>

function esProducto(value: unknown): value is Producto {
  if (typeof value !== 'object' || value === null) return false
  const producto = value as Record<string, unknown>

  return (
    typeof producto.codigo === 'string' &&
    typeof producto.categoria === 'string' &&
    typeof producto.nombre === 'string' &&
    typeof producto.descripcion === 'string' &&
    typeof producto.unidad === 'string' &&
    typeof producto.precioResidencial === 'number' &&
    typeof producto.precioComercial === 'number' &&
    typeof producto.stock === 'number' &&
    typeof producto.imagen === 'string'
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
  if (!producto.imagen.trim()) {
    throw new Error('Selecciona una imagen para el producto.')
  }
}

function guardarProductos(productos: Producto[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(productos))
  return productos
}

export function obtenerProductos(): Producto[] {
  const saved = sessionStorage.getItem(STORAGE_KEY)
  if (!saved) return guardarProductos([...productosIniciales])

  try {
    const parsed: unknown = JSON.parse(saved)
    if (Array.isArray(parsed) && parsed.every(esProducto)) return parsed
    throw new TypeError('El catálogo guardado no tiene el formato esperado.')
  } catch (error) {
    console.error('No se pudo leer el catálogo guardado.', error)
    sessionStorage.removeItem(STORAGE_KEY)
    return guardarProductos([...productosIniciales])
  }
}

export function crearProducto(datos: NuevoProducto): Producto[] {
  validarProducto(datos)
  const productos = obtenerProductos()
  let timestamp = Date.now()
  let codigo = `GEV${timestamp.toString(36).toUpperCase()}`
  while (productos.some((producto) => producto.codigo === codigo)) {
    timestamp += 1
    codigo = `GEV${timestamp.toString(36).toUpperCase()}`
  }

  return guardarProductos([...productos, { ...datos, codigo }])
}

export function actualizarProducto(
  codigo: string,
  cambios: CambiosProducto,
): Producto[] {
  const productos = obtenerProductos()
  const existente = productos.find((producto) => producto.codigo === codigo)
  if (!existente) throw new Error('No se encontró el producto que deseas editar.')

  const actualizado = { ...existente, ...cambios }
  validarProducto(actualizado)

  return guardarProductos(
    productos.map((producto) =>
      producto.codigo === codigo ? actualizado : producto,
    ),
  )
}

export function eliminarProducto(codigo: string): Producto[] {
  const productos = obtenerProductos()
  if (!productos.some((producto) => producto.codigo === codigo)) {
    throw new Error('No se encontró el producto que deseas eliminar.')
  }

  return guardarProductos(
    productos.filter((producto) => producto.codigo !== codigo),
  )
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
