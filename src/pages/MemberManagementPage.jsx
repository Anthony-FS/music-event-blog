import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import MembersControlPanel from '../components/MembersControlPanel'
import NavBar from '../components/NavBar'
import ProfileManagement from '../components/ProfileManagement'
import ResetPasswordManagement from '../components/ResetPasswordManagement'

function getStoredMember() {
  try {
    return JSON.parse(localStorage.getItem('member')) ?? {}
  } catch {
    return {}
  }
}

function MemberManagementPage() {
  const location = useLocation()
  const [member, setMember] = useState(getStoredMember)
  const activeView = location.pathname.endsWith('/reset-password')
    ? 'reset-password'
    : 'profile'

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-14">
        <MembersControlPanel memberName={member.name} activeView={activeView} />
        {activeView === 'reset-password' ? (
          <ResetPasswordManagement />
        ) : (
          <ProfileManagement member={member} onSave={setMember} />
        )}
      </section>
    </main>
  )
}

export default MemberManagementPage
