import { Navigate, useLocation } from 'react-router-dom'

import useMember from '../../hooks/useMember'

function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation()
  const { member, isLoggedIn, isLoading } = useMember()

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-sm font-semibold text-[#75716b]">Loading...</p>
      </main>
    )
  }

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, requireAdmin }}
      />
    )
  }

  if (requireAdmin && member?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
