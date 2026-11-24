import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Encabezado from './components/organisms/Encabezado'
import AuthSessionMonitor from './components/organisms/AuthSessionMonitor'
import PiePagina from './components/organisms/PiePagina'
import Contacto from './pages/Contacto'
import DetalleProductos from './pages/DetalleProductos'
import Inicio from './pages/Inicio'
import LoginPagina from './pages/LoginPagina'
import NovedadDetalle from './pages/NovedadDetalle'
import Novedades from './pages/Novedades'
import Productos from './pages/Productos'
import QuienesSomos from './pages/QuienesSomos'
import Seleccion from './pages/Seleccion'
import PanelAdmin from './pages/PanelAdmin'
import RegistroPagina from './pages/RegistroPagina'
import type { Producto } from './pages/catalogoProductos'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
  type NuevoProducto,
} from './data/productosService'
import './App.css'

function App() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [cargandoProductos, setCargandoProductos] = useState(true)
  const [errorProductos, setErrorProductos] = useState('')
  const [seleccion, setSeleccion] = useState<Producto[]>(() => {
    const saved = localStorage.getItem('gasVolcanSelection')
    if (!saved) return []

    try {
      const parsed: unknown = JSON.parse(saved)
      if (!Array.isArray(parsed)) {
        throw new TypeError('La selección guardada no es una lista.')
      }
      return parsed.filter(
        (item: unknown): item is Producto =>
          typeof item === 'object' &&
          item !== null &&
          'codigo' in item &&
          typeof item.codigo === 'string',
      )
    } catch (error) {
      console.error('No se pudo leer la selección guardada.', error)
      localStorage.removeItem('gasVolcanSelection')
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('gasVolcanSelection', JSON.stringify(seleccion))
  }, [seleccion])

  useEffect(() => {
    let activo = true
    obtenerProductos()
      .then((productosCargados) => {
        if (activo) setProductos(productosCargados)
      })
      .catch((error: unknown) => {
        if (activo) {
          setErrorProductos(
            error instanceof Error
              ? error.message
              : 'No se pudo cargar el catálogo de productos.',
          )
        }
      })
      .finally(() => {
        if (activo) setCargandoProductos(false)
      })

    return () => {
      activo = false
    }
  }, [])

  async function reintentarCargaProductos() {
    setCargandoProductos(true)
    setErrorProductos('')
    try {
      setProductos(await obtenerProductos())
    } catch (error) {
      setErrorProductos(
        error instanceof Error
          ? error.message
          : 'No se pudo cargar el catálogo de productos.',
      )
    } finally {
      setCargandoProductos(false)
    }
  }

  function agregarProducto(producto: Producto) {
    setSeleccion((actual) =>
      actual.some((item) => item.codigo === producto.codigo)
        ? actual
        : [...actual, producto],
    )
  }

  function quitarProducto(codigo: string) {
    setSeleccion((actual) => actual.filter((item) => item.codigo !== codigo))
  }

  async function crearProductoEnCatalogo(
    producto: NuevoProducto,
  ): Promise<Producto> {
    const creado = await crearProducto(producto)
    setProductos((actuales) => [...actuales, creado])
    return creado
  }

  async function actualizarProductoEnCatalogo(
    codigo: string,
    datos: NuevoProducto,
  ): Promise<Producto> {
    const actualizado = await actualizarProducto(codigo, datos)
    setProductos((actuales) =>
      actuales.map((producto) =>
        producto.codigo === codigo ? actualizado : producto,
      ),
    )
    setSeleccion((actual) =>
      actual.map((producto) =>
        producto.codigo === codigo ? actualizado : producto,
      ),
    )
    return actualizado
  }

  async function eliminarProductoDelCatalogo(codigo: string): Promise<void> {
    await eliminarProducto(codigo)
    setProductos((actuales) =>
      actuales.filter((producto) => producto.codigo !== codigo),
    )
    setSeleccion((actual) =>
      actual.filter((producto) => producto.codigo !== codigo),
    )
  }

  return (
    <div className="app-shell">
      <AuthSessionMonitor />
      <Encabezado cantidadSeleccion={seleccion.length} />
      <main className="container">
        {cargandoProductos && (
          <p className="form-message" role="status">
            Cargando productos del catálogo…
          </p>
        )}
        {errorProductos && (
          <div className="form-message error" role="alert">
            <p>{errorProductos}</p>
            <button
              className="button button-secondary"
              onClick={() => void reintentarCargaProductos()}
              type="button"
            >
              Reintentar
            </button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Inicio productos={productos} />} />
          <Route path="/catalogo" element={<Productos productos={productos} />} />
          <Route path="/productos" element={<Productos productos={productos} />} />
          <Route
            path="/productos/:id"
            element={
              <DetalleProductos
                productos={productos}
                agregarProducto={agregarProducto}
              />
            }
          />
          <Route
            path="/catalogo/:id"
            element={
              <DetalleProductos
                productos={productos}
                agregarProducto={agregarProducto}
              />
            }
          />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/novedades/:id" element={<NovedadDetalle />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/nosotros" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<LoginPagina />} />
          <Route path="/registro" element={<RegistroPagina />} />
          <Route
            path="/seleccion"
            element={
              <Seleccion seleccion={seleccion} quitarProducto={quitarProducto} />
            }
          />
          <Route
            path="/admin"
            element={
              <PanelAdmin
                productos={productos}
                crearProducto={crearProductoEnCatalogo}
                actualizarProducto={actualizarProductoEnCatalogo}
                eliminarProducto={eliminarProductoDelCatalogo}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <PiePagina />
    </div>
  )
}

export default App
