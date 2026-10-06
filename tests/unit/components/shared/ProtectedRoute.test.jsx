import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import ProtectedRoute from '@/components/shared/ProtectedRoute'
import useMember from '@/hooks/useMember'

vi.mock('@/hooks/useMember', () => ({ default: vi.fn() }))

afterEach(cleanup)

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<p>Home page</p>} />
        <Route path="/login" element={<p>Login page</p>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <p>Admin panel</p>
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-management"
          element={
            <ProtectedRoute>
              <p>Member area</p>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

function mockMember(member) {
  useMember.mockReturnValue({
    member,
    isLoggedIn: Boolean(member),
    isLoading: false,
  })
}

describe('ProtectedRoute', () => {
  it('waits instead of redirecting while the session is loading', () => {
    useMember.mockReturnValue({ member: null, isLoggedIn: false, isLoading: true })

    renderAt('/admin')

    expect(screen.getByText('Loading...')).toBeTruthy()
    expect(screen.queryByText('Login page')).toBeNull()
  })

  it('sends a logged-out visitor to the login page', () => {
    mockMember(null)

    renderAt('/admin')

    expect(screen.getByText('Login page')).toBeTruthy()
    expect(screen.queryByText('Admin panel')).toBeNull()
  })

  it('sends a logged-in member away from an admin-only route', () => {
    mockMember({ id: 'uuid-1', role: 'member' })

    renderAt('/admin')

    expect(screen.getByText('Home page')).toBeTruthy()
    expect(screen.queryByText('Admin panel')).toBeNull()
  })

  it('lets an admin through to an admin-only route', () => {
    mockMember({ id: 'uuid-1', role: 'admin' })

    renderAt('/admin')

    expect(screen.getByText('Admin panel')).toBeTruthy()
  })

  it('lets any logged-in member through a route without requireAdmin', () => {
    mockMember({ id: 'uuid-1', role: 'member' })

    renderAt('/member-management')

    expect(screen.getByText('Member area')).toBeTruthy()
  })
})
