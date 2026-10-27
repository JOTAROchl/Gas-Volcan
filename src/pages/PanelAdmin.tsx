import { useMemo, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  getUsuarioActual,
  getUsuariosDemo,
  guardarUsuariosDemo,
  setUsuarioActual,
  type UsuarioDemo,
} from './authDemo'
import productosIniciales, { type Producto } from './catalogoProductos'
import {
  buscarProductos,
  type CambiosProducto,
  type NuevoProducto,
} from '../data/productosService'

interface PanelAdminProps {
  productos: Producto[]
  crearProducto: (producto: NuevoProducto) => Producto[]
  actualizarProducto: (
    codigo: string,
    cambios: CambiosProducto,
  ) => Producto[]
  eliminarProducto: (codigo: string) => Producto[]
}

interface FormularioProducto {
  categoria: string
  nombre: string
  descripcion: string
  unidad: string
  precioResidencial: string
  precioComercial: string
  stock: string
  imagen: string
}

const formularioVacio: FormularioProducto = {
  categoria: 'Accesorios',
  nombre: '',
  descripcion: '',
  unidad: 'Unidad',
  precioResidencial: '',
  precioComercial: '',
  stock: '',
  imagen: '',
}

function PanelAdmin({
  productos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
}: PanelAdminProps) {
  const usuarioActual = getUsuarioActual()
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState<'success' | 'error'>('success')
  const [consulta, setConsulta] = useState('')
  const [codigoEditando, setCodigoEditando] = useState<string | null>(null)
  const [formulario, setFormulario] = useState(formularioVacio)
  const [usuarios, setUsuarios] = useState<UsuarioDemo[]>(getUsuariosDemo)
  const productosFiltrados = buscarProductos(productos, consulta)
  const categorias = useMemo(
    () => [...new Set(productos.map((producto) => producto.categoria))],
    [productos],
  )
  const imagenes = useMemo(
    () =>
      [
        ...new Set([
          ...productosIniciales.map((producto) => producto.imagen),
          ...productos.map((producto) => producto.imagen),
        ]),
      ],
    [productos],
  )

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

  function actualizarCampo(
    campo: keyof FormularioProducto,
    valor: string,
  ) {
    setFormulario((actual) => ({ ...actual, [campo]: valor }))
  }

  function limpiarFormulario() {
    setCodigoEditando(null)
    setFormulario({ ...formularioVacio, imagen: imagenes[0] ?? '' })
  }

  function editarProducto(producto: Producto) {
    setCodigoEditando(producto.codigo)
    setFormulario({
      categoria: producto.categoria,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      unidad: producto.unidad,
      precioResidencial: String(producto.precioResidencial),
      precioComercial: String(producto.precioComercial),
      stock: String(producto.stock),
      imagen: producto.imagen,
    })
    setMensaje('')
    document.getElementById('product-form-heading')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  function guardarProducto(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const datos: NuevoProducto = {
      categoria: formulario.categoria.trim(),
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      unidad: formulario.unidad.trim(),
      precioResidencial: Number(formulario.precioResidencial),
      precioComercial: Number(formulario.precioComercial),
      stock: Number(formulario.stock),
      imagen: formulario.imagen,
    }

    try {
      if (codigoEditando) {
        actualizarProducto(codigoEditando, datos)
        setMensaje(`Se actualizaron los datos de ${datos.nombre}.`)
      } else {
        crearProducto(datos)
        setMensaje(`Se agregó ${datos.nombre} al catálogo.`)
      }
      setTipoMensaje('success')
      limpiarFormulario()
    } catch (error) {
      setTipoMensaje('error')
      setMensaje(
        error instanceof Error
          ? error.message
          : 'No se pudo guardar el producto. Intenta nuevamente.',
      )
    }
  }

  function borrarProducto(producto: Producto) {
    if (!window.confirm(`¿Eliminar "${producto.nombre}" del catálogo?`)) return

    try {
      eliminarProducto(producto.codigo)
      if (codigoEditando === producto.codigo) limpiarFormulario()
      setTipoMensaje('success')
      setMensaje(`${producto.nombre} se eliminó del catálogo.`)
    } catch (error) {
      setTipoMensaje('error')
      setMensaje(
        error instanceof Error
          ? error.message
          : 'No se pudo eliminar el producto. Intenta nuevamente.',
      )
    }
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

      <form className="form-card product-admin-form" onSubmit={guardarProducto}>
        <p className="eyebrow">Gestión de productos</p>
        <h2 id="product-form-heading">
          {codigoEditando ? `Editar ${codigoEditando}` : 'Agregar producto'}
        </h2>
        <div className="product-admin-fields">
          <div>
            <label htmlFor="admin-product-name">Nombre</label>
            <input
              id="admin-product-name"
              maxLength={120}
              onChange={(event) => actualizarCampo('nombre', event.target.value)}
              required
              value={formulario.nombre}
            />
          </div>
          <div>
            <label htmlFor="admin-product-category">Categoría</label>
            <input
              id="admin-product-category"
              list="product-categories"
              maxLength={80}
              onChange={(event) =>
                actualizarCampo('categoria', event.target.value)
              }
              required
              value={formulario.categoria}
            />
            <datalist id="product-categories">
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria} />
              ))}
            </datalist>
          </div>
          <div>
            <label htmlFor="admin-product-unit">Unidad</label>
            <input
              id="admin-product-unit"
              maxLength={30}
              onChange={(event) => actualizarCampo('unidad', event.target.value)}
              required
              value={formulario.unidad}
            />
          </div>
          <div>
            <label htmlFor="admin-product-residential">
              Precio residencial
            </label>
            <input
              id="admin-product-residential"
              min="1"
              onChange={(event) =>
                actualizarCampo('precioResidencial', event.target.value)
              }
              required
              type="number"
              value={formulario.precioResidencial}
            />
          </div>
          <div>
            <label htmlFor="admin-product-commercial">Precio comercial</label>
            <input
              id="admin-product-commercial"
              min="1"
              onChange={(event) =>
                actualizarCampo('precioComercial', event.target.value)
              }
              required
              type="number"
              value={formulario.precioComercial}
            />
          </div>
          <div>
            <label htmlFor="admin-product-stock">Stock</label>
            <input
              id="admin-product-stock"
              min="0"
              onChange={(event) => actualizarCampo('stock', event.target.value)}
              required
              type="number"
              value={formulario.stock}
            />
          </div>
          <div>
            <label htmlFor="admin-product-image">Imagen</label>
            <select
              id="admin-product-image"
              onChange={(event) => actualizarCampo('imagen', event.target.value)}
              required
              value={formulario.imagen}
            >
              <option value="">Selecciona una imagen</option>
              {imagenes.map((imagen) => (
                <option key={imagen} value={imagen}>
                  {imagen.split('/').pop()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label htmlFor="admin-product-description">Descripción</label>
        <textarea
          id="admin-product-description"
          maxLength={500}
          onChange={(event) =>
            actualizarCampo('descripcion', event.target.value)
          }
          required
          value={formulario.descripcion}
        />
        <div className="button-row">
          <button className="button button-primary" type="submit">
            {codigoEditando ? 'Guardar cambios' : 'Crear producto'}
          </button>
          {codigoEditando && (
            <button
              className="button button-secondary"
              onClick={limpiarFormulario}
              type="button"
            >
              Cancelar edición
            </button>
          )}
        </div>
        <p className={`form-message ${tipoMensaje}`} aria-live="polite">
          {mensaje}
        </p>
      </form>

      <div className="table-wrap section-block">
        <div className="section-heading">
          <h2>Productos ({productos.length})</h2>
          <div className="admin-search">
            <label htmlFor="admin-product-search">Buscar producto</label>
            <input
              id="admin-product-search"
              onChange={(event) => setConsulta(event.target.value)}
              placeholder="Nombre, código o categoría"
              type="search"
              value={consulta}
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>${producto.precioResidencial.toLocaleString('es-CL')}</td>
                <td>{producto.stock}</td>
                <td>
                  <div className="table-actions">
                    <button
                      className="button button-secondary"
                      onClick={() => editarProducto(producto)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="button button-danger"
                      onClick={() => borrarProducto(producto)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan={6}>No hay productos que coincidan con la búsqueda.</td>
              </tr>
            )}
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
                <td>
                  {usuario.nombre} {usuario.apellidos}
                </td>
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
        Los cambios se guardan en la sesión del navegador y se pierden al
        cerrarla. Este panel es demostrativo: no se conecta a una base de datos.
      </p>
    </section>
  )
}

export default PanelAdmin
