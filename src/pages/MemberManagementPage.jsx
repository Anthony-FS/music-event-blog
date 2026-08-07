import { useLocation } from 'react-router-dom'

import MembersControlPanel from '../components/member/MembersControlPanel'
import NavBar from '../components/layout/NavBar'
import ProfileManagement from '../components/shared/account/ProfileManagement'
import ResetPasswordManagement from '../components/shared/account/ResetPasswordManagement'
import useMember from '../hooks/useMember'

function MemberManagementPage() {
  const location = useLocation()
  const { member, saveMember, isLoading } = useMember()
  const activeView = location.pathname.endsWith('/reset-password')
    ? 'reset-password'
    : 'profile'

  if (isLoading || !member) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm font-semibold text-[#75716b]">Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <section className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-14">
        <MembersControlPanel
          memberName={member?.name}
          avatarUrl={member?.avatarUrl}
          activeView={activeView}
        />
        {activeView === 'reset-password' ? (
          <ResetPasswordManagement member={member} />
        ) : (
          <ProfileManagement member={member} onSave={saveMember} />
        )}
      </section>
    </main>
  )
}

export default MemberManagementPage
