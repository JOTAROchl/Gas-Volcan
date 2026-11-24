import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AuthSessionMonitor from '../components/organisms/AuthSessionMonitor'
import { apiRequest, guardarAccessToken } from '../data/apiClient'
import LoginPagina from '../pages/LoginPagina'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  sessionStorage.clear()
})

describe('expiración de sesión', () => {
  it('cierra la sesión y avisa al usuario cuando vence el JWT', async () => {
    vi.useFakeTimers()
    guardarAccessToken('jwt-de-prueba', 60)

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={
              <>
                <AuthSessionMonitor />
                <p>Panel administrador</p>
              </>
            }
          />
          <Route path="/login" element={<LoginPagina />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Panel administrador')).toBeInTheDocument()

    await act(async () => {
      vi.advanceTimersByTime(60_000)
    })

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Tu sesión expiró o dejó de ser válida. Inicia sesión nuevamente.',
    )
    expect(sessionStorage.getItem('gasVolcanAccessToken')).toBeNull()
    expect(sessionStorage.getItem('gasVolcanCurrentUser')).toBeNull()
  })

  it('redirige al login y avisa cuando una solicitud protegida recibe 401', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ detail: 'Token no válido.' }), {
          status: 401,
          headers: { 'Content-Type': 'application/problem+json' },
        }),
      ),
    )
    guardarAccessToken('jwt-no-valido', 900)

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={
              <>
                <AuthSessionMonitor />
                <button
                  onClick={() => {
                    void apiRequest('/productos', {
                      method: 'POST',
                      body: {},
                      authenticated: true,
                    }).catch(() => undefined)
                  }}
                  type="button"
                >
                  Guardar
                </button>
              </>
            }
          />
          <Route path="/login" element={<LoginPagina />} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Tu sesión expiró o dejó de ser válida. Inicia sesión nuevamente.',
    )
    expect(sessionStorage.getItem('gasVolcanAccessToken')).toBeNull()
    expect(sessionStorage.getItem('gasVolcanCurrentUser')).toBeNull()
  })
})
