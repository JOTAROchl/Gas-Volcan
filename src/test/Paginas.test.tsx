import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Contacto from '../pages/Contacto'
import DetalleProductos from '../pages/DetalleProductos'
import { productosIniciales } from '../pages/catalogoProductos'
import Productos from '../pages/Productos'

describe('Páginas del catálogo y contacto', () => {
  it('filtra las tarjetas del catálogo por búsqueda', () => {
    render(
      <MemoryRouter>
        <Productos productos={productosIniciales} />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'GLP 5 kg' },
    })

    expect(
      screen.getByRole('heading', { name: 'Cilindro GLP 5 kg' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Cilindro GLP 11 kg' })).toBeNull()
    expect(screen.getByText('1 producto encontrado')).toBeInTheDocument()
  })

  it('agrega el producto correcto a la selección desde su detalle', () => {
    const agregarProducto = vi.fn()
    const producto = productosIniciales[0]

    render(
      <MemoryRouter initialEntries={['/productos/CL001']}>
        <Routes>
          <Route
            path="/productos/:id"
            element={
              <DetalleProductos
                productos={productosIniciales}
                agregarProducto={agregarProducto}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Agregar a mi selección' }),
    )

    expect(agregarProducto).toHaveBeenCalledOnce()
    expect(agregarProducto).toHaveBeenCalledWith(producto)
    expect(
      screen.getByText('Producto agregado a tu selección.'),
    ).toBeInTheDocument()
  })

  it('muestra un error específico si el nombre de contacto es demasiado corto', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Nombre *'), {
      target: { value: 'Al' },
    })
    fireEvent.change(screen.getByLabelText('Correo electrónico *'), {
      target: { value: 'cliente@ejemplo.cl' },
    })
    fireEvent.change(screen.getByLabelText('Comentario o mensaje *'), {
      target: { value: 'Necesito información sobre los cilindros.' },
    })
    fireEvent.submit(screen.getByRole('button', { name: 'Enviar consulta' }).closest('form')!)

    expect(
      screen.getByText('El nombre debe tener entre 3 y 300 caracteres.'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Consulta validada en esta demostración/),
    ).toBeNull()
  })
})
