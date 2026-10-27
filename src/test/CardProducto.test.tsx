import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import CardProducto from '../components/molecules/CardProducto'
import { productosIniciales } from '../pages/catalogoProductos'

describe('CardProducto', () => {
  it('muestra los datos del producto y enlaza a su vista de detalle', () => {
    const producto = productosIniciales[0]

    render(
      <MemoryRouter>
        <CardProducto producto={producto} />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('heading', { name: producto.nombre }),
    ).toBeInTheDocument()
    expect(screen.getByText(producto.categoria)).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: producto.nombre }),
    ).toHaveAttribute('src', producto.imagen)
    expect(screen.getByText('$6.500')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver detalle' })).toHaveAttribute(
      'href',
      `/productos/${producto.codigo}`,
    )
  })
})
