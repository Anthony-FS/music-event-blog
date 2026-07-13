import './App.css'

import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import ArticleDetail from './pages/ArticleDetail'
import AdminPanelPage from './pages/AdminPanelLoginPage'
import MemberManagementPage from './pages/MemberManagementPage'
import NotFoundPage from './pages/NotFoundPage'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/member-management" element={<MemberManagementPage />} />
        <Route
          path="/member-management/reset-password"
          element={<MemberManagementPage />}
        />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
