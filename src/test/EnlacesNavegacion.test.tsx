import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import EnlacesNavegacion from '../components/molecules/EnlacesNavegacion'
import { guardarSesion, type AuthResponse } from '../data/authService'

function respuestaSesion(rol: AuthResponse['usuario']['rol']): AuthResponse {
  return {
    accessToken: 'jwt-de-prueba',
    tokenType: 'Bearer',
    expiresIn: 900,
    usuario: {
      id: 1,
      run: '111111111',
      nombre: 'Juan',
      apellidos: 'Perez',
      email: 'admin@gasvolcan.cl',
      rol,
      region: 'Región Metropolitana',
      comuna: 'Santiago',
      direccion: 'Dirección de prueba 123',
    },
  }
}

afterEach(() => {
  sessionStorage.clear()
})

describe('enlace del panel administrador', () => {
  it('permite volver al panel y lo oculta al cerrar sesión', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <EnlacesNavegacion />
        <Routes>
          <Route path="/" element={<p>Portada del sitio</p>} />
          <Route path="/admin" element={<p>Panel de gestión</p>} />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.queryByRole('link', { name: 'Panel administrador' }),
    ).not.toBeInTheDocument()

    guardarSesion(respuestaSesion('ADMINISTRADOR'))
    const enlaceAdmin = await screen.findByRole('link', {
      name: 'Panel administrador',
    })
    fireEvent.click(enlaceAdmin)
    expect(await screen.findByText('Panel de gestión')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    await waitFor(() => {
      expect(
        screen.queryByRole('link', { name: 'Panel administrador' }),
      ).not.toBeInTheDocument()
    })
    expect(await screen.findByText('Portada del sitio')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Acceso' })).toBeInTheDocument()
  })

  it('no muestra el enlace del panel a una cuenta cliente', async () => {
    render(
      <MemoryRouter>
        <EnlacesNavegacion />
      </MemoryRouter>,
    )

    guardarSesion(respuestaSesion('CLIENTE'))

    await waitFor(() => {
      expect(
        screen.queryByRole('link', { name: 'Panel administrador' }),
      ).not.toBeInTheDocument()
    })
    expect(
      screen.getByRole('button', { name: 'Cerrar sesión' }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Acceso' })).not.toBeInTheDocument()
  })
})
