import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  clearStoredMember,
  getStoredMember,
  isLoggedIn,
  MEMBER_SESSION_UPDATED_EVENT,
  updateStoredMember,
} from '@/lib/memberSession'

const STORAGE_KEY = 'supabase-member'
const member = { id: 'uuid-1', name: 'Ada', role: 'admin' }

beforeEach(() => {
  localStorage.clear()
})

describe('getStoredMember', () => {
  it('returns the stored member', () => {
    updateStoredMember(member)

    expect(getStoredMember()).toEqual(member)
    expect(isLoggedIn()).toBe(true)
  })

  it('returns null for corrupt storage instead of throwing', () => {
    localStorage.setItem(STORAGE_KEY, '{not json')

    expect(getStoredMember()).toBeNull()
    expect(isLoggedIn()).toBe(false)
  })

  it('returns null when nothing is stored', () => {
    expect(getStoredMember()).toBeNull()
  })
})

describe('session writes', () => {
  it('drops the legacy member and token keys', () => {
    localStorage.setItem('member', 'old')
    localStorage.setItem('token', 'old')

    updateStoredMember(member)

    expect(localStorage.getItem('member')).toBeNull()
    expect(localStorage.getItem('token')).toBeNull()
  })

  it('clears the session and notifies listeners', () => {
    const listener = vi.fn()
    window.addEventListener(MEMBER_SESSION_UPDATED_EVENT, listener)
    updateStoredMember(member)

    clearStoredMember()

    expect(getStoredMember()).toBeNull()
    expect(listener).toHaveBeenCalledTimes(2)
    window.removeEventListener(MEMBER_SESSION_UPDATED_EVENT, listener)
  })
})
