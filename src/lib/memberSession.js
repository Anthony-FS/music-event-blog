import { signOut } from '../services/authService'

export const MEMBER_SESSION_UPDATED_EVENT = 'member-session-updated'
const MEMBER_STORAGE_KEY = 'supabase-member'

export function isLoggedIn() {
  return Boolean(getStoredMember())
}

export function getStoredMember() {
  try {
    const member = JSON.parse(localStorage.getItem(MEMBER_STORAGE_KEY))
    return member ?? null
  } catch {
    return null
  }
}

export function updateStoredMember(member) {
  localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(member))
  localStorage.removeItem('member')
  localStorage.removeItem('token')
  notifyMemberSessionUpdated()
}

export function clearStoredMember() {
  localStorage.removeItem(MEMBER_STORAGE_KEY)
  localStorage.removeItem('member')
  localStorage.removeItem('token')
  notifyMemberSessionUpdated()
}

export async function clearMemberSession() {
  await signOut()
  clearStoredMember()
}

export function notifyMemberSessionUpdated() {
  window.dispatchEvent(new Event(MEMBER_SESSION_UPDATED_EVENT))
}
