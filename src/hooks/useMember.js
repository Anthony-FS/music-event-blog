import { useCallback, useEffect, useState } from 'react'

import {
  clearMemberSession,
  clearStoredMember,
  getStoredMember,
  MEMBER_SESSION_UPDATED_EVENT,
  updateStoredMember,
} from '../lib/memberSession'
import { isSupabaseConfigured } from '../lib/supabase'
import { getSession, onAuthStateChange } from '../services/authService'
import {
  getProfile,
  mapProfileToMember,
  updateProfile,
} from '../services/profileService'

function useMember() {
  const [member, setMember] = useState(getStoredMember)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    function handleMemberSessionUpdate() {
      setMember(getStoredMember())
    }

    async function syncMember(user) {
      if (!isActive) {
        return
      }

      if (!user) {
        clearStoredMember()
        if (isActive) {
          setIsLoading(false)
        }
        return
      }

      try {
        const profile = await getProfile(user.id)
        const nextMember = mapProfileToMember(profile, user)

        if (isActive) {
          updateStoredMember(nextMember)
        }
      } catch {
        if (isActive) {
          clearStoredMember()
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    window.addEventListener(
      MEMBER_SESSION_UPDATED_EVENT,
      handleMemberSessionUpdate,
    )

    getSession()
      .then((session) => syncMember(session?.user))
      .catch(() => {
        clearStoredMember()
        if (isActive) {
          setIsLoading(false)
        }
      })

    let authSubscription

    if (isSupabaseConfigured()) {
      const { data } = onAuthStateChange((_event, session) => {
        window.setTimeout(() => syncMember(session?.user), 0)
      })
      authSubscription = data.subscription
    }

    return () => {
      isActive = false
      window.removeEventListener(
        MEMBER_SESSION_UPDATED_EVENT,
        handleMemberSessionUpdate,
      )
      authSubscription?.unsubscribe()
    }
  }, [])

  const logOut = useCallback(async () => {
    await clearMemberSession()
  }, [])

  const saveMember = useCallback(async (nextMember) => {
    const profile = await updateProfile(nextMember.id, nextMember)
    const savedMember = {
      ...nextMember,
      name: profile.name ?? '',
      username: profile.username ?? '',
      bio: profile.bio ?? '',
      avatarUrl: profile.avatar_url ?? '',
      role: profile.role ?? 'member',
    }

    updateStoredMember(savedMember)
    return savedMember
  }, [])

  return {
    member,
    isLoggedIn: Boolean(member),
    isLoading,
    logOut,
    saveMember,
  }
}

export default useMember
