import { beforeEach, describe, expect, it } from 'vitest'
import productosIniciales from '../pages/catalogoProductos'
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

describe('CRUD de productos', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('crea un producto y lo guarda en el catálogo de sesión', () => {
    const resultado = crearProducto(productoNuevo)
    const guardados = obtenerProductos()
    const creado = resultado.find(
      (producto) => producto.nombre === productoNuevo.nombre,
    )

    expect(resultado).toHaveLength(productosIniciales.length + 1)
    expect(creado).toMatchObject(productoNuevo)
    expect(creado?.codigo).toMatch(/^GEV/)
    expect(guardados).toContainEqual(creado)
  })

  it('actualiza los datos de un producto sin cambiar su código', () => {
    const resultado = actualizarProducto('CL001', {
      nombre: 'Cilindro actualizado',
      precioResidencial: 7000,
      stock: 75,
    })
    const actualizado = resultado.find(
      (producto) => producto.codigo === 'CL001',
    )

    expect(resultado).toHaveLength(productosIniciales.length)
    expect(actualizado).toMatchObject({
      codigo: 'CL001',
      nombre: 'Cilindro actualizado',
      precioResidencial: 7000,
      stock: 75,
    })
    expect(obtenerProductos()).toContainEqual(actualizado)
  })

  it('elimina un producto del catálogo y conserva los demás', () => {
    const resultado = eliminarProducto('CL001')

    expect(resultado).toHaveLength(productosIniciales.length - 1)
    expect(resultado.some((producto) => producto.codigo === 'CL001')).toBe(false)
    expect(resultado.some((producto) => producto.codigo === 'CL002')).toBe(true)
    expect(obtenerProductos()).toEqual(resultado)
  })

  it('inicializa el catálogo con los productos de demostración', () => {
    const resultado = obtenerProductos()

    expect(resultado).toEqual(productosIniciales)
    expect(JSON.parse(sessionStorage.getItem('gasVolcanProductos') ?? '[]')).toEqual(
      productosIniciales,
    )
  })

  it('rechaza la creación de un producto con precio no válido', () => {
    expect(() =>
      crearProducto({ ...productoNuevo, precioResidencial: 0 }),
    ).toThrow('Los precios deben ser números mayores que cero.')
    expect(obtenerProductos()).toHaveLength(productosIniciales.length)
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

  it('informa si se intenta actualizar un código que no existe', () => {
    expect(() =>
      actualizarProducto('NO-EXISTE', { nombre: 'Producto inexistente' }),
    ).toThrow('No se encontró el producto que deseas editar.')
  })
})
