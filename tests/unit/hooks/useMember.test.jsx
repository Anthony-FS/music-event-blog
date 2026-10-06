import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import useMember from '@/hooks/useMember'
import { getSession, onAuthStateChange } from '@/services/authService'
import { getProfile, updateProfile } from '@/services/profileService'

vi.mock('@/lib/supabase', () => ({
  supabase: { auth: {} },
  isSupabaseConfigured: () => true,
}))

vi.mock('@/services/authService', () => ({
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
  signOut: vi.fn().mockResolvedValue(undefined),
}))

// mapProfileToMember stays real: the mapping is what we want to exercise.
vi.mock('@/services/profileService', async (importOriginal) => ({
  ...(await importOriginal()),
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
}))

const STORAGE_KEY = 'supabase-member'
const user = { id: 'uuid-1', email: 'ada@example.com', user_metadata: {} }
const profileRow = {
  id: 'uuid-1',
  name: 'Ada',
  username: 'ada',
  bio: 'Writes about gigs.',
  avatar_url: 'avatar.png',
  role: 'admin',
}

let unsubscribe

beforeEach(() => {
  localStorage.clear()
  unsubscribe = vi.fn()
  onAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe } } })
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('useMember', () => {
  it('ends up logged out when there is no session', async () => {
    getSession.mockResolvedValue(null)

    const { result } = renderHook(() => useMember())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.member).toBeNull()
    expect(result.current.isLoggedIn).toBe(false)
    expect(getProfile).not.toHaveBeenCalled()
  })

  it('loads the profile for a session and maps it onto the member', async () => {
    getSession.mockResolvedValue({ user })
    getProfile.mockResolvedValue(profileRow)

    const { result } = renderHook(() => useMember())

    await waitFor(() => expect(result.current.member).not.toBeNull())
    expect(result.current.member).toEqual({
      id: 'uuid-1',
      name: 'Ada',
      username: 'ada',
      email: 'ada@example.com',
      role: 'admin',
      bio: 'Writes about gigs.',
      avatarUrl: 'avatar.png',
    })
    expect(result.current.isLoggedIn).toBe(true)
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).role).toBe('admin')
  })

  it('hydrates from storage so a reload does not flash as logged out', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'uuid-1', role: 'admin' }))
    getSession.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() => useMember())

    expect(result.current.isLoggedIn).toBe(true)
    expect(result.current.isLoading).toBe(true)
  })

  it('clears the stored member when the profile lookup fails', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'uuid-1', role: 'admin' }))
    getSession.mockResolvedValue({ user })
    getProfile.mockRejectedValue(new Error('row not found'))

    const { result } = renderHook(() => useMember())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.member).toBeNull()
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('clears the stored member when the session lookup fails', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ id: 'uuid-1', role: 'admin' }))
    getSession.mockRejectedValue(new Error('network down'))

    const { result } = renderHook(() => useMember())

    await waitFor(() => expect(result.current.isLoading).toBe(false))
    expect(result.current.member).toBeNull()
  })

  it('persists the saved profile and keeps the role from the server', async () => {
    getSession.mockResolvedValue({ user })
    getProfile.mockResolvedValue(profileRow)
    updateProfile.mockResolvedValue({ ...profileRow, name: 'Ada L', role: 'admin' })

    const { result } = renderHook(() => useMember())
    await waitFor(() => expect(result.current.member).not.toBeNull())

    let saved
    await act(async () => {
      saved = await result.current.saveMember({
        ...result.current.member,
        name: 'Ada L',
        role: 'member',
      })
    })

    expect(updateProfile).toHaveBeenCalledWith('uuid-1', expect.objectContaining({ name: 'Ada L' }))
    expect(saved.name).toBe('Ada L')
    expect(saved.role).toBe('admin')
    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).name).toBe('Ada L')
  })

  it('unsubscribes from auth changes on unmount', async () => {
    getSession.mockResolvedValue(null)

    const { result, unmount } = renderHook(() => useMember())
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    unmount()

    expect(unsubscribe).toHaveBeenCalled()
  })
})
