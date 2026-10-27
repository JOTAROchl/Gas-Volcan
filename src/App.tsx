import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Encabezado from './componentes/estructura/Encabezado'
import PiePagina from './componentes/estructura/PiePagina'
import Contacto from './paginas/Contacto'
import DetalleProductos from './paginas/DetalleProductos'
import Inicio from './paginas/Inicio'
import LoginPagina from './paginas/LoginPagina'
import NovedadDetalle from './paginas/NovedadDetalle'
import Novedades from './paginas/Novedades'
import Productos from './paginas/Productos'
import QuienesSomos from './paginas/QuienesSomos'
import Seleccion from './paginas/Seleccion'
import PanelAdmin from './paginas/PanelAdmin'
import RegistroPagina from './paginas/RegistroPagina'
import productosIniciales, { type Producto } from './paginas/catalogoProductos'
import './App.css'

function App() {
  const [productos, setProductos] = useState<Producto[]>(() => {
    const saved = sessionStorage.getItem('gasVolcanProductos')
    if (!saved) return productosIniciales

    try {
      const parsed: unknown = JSON.parse(saved)
      if (
        Array.isArray(parsed) &&
        parsed.every(
          (item) =>
            typeof item === 'object' &&
            item !== null &&
            'codigo' in item &&
            typeof item.codigo === 'string' &&
            'nombre' in item &&
            typeof item.nombre === 'string',
        )
      ) {
        return parsed as Producto[]
      }
      throw new TypeError('El catálogo guardado no tiene el formato esperado.')
    } catch (error) {
      console.error('No se pudo leer el catálogo guardado.', error)
      sessionStorage.removeItem('gasVolcanProductos')
      return productosIniciales
    }
  })
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
    sessionStorage.setItem('gasVolcanProductos', JSON.stringify(productos))
  }, [productos])

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

  return (
    <div className="app-shell">
      <Encabezado cantidadSeleccion={seleccion.length} />
      <main className="container">
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
                actualizarProductos={setProductos}
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
