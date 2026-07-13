import { members } from '../data/memberlogin'

export const MEMBER_SESSION_UPDATED_EVENT = 'member-session-updated'

export function getAuthToken() {
  return localStorage.getItem('token')
}

export function isLoggedIn() {
  return Boolean(getAuthToken())
}

export function getStoredMember() {
  if (!isLoggedIn()) {
    return null
  }

  try {
    const member = JSON.parse(localStorage.getItem('member'))
    return member ?? null
  } catch {
    return null
  }
}

export function toMemberSessionPayload(member) {
  return {
    id: member.id,
    name: member.name,
    username: member.username,
    email: member.email,
    role: member.role ?? 'member',
  }
}

export function saveMemberSession(member) {
  const sessionMember = toMemberSessionPayload(member)

  localStorage.setItem('token', String(sessionMember.id))
  localStorage.setItem('member', JSON.stringify(sessionMember))
  notifyMemberSessionUpdated()
}

export function updateStoredMember(member) {
  localStorage.setItem('member', JSON.stringify(member))
  notifyMemberSessionUpdated()
}

export function clearMemberSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('member')
  notifyMemberSessionUpdated()
}

export function notifyMemberSessionUpdated() {
  window.dispatchEvent(new Event(MEMBER_SESSION_UPDATED_EVENT))
}

export function getCurrentMemberPassword() {
  const storedMember = getStoredMember()

  if (!storedMember) {
    return 'password123'
  }

  const matchingMember = members.find(
    (member) =>
      member.id === storedMember.id || member.email === storedMember.email,
  )

  return matchingMember?.password ?? 'password123'
}
