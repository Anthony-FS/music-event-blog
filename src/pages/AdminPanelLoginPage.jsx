import { useState } from 'react'
import { toast } from 'sonner'

import ArticleManagement from '../components/ArticleManagement'
import AdminControlPanel from '../components/AdminControlPanel'
import CategoryManagement from '../components/CategoryManagement'
import NotificationManagement from '../components/NotificationManagement'
import ProfileManagement from '../components/ProfileManagement'
import ResetPasswordManagement from '../components/ResetPasswordManagement'
import NavBar from '../components/NavBar'
import { authenticateMember } from '../data/memberlogin'

const initialFormValues = {
  email: '',
  password: '',
}

const initialAdminMember = {
  name: 'Admin',
  username: 'admin',
  email: 'admin@example.com',
  role: 'admin',
}

function AdminPanelPage() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [hasSubmitError, setHasSubmitError] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem('admin-authenticated') === 'true',
  )

  function handleInputChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    if (hasSubmitError) {
      setHasSubmitError(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    const adminMember = authenticateMember(formValues.email, formValues.password)

    if (!adminMember || adminMember.role !== 'admin') {
      setHasSubmitError(true)
      toast.error("Your password is incorrect or this email doesn't exist", {
        description: 'Please try another password or email',
      })
      return
    }

    setHasSubmitError(false)
    localStorage.setItem('admin-authenticated', 'true')
    setIsAdminAuthenticated(true)
    toast.success('Admin login successful.')
  }

  if (isAdminAuthenticated) {
    return <AdminDashboard onLogOut={() => setIsAdminAuthenticated(false)} />
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />

      <section className="flex min-h-[calc(100vh-74px)] items-start justify-center px-5 pt-16 sm:px-8 sm:pt-24">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full max-w-[760px] rounded-lg bg-[#f6f5f2] px-6 py-12 sm:px-24 sm:py-16"
        >
          <p className="text-center text-base font-bold text-[#ffae88]">
            Admin panel
          </p>
          <h1 className="mt-3 text-center text-3xl font-bold text-[#28241f]">
            Log in
          </h1>

          <div className="mx-auto mt-10 flex w-full max-w-[560px] flex-col gap-7">
            <AdminField
              id="admin-email"
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              placeholder="Email"
              hasError={hasSubmitError}
              onChange={handleInputChange}
            />
            <AdminField
              id="admin-password"
              label="Password"
              name="password"
              type="password"
              value={formValues.password}
              placeholder="Password"
              hasError={hasSubmitError}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="mx-auto mt-4 flex h-11 min-w-[120px] items-center justify-center rounded-full! bg-[#28241f] px-8 text-sm font-semibold text-white transition-colors hover:bg-black"
          >
            Log in
          </button>
        </form>
      </section>
    </main>
  )
}

function AdminDashboard({ onLogOut }) {
  const [activeAdminView, setActiveAdminView] = useState('articles')
  const [adminMember, setAdminMember] = useState(initialAdminMember)

  function handleLogOut() {
    localStorage.removeItem('admin-authenticated')
    onLogOut()
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
          <ProfileManagement member={adminMember} onSave={setAdminMember} />
        )}
        {activeAdminView === 'reset-password' && <ResetPasswordManagement />}
      </div>
    </main>
  )
}

function AdminField({
  id,
  label,
  name,
  type = 'text',
  value,
  placeholder,
  hasError = false,
  onChange,
}) {
  return (
    <label htmlFor={id} className="block">
      <span
        className={`mb-2 block text-sm font-medium ${
          hasError ? 'text-red-600' : 'text-[#75716b]'
        }`}
      >
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        aria-invalid={hasError}
        className={`h-11 w-full rounded-sm border bg-white px-4 text-sm font-medium text-[#28241f] outline-none transition-colors placeholder:text-[#75716b] ${
          hasError
            ? 'border-red-500! focus:border-red-500! focus:ring-2 focus:ring-red-500/20'
            : 'border-[#dedbd6] focus:border-[#28241f]'
        }`}
      />
    </label>
  )
}

export default AdminPanelPage
