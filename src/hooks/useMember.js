import { useCallback, useEffect, useState } from 'react'

import {
  clearMemberSession,
  getStoredMember,
  MEMBER_SESSION_UPDATED_EVENT,
  updateStoredMember,
} from '../lib/memberSession'

function useMember() {
  const [member, setMember] = useState(getStoredMember)

  useEffect(() => {
    function handleMemberSessionUpdate() {
      setMember(getStoredMember())
    }

    window.addEventListener(
      MEMBER_SESSION_UPDATED_EVENT,
      handleMemberSessionUpdate,
    )

    return () => {
      window.removeEventListener(
        MEMBER_SESSION_UPDATED_EVENT,
        handleMemberSessionUpdate,
      )
    }
  }, [])

  const logOut = useCallback(() => {
    clearMemberSession()
  }, [])

  const saveMember = useCallback((nextMember) => {
    updateStoredMember(nextMember)
  }, [])

  return {
    member,
    isLoggedIn: Boolean(member),
    logOut,
    saveMember,
  }
}

export default useMember
