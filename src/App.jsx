import './App.css'

import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import ArticleDetail from './pages/ArticleDetail'
import AdminPanelPage from './pages/AdminPanelLoginPage'
import MemberManagementPage from './pages/MemberManagementPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/shared/ProtectedRoute'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminPanelPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-management"
          element={
            <ProtectedRoute>
              <MemberManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member-management/reset-password"
          element={
            <ProtectedRoute>
              <MemberManagementPage />
            </ProtectedRoute>
          }
        />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
