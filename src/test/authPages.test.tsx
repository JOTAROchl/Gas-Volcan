import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LoginPagina from '../pages/LoginPagina'
import RegistroPagina from '../pages/RegistroPagina'

function UbicacionActual() {
  const location = useLocation()
  return <output>{location.pathname}</output>
}

function respuestaAuth(rol: 'CLIENTE' | 'ADMINISTRADOR' = 'CLIENTE') {
  return new Response(
    JSON.stringify({
      accessToken: 'jwt-de-prueba',
      tokenType: 'Bearer',
      expiresIn: 900,
      usuario: {
        id: 1,
        run: '123456785',
        nombre: 'Camila',
        apellidos: 'Soto',
        email: 'camila@ejemplo.cl',
        rol,
        region: 'Región Metropolitana',
        comuna: 'Santiago',
        direccion: 'Av. Central 123',
      },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
  sessionStorage.clear()
})

describe('formularios de autenticación conectados a la API', () => {
  it('envía el registro a la API y muestra confirmación', async () => {
    const fetchMock = vi.fn().mockResolvedValue(respuestaAuth())
    vi.stubGlobal('fetch', fetchMock)

    render(
      <MemoryRouter>
        <RegistroPagina />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('RUN *'), {
      target: { value: '12.345.678-5' },
    })
    fireEvent.change(screen.getByLabelText('Nombre *'), {
      target: { value: 'Camila' },
    })
    fireEvent.change(screen.getByLabelText('Apellidos *'), {
      target: { value: 'Soto' },
    })
    fireEvent.change(screen.getByLabelText('Correo electrónico *'), {
      target: { value: 'camila@ejemplo.cl' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña *'), {
      target: { value: 'Camila1234' },
    })
    fireEvent.change(screen.getByLabelText('Región *'), {
      target: { value: 'Región Metropolitana' },
    })
    fireEvent.change(screen.getByLabelText('Comuna *'), {
      target: { value: 'Santiago' },
    })
    fireEvent.change(screen.getByLabelText('Dirección *'), {
      target: { value: 'Av. Central 123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Registrar usuario' }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce())
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/auth/registro',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          run: '123456785',
          nombre: 'Camila',
          apellidos: 'Soto',
          email: 'camila@ejemplo.cl',
          password: 'Camila1234',
          region: 'Región Metropolitana',
          comuna: 'Santiago',
          direccion: 'Av. Central 123',
        }),
      }),
    )
    expect(
      await screen.findByText(
        'Cuenta creada correctamente. Ya puedes iniciar sesión.',
      ),
    ).toBeInTheDocument()
  })

  it('inicia sesión, guarda el token y dirige al usuario al inicio', async () => {
    const fetchMock = vi.fn().mockResolvedValue(respuestaAuth())
    vi.stubGlobal('fetch', fetchMock)

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <LoginPagina />
                <UbicacionActual />
              </>
            }
          />
          <Route path="/" element={<UbicacionActual />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('Correo electrónico'), {
      target: { value: 'camila@ejemplo.cl' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'Camila1234' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    await waitFor(() => expect(screen.getByText('/')).toBeInTheDocument())
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          email: 'camila@ejemplo.cl',
          password: 'Camila1234',
        }),
      }),
    )
    expect(sessionStorage.getItem('gasVolcanAccessToken')).toBe('jwt-de-prueba')
    expect(
      JSON.parse(sessionStorage.getItem('gasVolcanCurrentUser') ?? '{}'),
    ).toMatchObject({
      email: 'camila@ejemplo.cl',
      rol: 'Cliente',
    })
  })

  it('muestra el detalle de conflicto devuelto por la API', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          detail: 'El correo ya está registrado.',
          status: 409,
        }),
        { status: 409, headers: { 'Content-Type': 'application/problem+json' } },
      ),
    )
    vi.stubGlobal('fetch', fetchMock)

    render(
      <MemoryRouter>
        <RegistroPagina />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText('RUN *'), {
      target: { value: '123456785' },
    })
    fireEvent.change(screen.getByLabelText('Nombre *'), {
      target: { value: 'Camila' },
    })
    fireEvent.change(screen.getByLabelText('Apellidos *'), {
      target: { value: 'Soto' },
    })
    fireEvent.change(screen.getByLabelText('Correo electrónico *'), {
      target: { value: 'camila@ejemplo.cl' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña *'), {
      target: { value: 'Camila1234' },
    })
    fireEvent.change(screen.getByLabelText('Región *'), {
      target: { value: 'Región Metropolitana' },
    })
    fireEvent.change(screen.getByLabelText('Comuna *'), {
      target: { value: 'Santiago' },
    })
    fireEvent.change(screen.getByLabelText('Dirección *'), {
      target: { value: 'Av. Central 123' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Registrar usuario' }))

    expect(
      await screen.findByText('El correo ya está registrado.'),
    ).toBeInTheDocument()
    expect(sessionStorage.getItem('gasVolcanAccessToken')).toBeNull()
  })
})
