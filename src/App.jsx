import './App.css'

import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import LogInPage from './pages/LogInPage'
import SignUpPage from './pages/SignUpPage'
import ArticleDetail from './pages/ArticleDetail'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
