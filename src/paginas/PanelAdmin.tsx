import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  getUsuarioActual,
  getUsuariosDemo,
  guardarUsuariosDemo,
  setUsuarioActual,
  type UsuarioDemo,
} from './authDemo'
import type { Producto } from './catalogoProductos'

interface PanelAdminProps {
  productos: Producto[]
  actualizarProductos: (productos: Producto[]) => void
}

function PanelAdmin({ productos, actualizarProductos }: PanelAdminProps) {
  const usuarioActual = getUsuarioActual()
  const [mensaje, setMensaje] = useState('')
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [stock, setStock] = useState('')
  const [usuarios, setUsuarios] = useState<UsuarioDemo[]>(getUsuariosDemo)

  if (!usuarioActual) return <Navigate to="/login" replace />
  if (usuarioActual.rol !== 'Administrador') {
    return (
      <section className="page-heading">
        <h1>Acceso restringido.</h1>
        <p>Esta sección está disponible para la cuenta de demostración admin.</p>
        <button
          className="button button-secondary"
          onClick={() => {
            setUsuarioActual(null)
            window.location.assign('/login')
          }}
          type="button"
        >
          Cerrar sesión
        </button>
      </section>
    )
  }
  const usuarioAdmin = usuarioActual

  function agregarProducto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const productName = nombre.trim()
    const productPrice = Number(precio)
    const productStock = Number(stock)
    if (
      productName.length < 3 ||
      !Number.isFinite(productPrice) ||
      productPrice <= 0 ||
      !Number.isInteger(productStock) ||
      productStock < 0
    ) {
      setMensaje('Ingresa un nombre, precio y stock válidos.')
      return
    }

    const codigo = `DEMO${Date.now().toString().slice(-6)}`
    const nuevoProducto: Producto = {
      codigo,
      categoria: 'Accesorios',
      nombre: productName,
      descripcion: 'Producto agregado en el panel de demostración.',
      unidad: 'Unidad',
      precioResidencial: productPrice,
      precioComercial: productPrice,
      stock: productStock,
      imagen: '/images/KitConexionCompleto.jpg',
    }
    actualizarProductos([...productos, nuevoProducto])
    setNombre('')
    setPrecio('')
    setStock('')
    setMensaje(`Se agregó ${productName} a esta sesión.`)
  }

  function eliminarUsuario(run: string) {
    const actualizados = usuarios.filter(
      (usuario) =>
        usuario.run !== run && usuario.email !== usuarioAdmin.email,
    )
    guardarUsuariosDemo(actualizados)
    setUsuarios(actualizados)
  }

  return (
    <section className="admin-shell">
      <div className="admin-header form-card">
        <p className="eyebrow">Administración · demostración</p>
        <h1>Panel de gestión.</h1>
        <p>Sesión iniciada como {usuarioAdmin.email}.</p>
        <button
          className="button button-secondary"
          onClick={() => {
            setUsuarioActual(null)
            window.location.assign('/')
          }}
          type="button"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="admin-grid section-block">
        <article className="stat-card">
          <p className="eyebrow">Productos</p>
          <h2>{productos.length}</h2>
          <p>Disponibles en el catálogo de esta sesión.</p>
        </article>
        <article className="stat-card">
          <p className="eyebrow">Usuarios</p>
          <h2>{usuarios.length}</h2>
          <p>Usuarios demo guardados en la sesión actual.</p>
        </article>
        <article className="stat-card">
          <p className="eyebrow">Vista pública</p>
          <Link className="text-link" to="/catalogo">
            Ir al catálogo &gt;&gt;
          </Link>
        </article>
      </div>

      <form className="form-card" onSubmit={agregarProducto}>
        <h2>Agregar producto de demostración</h2>
        <div className="form-row">
          <div>
            <label htmlFor="admin-product-name">Nombre</label>
            <input
              id="admin-product-name"
              onChange={(event) => setNombre(event.target.value)}
              value={nombre}
              required
            />
          </div>
          <div>
            <label htmlFor="admin-product-price">Precio residencial</label>
            <input
              id="admin-product-price"
              min="1"
              onChange={(event) => setPrecio(event.target.value)}
              type="number"
              value={precio}
              required
            />
          </div>
          <div>
            <label htmlFor="admin-product-stock">Stock</label>
            <input
              id="admin-product-stock"
              min="0"
              onChange={(event) => setStock(event.target.value)}
              type="number"
              value={stock}
              required
            />
          </div>
        </div>
        <button className="button button-primary" type="submit">
          Agregar producto
        </button>
        <p className="form-message success" aria-live="polite">{mensaje}</p>
      </form>

      <div className="table-wrap section-block">
        <h2>Productos</h2>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>${producto.precioResidencial.toLocaleString('es-CL')}</td>
                <td>{producto.stock}</td>
                <td>
                  <button
                    className="button button-danger"
                    onClick={() =>
                      actualizarProductos(
                        productos.filter((item) => item.codigo !== producto.codigo),
                      )
                    }
                    type="button"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-wrap section-block">
        <h2>Usuarios de demostración</h2>
        <table>
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.run}>
                <td>{usuario.run}</td>
                <td>{usuario.nombre} {usuario.apellidos}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td>
                  {usuario.email === usuarioAdmin.email ? (
                    <span>Cuenta actual</span>
                  ) : (
                    <button
                      className="button button-danger"
                      onClick={() => eliminarUsuario(usuario.run)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="demo-notice">
        Los cambios se mantienen solo en memoria mientras la aplicación está
        abierta. Este panel no es un sistema administrativo seguro ni se conecta
        a una base de datos.
      </p>
    </section>
  )
}

export default PanelAdmin
