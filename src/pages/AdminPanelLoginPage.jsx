import { useState } from 'react'
import { toast } from 'sonner'

import ArticleManagement from '../components/admin/ArticleManagement'
import AdminControlPanel from '../components/admin/AdminControlPanel'
import CategoryManagement from '../components/admin/CategoryManagement'
import NotificationManagement from '../components/admin/NotificationManagement'
import ProfileManagement from '../components/shared/account/ProfileManagement'
import ResetPasswordManagement from '../components/shared/account/ResetPasswordManagement'
import useMember from '../hooks/useMember'

function AdminPanelPage() {
  return <AdminDashboard />
}

function AdminDashboard() {
  const [activeAdminView, setActiveAdminView] = useState('articles')
  const { member, logOut, saveMember } = useMember()

  async function handleLogOut() {
    try {
      await logOut()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <main className="flex min-h-screen bg-[#f9f9f9]">
      <AdminControlPanel
        activeView={activeAdminView}
        onViewChange={setActiveAdminView}
        onLogOut={handleLogOut}
      />

      <div className="min-w-0 flex-1">
        {activeAdminView === 'articles' && <ArticleManagement />}
        {activeAdminView === 'categories' && <CategoryManagement />}
        {activeAdminView === 'notifications' && <NotificationManagement />}
        {activeAdminView === 'profile' && (
          <ProfileManagement member={member} onSave={saveMember} />
        )}
        {activeAdminView === 'reset-password' && (
          <ResetPasswordManagement member={member} />
        )}
      </div>
    </main>
  )
}

export default AdminPanelPage
